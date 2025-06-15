import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [userData, setUserData] = useState({
    Username: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://practice-vdup.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();

        alert(error.message);
        throw new Error(error);
      }

      const data = await response.json();
      alert(data.message);
      console.log(data);

      navigate("/main", { state: data }); // 🔁 go to dashboard on success
    } catch (error) {}
  };

  return (
    <div>
      <Form onSubmit={loginForm}>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) =>
            setUserData({ ...userData, Username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter Password"
          onChange={(e) =>
            setUserData({ ...userData, Password: e.target.value })
          }
        />
        <input type="submit" value="Login" />
      </Form>
      <Link to="/">Home</Link>
      <Link to="/signUp">Sign Up</Link>
      {loading && <p>Logging in...</p>}
    </div>
  );
};

export default Login;
