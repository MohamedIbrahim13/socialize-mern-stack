import { useState, useEffect, useCallback } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import PostDetails from "./components/PostDetails";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { logOut } from "./actions/users";

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(logOut());
    setUser(null);
  }, [dispatch, setUser]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("Profile")));
  }, [setUser]);

  console.log(user);
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar user={user} logout={logout} />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route exact path="/posts" component={() => <Home user={user} />} />
          <Route
            path="/posts/:id"
            component={() => <PostDetails user={user} />}
          />
          <Route
            path="/auth"
            component={() => (user ? <Redirect to="/" /> : <Auth />)}
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
