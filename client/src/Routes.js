import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//! User Files

import { AppContext } from "AppContext";
import { ROUTES } from "common/constants";
import App from "app/App";
import Login from "modules/auth/Login";
import Logout from "modules/auth/Logout";
import PrivateRoute from "./PrivateRoute";
import Signup from "modules/auth/Signup";
import RestaurantSignup from "modules/auth/RestaurantSignup";
import ForgetPassword from "modules/auth/components/ForgetPassword";
import SecurityQuestion from "modules/auth/components/SecurityQuestion";

const Routes = () => {
  const { initializeAuth } = useContext(AppContext);

  useEffect(() => {
    initializeAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route
          exact
          path={ROUTES.SECURITY_QUESTION}
          component={SecurityQuestion}
        />
        <Route exact path={ROUTES.REGISTER} component={Signup} />
        <Route
          exact
          path={ROUTES.ADMIN_REGISTER}
          component={RestaurantSignup}
        />
        <Route exact path={ROUTES.FORGET_PASSWORD} component={ForgetPassword} />
        <Route exact path={ROUTES.LOGOUT} component={Logout} />
        <PrivateRoute path="/" component={App} />
      </Switch>
    </Router>
  );
};
export default Routes;
