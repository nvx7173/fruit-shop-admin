import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, getInitialData, getUsers } from "./actions";
import Products from "./containers/Products";
import Users from "./containers/Users";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import NewPage from "./containers/NewPage";
import Contact from "./containers/Contact";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      dispatch(getUsers());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
      dispatch(getUsers());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/contact" component={Contact} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
