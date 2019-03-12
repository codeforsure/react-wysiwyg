import React from 'react';
import {Link} from "react-router-dom";

function UserHome(props){
  return (
    <div style={{marginBottom:'485px'}}>

    <ul>
      <li className='li'>Edit through<Link to='/welcome/ck4'> ckeditor</Link></li>
      <li className='li'>Edit through<Link to='/welcome/tinymce'> Tiny-mce</Link></li>
    </ul>

    </div>
  );
}
export default (UserHome);
