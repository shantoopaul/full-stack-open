import Content from "./Content";
import { HeaderSub } from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <HeaderSub course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
