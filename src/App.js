import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="mainBody">
        <Home />
      </div>
    </>
  );
}
