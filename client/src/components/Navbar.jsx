import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { useLogout } from "./Users/useLogout";

const Navbar = ({ user }) => {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();

  function onToggleDropdown() {
    setToggleDropdown((prevToggle) => !prevToggle);
    console.log(toggleDropdown);
  }

  async function handleLogout() {
    try {
      logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  }

  return (
    <>
      {isOpenNavbar && <ResponsiveNavbar />}
      <nav className="navbar">
        <Link className="navbar__logo" to={"/"}>
          Rently
        </Link>
        <ul className="navbar__items">
          {user && (
            <Link className="navbar__items__btn" to={"/add-car"}>
              Add Car
            </Link>
          )}
          {user ? (
            <div
              className="navbar__items__btn--profile"
              onClick={onToggleDropdown}
            >
              <div className="navbar__items__btn--profile__imageContainer">
                <img src={user?.userImage} alt={user?.username} />
              </div>
              {toggleDropdown && (
                <div className="dropdown">
                  <Link to={"/profile"} className="dropdown__profile">
                    Profile
                  </Link>
                  <button
                    className="dropdown__logout"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="navbar__items__btn login" to={"/login"}>
              <FaUser className="icon" />
              Log In
            </Link>
          )}
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
