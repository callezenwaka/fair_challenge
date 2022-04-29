import { Link } from "react-router-dom";

const Header = () => {

  return (
    <nav className="">
      <Link to="/" className="px-2.5"> Home </Link> |
      <Link to="/reveal" className="px-2.5"> Trends </Link>
    </nav>
  );
};

export default Header;