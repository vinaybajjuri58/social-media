import { useState } from "react";
import { Link } from "react-router-dom";
const initialLoginData = {
  email: "",
  password: "",
};
export const Login = () => {
  const [userData, setUserData] = useState(initialLoginData);
  //   const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData((loginData) => ({
      ...loginData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          <p>Email :</p>
          <input
            className="form-input rounded-sm bg-transparent"
            type="text"
            value={userData.email}
            onChange={handleChange}
            name="email"
          />
        </label>
        <label>
          <p>Password :</p>
          <input
            type="password"
            className="form-input rounded-sm bg-transparent"
            value={userData.password}
            onChange={handleChange}
            name="email"
          />
        </label>
        <button>Login</button>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};
