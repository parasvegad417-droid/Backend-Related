import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import CreatePost from "./pages/CreatePost";
import Feed from "./pages/Feed";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route
          path="/create-post"
          element={<CreatePost />}
        />

        <Route
          path="/feed"
          element={<Feed />}
        />

        <Route
          path="/about"
          element={<h1>About Us</h1>}
        />

      </Routes>
    </Router>
  );
};

export default App;