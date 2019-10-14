import React, { FormEvent, useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [register] = useRegisterMutation();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await register({
        variables: {
          email,
          password,
          username
        }
      });

      console.log(response);
      // TODO: Check if response is a success and display a success message
      history.push("/");
    } catch (err) {
      console.error("REGISTRATION: ", err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="text"
          value={email}
          placeholder="user@email.com"
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <button type="submit">Create account</button>
    </form>
  );
};

export default Register;
