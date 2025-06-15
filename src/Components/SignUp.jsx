import React, { useState } from "react";
import { Form, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [userData, setUserData] = useState({
    Firstname: "",
    Email: "",
    Username: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const summitForm = async (e) => {
    // const response = await fetch("https://practice-vdup.onrender.com/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // });

    // const data = await response.json();
    // console.log(data);

    // try {
    //   const res = await fetch("https://practice-vdup.onrender.com/signup", {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //   });
    //   const result = await res.json();
    //   console.log(result);
    // } catch (error) {
    //   alert("Error submitting Form");
    //   console.error("Error submitting form:", error);
    // }

    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://practice-vdup.onrender.com/signup",
        userData
      );
      console.log("Signup successful:", response.data);
      // Redirect or notify user
      navigate("/login");
      alert("Sign up Sucessful");
    } catch (err) {
      if (!err.response) {
        // No response from server = likely network error
        setError("No internet connection. Please check your network.");
      } else {
        // Backend responded with error (like 400, 500)
        setError(err.response.data.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={summitForm}>
        <input
          type="text"
          placeholder="Enter your first name"
          required
          onChange={(e) =>
            setUserData({ ...userData, Firstname: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Enter your Email"
          required
          onChange={(e) => setUserData({ ...userData, Email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Create a user name"
          required
          onChange={(e) =>
            setUserData({ ...userData, Username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Create password"
          required
          onChange={(e) =>
            setUserData({ ...userData, Password: e.target.value })
          }
        />
        <input type="submit" value="Summit" />
      </Form>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>

      {loading && <p>Signing up...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignUp;
