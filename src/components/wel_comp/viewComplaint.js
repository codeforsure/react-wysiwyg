import React, { Component } from 'react';
import './comp.css';
import {Link,Redirect} from "react-router-dom";
import { Markup } from 'interweave';
import Interweave from 'interweave';

class Complaintview extends Component{
  state={
    hide:false,
  };
  toggle=(e)=> {
    this.setState({ hide: !this.state.hide });
  }
  render(){
    return (
      <div>
            {this.state.hide&&
            <div className="b" >
                <div className="post">
                  <div className="post3" onClick = {this.toggle}>
                    <h3 >{this.props.Summary}</h3>
                  <button id = {this.props.Id} onClick = {this.props.onDelete}>Delete</button>
                  <button id ={this.props.complaint} onClick = {this.props.onView}>View/edit</button>
                  </div>
                    <div className="post1" dangerouslySetInnerHTML={{__html: this.props.complaint}}></div>
                </div>
            </div>
          }
          {!this.state.hide&&
          <div className="b" onClick = {this.toggle}>
              <div className="post2">

                  <p>{this.props.Summary}</p>
              </div>
          </div>
        }
        </div>
    );
  }
}


export default Complaintview;
