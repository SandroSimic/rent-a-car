import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Layout from "./UI/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<HomeScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
