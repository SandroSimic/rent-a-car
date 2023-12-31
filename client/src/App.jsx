import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Layout from "./UI/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddCarScreen from "./screens/AddCarScreen";
import { Toaster } from "react-hot-toast";
import CarDetailsScreen from "./screens/CarDetailsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import EditCarScreen from "./screens/EditCarScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import UsersProfile from "./components/Users/UsersProfile";
import { AdminRoute } from "./components/AdminRoutes";
import { UserRoutes } from "./components/UserRoutes";
import AdminScreen from "./screens/AdminScreen";
import EditUserForm from "./components/Users/EditUserForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index={true} element={<HomeScreen />} />
            <Route
              path="/add-car"
              element={<UserRoutes element={<AddCarScreen />} />}
            />
            <Route
              path="/car/:carId"
              element={<UserRoutes element={<CarDetailsScreen />} />}
            />
            <Route
              path="/admin"
              element={<AdminRoute element={<AdminScreen />} />}
            />
            <Route
              path="/users/:userId/edit"
              element={<AdminRoute element={<EditUserForm />} />}
            />
            <Route
              path="/car/edit/:carId"
              element={<UserRoutes element={<EditCarScreen />} />}
            />
            <Route
              path="/user/me"
              element={<UserRoutes element={<MyProfileScreen />} />}
            />
            <Route
              path="/user/:userId"
              element={<UserRoutes element={<UsersProfile />} />}
            />
          </Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16 24px",
            backgroundColor: "#06CE7D",
            color: "white",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
