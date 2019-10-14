import React, { FormEvent, useState } from "react";
import { get } from "lodash";
import { RouteComponentProps } from "react-router-dom";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await login({
        variables: {
          email,
          password
        },
        update: (store, { data }) => {
          // TODO: Substitute this when redux is available
          if (!data) {
            return null;
          }
          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user
            }
          });
          return undefined;
        }
      });
      console.log(response);
      if (get(response, "data")) {
        setAccessToken(get(response.data, "login.accessToken"));
        history.push("/");
      }
    } catch (err) {
      console.error("LOGIN: ", err);
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

      <button type="submit">Login</button>
    </form>
  );
};

export default Register;
