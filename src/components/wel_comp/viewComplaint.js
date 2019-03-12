import React, { Component } from 'react';
import './comp.css';

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
                  <div className="post3" >
                    <h3 >{this.props.Summary}</h3>
                      <button type="button" className="close" onClick = {this.toggle} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                  <button id = {this.props.Id} className="button" onClick = {this.props.onDelete}>Delete</button>
                  <button id ={this.props.complaint} className="button" onClick = {this.props.onViewck}>View/edit-ck4</button>
                  <button id ={this.props.complaint} className="button" onClick = {this.props.onViewtiny}>View/edit-tiny</button>
                  </div >
                    <div className="post1 " dangerouslySetInnerHTML={{__html: this.props.complaint}}></div>
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
