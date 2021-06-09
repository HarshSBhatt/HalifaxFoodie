import { useContext } from "react";
import { Redirect } from "react-router-dom";

//! User Files

import { AppContext } from "AppContext";

function Login() {
  const { state } = useContext(AppContext);
  console.log(state);
  if (state.authenticated) return <Redirect to="/" />;
  return <div>Login</div>;
}

export default Login;
