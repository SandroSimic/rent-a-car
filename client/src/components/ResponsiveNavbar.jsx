import { Link } from "react-router-dom";
const ResponsiveNavbar = ({ user, logoutHandler }) => {

  return (
    <div className="navbar__responsive">
      <nav className="navbar__responsive__items">
        {user ? (
          <>
          <Link className="responsive__btn" to={'/user/me'}>Profile</Link>
          <Link className="responsive__btn addCarRes" to={"/add-car"}>
            AddCar
          </Link>
          <button className="responsive__btn--logout" onClick={logoutHandler}>Logout</button>
          </>
        ) : (
          <Link className="responsive__btn loginRes" to={"/login"}>
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default ResponsiveNavbar;
