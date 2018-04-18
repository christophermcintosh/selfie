import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';

import FacePlus from './FacePlus';

export default class Root extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={FacePlus} />
        </Switch>
      </div>
    );
  }
}
