import React from 'react';
import Header from './wel_comp/Header';
import Footer from './wel_comp/footer';
import PrivateRoute from "../PrivateRoute";
import UserHome from "./wel_comp/UserHome";
import Complaint from "./wel_comp/Complaint";
import Complaintck4 from "./wel_comp/complaint-ck4";
import Complainttiny from "./wel_comp/tinymce";
import AllComplaints from "./wel_comp/AllComplaints";

function Welcome(props){

    return(
      <div >
      <div id="myHeader"><Header /></div>
      <div className="row">
        <PrivateRoute path = {"/welcome/home"} ><UserHome /></PrivateRoute>
        <PrivateRoute path = {"/welcome/ck5"} ><Complaint /></PrivateRoute>
        <PrivateRoute path = {"/welcome/ck4"} ><Complaintck4 /></PrivateRoute>
        <PrivateRoute path = {"/welcome/tinymce"} ><Complainttiny /></PrivateRoute>
        <PrivateRoute path = {"/welcome/allcomplaint"} ><AllComplaints /></PrivateRoute>
      </div>
      <footer><Footer /></footer>
      </div>
  );
}

export default Welcome;
