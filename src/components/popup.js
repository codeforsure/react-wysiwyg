import React from 'react';
import './pop.css';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

function Popup(props){
    return (
      <div className='popup'>
        {console.log('popup caled')}
        <div className='popup_inner'>
          <h1>{props.text}</h1>
        <Link to={props.closePopup} onClick={props.viewopen}>OK</Link>
        </div>
      </div>
    );
}
const mapDispatchToProps = (dispatch) => {
  return {
    viewopen:()=>{
      const action ={type:'REFRESH'};
      dispatch(action);
    }
  }
}
export default connect(null, mapDispatchToProps)(Popup);
