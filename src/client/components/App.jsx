import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types'
import TopHackerNewsItems from './TopHackerNewsItems.jsx';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={TopHackerNewsItems} />
    </Router>
  )
}

export default App;
