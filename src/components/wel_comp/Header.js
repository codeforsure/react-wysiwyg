import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import './header.css';
import { bake_cookie ,delete_cookie} from 'sfcookies';
import logo from './default.png';
function Header(props){
  bake_cookie('login',props.isLoginSuccess);
  bake_cookie('name',props.uname);
  console.log('name from user',props.uname);
  return(
    <div className = 'header'>
      <div className="topnav">
        <Link className="topnav1" to={"/welcome/home"} >Home</Link>
        <Link className="topnav1" to={"/welcome/ck4"} >CKEditor-4</Link>
        <Link className="topnav1" to={"/welcome/tinymce"} >Tiny-mce</Link>
        <Link className="topnav1" to={"/welcome/allcomplaint"} >All Complaints</Link>
        <div className="dropdown">
                <img src={logo} alt="Avatar" className="avatar "/>
                <button className="dropbtn">{props.uname}  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link  to={"/"} style={{float: 'right'}} className="topnav1" onClick ={props.onclick}  >Logout </Link>
                </div>
        </div>
        </div>
    </div>
  )
}
const mapStateToProps = (state)=> {
  return {
    isLoginSuccess: state.isLoginSuccess,
    uname: state.name
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onclick :()=>{
      bake_cookie('login',false);
      delete_cookie('json_response');
      const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
