import { useEffect, useState } from "react";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
      });
    } else {
      if (
        confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        personService.update(personExist.id, newPerson).then((newPerson) => {
          setPersons(persons.map((person) => (person.id === personExist.id ? newPerson : person)));
          setNewName("");
          setNewNumber("");
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
      <Header title="Phonebook" />
      <Filter onChange={(e) => setFilter(e.target.value)} />
      <Header title="Add a new" />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <Header title="Numbers" />
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
