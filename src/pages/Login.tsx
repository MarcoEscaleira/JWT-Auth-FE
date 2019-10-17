import React, { FormEvent, useState } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { useLoginMutation, User } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { actions } from "../store/user";
import { Dispatch } from "redux";
import { UnaryFn } from "../utils/functionsTypes";

interface Props {
  loginUser: UnaryFn<User, void>;
}

const Login: React.FC<RouteComponentProps & Props> = ({
  history,
  loginUser
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await login({
        variables: {
          email,
          password
        }
      });

      if (get(response, "data")) {
        setAccessToken(get(response.data, "login.accessToken"));
        loginUser(get(response.data, "login.user"));
        setIsLoading(false);
        // TODO: Show login success message
        history.push("/");
      }
    } catch (err) {
      // TODO: Show login error message
      console.error("LOGIN: ", err);
      setIsLoading(false);
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

      {isLoading ? <div>loading...</div> : <button type="submit">Login</button>}
    </form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch: dispatch,
  loginUser: (user: User) => {
    dispatch(actions.loginUserAction(user));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
