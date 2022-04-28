import { Link } from "react-router-dom";

const Error = () => {

  return (
    <div className="">
      <p>Page not found!</p>
      <Link to="/"> Home </Link>
    </div>
  );
};

export default Error;