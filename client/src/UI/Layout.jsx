import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../components/Users/useUser";
import toast from "react-hot-toast";

const Layout = () => {
  const { user } = useUser();

  return (
    <div className="layout">
      <Navbar user={user}/>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
