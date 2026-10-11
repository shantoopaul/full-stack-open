import { useEffect, useState } from "react";
import { HeaderM, HeaderR } from "./components/Header";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const personExist = persons.find((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (!personExist) {
      personService.create(newPerson).then((newPerson) => {
        setPersons([...persons, newPerson]);
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    } else {
      if (
        confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        personService
          .update(personExist.id, newPerson)
          .then((newPerson) => {
            setPersons(
              persons.map((person) => (person.id === personExist.id ? newPerson : person)),
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage(`Information of '${newName}' has already been removed from server`);
            setError(true);
            setTimeout(() => {
              setMessage(null);
              setError(false);
            }, 5000);
            setPersons(persons.filter((person) => person.name !== newName));
          });
      }
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);

    if (confirm(`Delete ${person.name}`)) {
      personService.remove(id);

      setPersons((persons) => persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <HeaderM title="Phonebook" />
      <Notification message={message} error={error} />
      <Filter onChange={(e) => setFilter(e.target.value)} />
      <HeaderR title="Add a new" />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <HeaderR title="Numbers" />
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
