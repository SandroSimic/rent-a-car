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
import EditCarForm from "./components/Cars/EditCarForm";
import EditCarScreen from "./screens/EditCarScreen";

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
            <Route path="/add-car" element={<AddCarScreen />} />
            <Route path="/car/:carId" element={<CarDetailsScreen />} />
            <Route path="/car/edit/:carId" element={<EditCarScreen />} />
          </Route>
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px",  }}
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
