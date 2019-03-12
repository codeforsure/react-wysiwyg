import React from 'react';
import { read_cookie,bake_cookie,delete_cookie } from 'sfcookies';
import { connect } from 'react-redux';
import { deleteComplaint } from "../../actions/complaintaction";
import {Redirect} from "react-router-dom";
import Complaintview from "./viewComplaint";


class AllComplaints extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      complaints:[],
      isLoaded:false,
      viewopenck: false,
      viewopentiny: false,
      error :false
    }
  }
  getcomplaints=()=>{
    const accessToken = read_cookie('json_response')
    const bearer = 'Bearer '+accessToken;
    const name = read_cookie('name');

    console.log('precheck bearer name',bearer,"   ",name);
    fetch('http://localhost:8080/complaint/get',{
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
         "username": name}),
    })

      .then(res=>res.json())
      .then(json=>{
        console.log('response complaint',json)
        if(json.status===401){
          this.setState({
            error:true,
          })
        }
        this.setState({
          isLoaded:true,
          complaints: json,
        })
              console.log(this.state);
      })
      .catch((error) => {
          console.log(error);
          this.setState({
            error:true,
          })
      });

  }
  componentWillMount(){
    this.getcomplaints()
  }
  onclick=(e)=>{
    e.preventDefault();
    console.log(e.target.id);
    var retVal = window.confirm("Do you want to delete complaint ?");
    if( retVal === true ) {
      this.props.deleteComplaint(e.target.id);
    }

  }
  handleViewck=(e)=>{
    e.preventDefault();
    var data = this.state.complaints.filter(complaint => complaint.complaint === e.target.id);
    var id = data[0].complaint_id;
    var summary = data[0].summary;
    bake_cookie('complaint_id',id);
    localStorage.setItem('complaint',e.target.id);
    localStorage.setItem('summary',summary);
    console.log("data from localStorage",localStorage.getItem('summary'));
    this.setState({ viewopenck: true });
    this.props.viewopen();
  }
  handleViewtiny=(e)=>{
    e.preventDefault();
    var data = this.state.complaints.filter(complaint => complaint.complaint === e.target.id);
    var id = data[0].complaint_id;
    var summary = data[0].summary;
    bake_cookie('complaint_id',id);
    localStorage.setItem('complaint',e.target.id);
    localStorage.setItem('summary',summary);
    console.log("data from localStorage",localStorage.getItem('summary'));
    this.setState({ viewopentiny: true });
    this.props.viewopen();
  }
  load=()=>{
    console.log('load called');
    this.setState({
      isLoaded:false,
    })
  }
  render(){
    var {isLoaded,complaints,viewopenck,viewopentiny,error} = this.state;
    var obj = [...this.state.complaints];
      return (
        <div>
        {isLoaded ?
        <div className = 'allcomplaints'>
          {console.log('view',this.state.viewopen)}
          {viewopenck&&<Redirect to= "/welcome/ck4"/>}
          {viewopentiny&&<Redirect to= "/welcome/tinymce"/>}
          {error&&alert('session expired')}
          {error&&this.props.logout()}
          {error&&<Redirect to= "/error"/>}
          {this.props.isDeleteSuccess&&this.load()}
          {this.props.isDeleteSuccess&&alert('complaint Successfully deleted')}
          {this.props.isDeleteSuccess&&this.props.viewopen()}
          {complaints.length?
          <div>
            {obj.sort((a,b)=>(a.complaint_id<b.complaint_id)?1:-1).map(complaint=>(
              <Complaintview key={complaint.complaint_id} Id ={complaint.complaint_id}  Summary = {complaint.summary}complaint = {complaint.complaint} onDelete = {this.onclick} onViewck ={this.handleViewck} onViewtiny ={this.handleViewtiny} />
            ))}
          </div>: <h1 align="center">No complaints Registered</h1>}
        </div>:
        <div className="loader1">
          {this.getcomplaints()}
        </div>}
      </div>
      );
}
}

const mapStateToProps = (state)=> {
  return {
    accessToken: state.accessToken,
    isDeleteSuccess:state.isDeleteSuccess
  };
}
const mapDispatchToProps = (dispatch)=> {
  return{
     deleteComplaint:(id)=>dispatch(deleteComplaint(id)),
     logout :()=>{
       bake_cookie('login',false);
       delete_cookie('json_response');
       const action ={type:'LOGOUT_SUCESS',isLogoutSuccess : true};
       dispatch(action);
     },
     falsedelete:()=>{
       console.log('deletesucess false')
       const action ={type:'DELETE_SUCCESS',isDeleteSuccess : false};
       dispatch(action);
     },
     viewopen:()=>{
       const action ={type:'REFRESH'};
       dispatch(action);
     }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllComplaints);
