import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} {...part} />
      ))}
    </div>
  );
};

export default Content;
