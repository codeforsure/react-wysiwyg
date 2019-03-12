import React, { Component } from 'react';
import Loginform from "./Forms/Loginform";
import Registerform from "./Forms/Registerform";
import {BrowserRouter,Route} from 'react-router-dom';
import Welcome from "./components/Welcome.js";
import PrivateRoute from "./PrivateRoute";
import Session from "./session";
import SampleApp from "./components/wel_comp/sam1.js";
import { withRouter } from 'react-router';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path = {"/"} component = {Loginform} exact />
          <Route path = {"/register"} component ={Registerform}/>
          <Route path = {"/error"} component ={Session} />
          <Route path = {"/sample"} component ={SampleApp} />
          <PrivateRoute path = {"/welcome"} ><Welcome /></PrivateRoute>
        </div>
      </BrowserRouter>

    );
  }
}
export default withRouter(App);
