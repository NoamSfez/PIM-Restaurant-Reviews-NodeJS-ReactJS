import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);
  //creer user ds la state avec value= null et un setter pour elle aussi

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      {/* Notre barre de navigation */}

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      {/* En fonction de l'URL on va avoir la difffernte Route */}
      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/restaurants"]} //un ou l'autre
            component={RestaurantsList}
          />
          <Route
            path="/restaurants/:id/review"
            render={(props) => <AddReview {...props} user={user} />}
            // a la differnce de component={...} quad on utilise render={...} ca nous permet d'envoyer des attributs
            //donc la on renvoi le compoment AddReview avec nos props et le user
          />
          <Route
            path="/restaurants/:id"
            render={(props) => <Restaurant {...props} user={user} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
