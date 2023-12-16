import { Link } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Navbar = () => {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);

  return (
    <>
      {isOpenNavbar && <ResponsiveNavbar />}
      <nav className="navbar">
        <Link className="navbar__logo" to={'/'}>Rently</Link>
        <ul className="navbar__items">
          <Link className="navbar__items__btn" to={'/add-car'}>Add Car</Link>
          <Link className="navbar__items__btn login" to={'/login'}>
            <FaUser className="icon" />
            Log In
          </Link>
        </ul>
        <FaBars
          className="navbar__hamburger"
          onClick={() => setIsOpenNavbar((prevState) => !prevState)}
        />
      </nav>
    </>
  );
};

export default Navbar;
