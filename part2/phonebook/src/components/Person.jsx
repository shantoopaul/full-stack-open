const Person = ({ id, name, number, handleDelete }) => (
  <div>
    <p style={{ display: "inline-block", paddingInlineEnd: "0.5rem" }}>
      {name} {number}
    </p>
    <button onClick={() => handleDelete(id)}>Delete</button>
  </div>
);

export default Person;
