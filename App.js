import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";
import PersonDetail from "./components/PersonDetail";
import Favorites from "./components/Favorites";
import Watchlist from "./components/Watchlist";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/movie/:id" component={MovieDetail} />
        <Route exact path="/person/:id" component={PersonDetail} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/watchlist" component={Watchlist} />
      </Switch>
    </Router>
  );
}

export default App;
