const PersonForm = ({ newName, newNumber, onSubmit, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={onNameChange} required />
      </div>
      <div>
        Number: <input value={newNumber} onChange={onNumberChange} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
