import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import AccountPosts from "./pages/AccountPosts";
import PostForm from "./pages/PostForm";
import Blogs from "./pages/Blogs";
import Author from "./pages/Author";
import Post from "./pages/Post";
import Navigation from "./components/Navigation";
import SecureRoute from "./routes/SecureRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { Container } from "react-bootstrap";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Container
          fluid
          className="d-flex flex-column align-items-center"
          style={{
            height: "100vh",
            paddingTop: "100px",
          }}
        >
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/author/:id" component={Author} />
            <Route exact path="/post/:id" component={Post} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <SecureRoute exact path="/post-editor" component={PostForm} />
            <SecureRoute exact path="/post-editor/:id" component={PostForm} />
            <SecureRoute exact path="/account" component={Account} />
            <SecureRoute exact path="/account-posts" component={AccountPosts} />
          </Switch>
        </Container>
      </Router>
    </AppContextProvider>
  );
}

export default App;
