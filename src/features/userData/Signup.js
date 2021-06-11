import { useState } from "react";
const initialSignUpState = {
  userName: "",
  email: "",
  password: "",
};
export const SignUp = () => {
  const [signUpData, setSignUpData] = useState(initialSignUpState);
  const handleChange = (e) => {
    setSignUpData((initialData) => ({
      ...initialData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <h2>Signup</h2>
      <div>
        <label>
          userName :
          <input
            type="text"
            name="userName"
            value={signUpData.userName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email :
          <input
            type="text"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password :
          <input
            type="password"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};
