import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { fetchMovieForm } from "./services/movieFormService";
import { fetchMovies } from "./services/movieService";
import utils from "./utils/utils";
import Movies from "./components/movies";
import Navbar from "./components/navBar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";

const movieId = utils.getMovieIdFromUrl();
const resourceInitialMovieForm = fetchMovieForm(movieId ? movieId : "new");
const resourceInitialMovies = fetchMovies();

function App() {
  const [resourceMovieForm, setResourceMovieForm] = useState(
    resourceInitialMovieForm
  );
  const [resourceMovies, setResourceMovies] = useState(resourceInitialMovies);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute
            path="/movies/:id"
            render={routeProps => (
              <MovieForm
                {...routeProps}
                resourceMovieForm={resourceMovieForm}
                setResourceMovies={setResourceMovies}
              />
            )}
          />
          <Route
            path="/movies"
            render={routeProps => (
              <Movies
                {...routeProps}
                resourceMovies={resourceMovies}
                setResourceMovieForm={setResourceMovieForm}
              />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
