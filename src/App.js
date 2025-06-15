import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Main from "./Components/Main";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Route>
    )
  );
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
