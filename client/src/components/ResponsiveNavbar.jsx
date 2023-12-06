import { Link } from "react-router-dom";

const ResponsiveNavbar = () => {
  return (
    <div className="navbar__responsive">
      <nav className="navbar__responsive__items">
        <Link className="responsive__btn loginRes">Login</Link>
        <Link className="responsive__btn addCar">AddCar</Link>
      </nav>
    </div>
  );
};

export default ResponsiveNavbar;
