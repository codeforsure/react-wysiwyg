import React from 'react';
import './header.css';
import CKEditor5 from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class SampleApp extends React.Component{
  render(){
    return (
      <div className= 'editor' align='center'>
      <form className= 'editor1'>
      <h1 align='center'>Drop Your Content Here</h1>
        <h3 align='left'>SUMMARY:</h3>
        <input type='text' className= 'input1' maxlength="200" onChange={this.onChangesum} placeholder="enter summary ........." required />
        <h3 align='left'>CONTENT:</h3>
      <CKEditor5
                    editor={ ClassicEditor }

      />
      </form>
      </div>
    );

  }
}

export default SampleApp;
