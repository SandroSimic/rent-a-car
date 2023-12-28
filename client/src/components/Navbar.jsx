/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { useLogout } from "./Users/useLogout";
import { useUser } from "./Users/useUser";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { user } = useUser();
  const { logout, isLoading } = useLogout();

  function onToggleDropdown() {
    setToggleDropdown((prevToggle) => !prevToggle);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  }

  return (
    <>
      {isOpenNavbar && <ResponsiveNavbar user={user} />}
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
          {user && user.role === "admin" ? (
            <Link className="navbar__items__btn" to={"/admin"}>
              Admin
            </Link>
          ) : (
            ""
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
                  <Link to={"/user/me"} className="dropdown__profile">
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
