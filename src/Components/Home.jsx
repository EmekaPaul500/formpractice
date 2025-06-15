import { Link } from "react-router-dom";

const Home = () => {
  //   const nameCaps = name.slice(0, 1).toUpperCase();
  //   const smallName = name.slice(1, name.length).toLowerCase();

  //   const combinedName = nameCaps + smallName;

  return (
    <div>
      kkk
      <h1>Welcome </h1>
      <Link to="/login">Login</Link>
      <Link to="/signUp">Sign Up</Link>
    </div>
  );
};

export default Home;
