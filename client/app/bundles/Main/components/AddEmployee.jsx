import React, {PropTypes} from 'react';

export default class AddEmployee extends React.Component {
    render() {
        return (
          <div className="content">
            <div className="container">
                <div className="whitebg z-depth-1">
                  <form className="form-box" action="javascript:void(0);">
                    <div className="row">
                      <div className="input-field col s6">
              						<div className="file-field input-field">
              			      <div className="btn">
              			        <span>File</span>
              			        <input type="file" />
              			      </div>
              			      <div className="file-path-wrapper">
              			        <input className="file-path validate" type="text" placeholder="Upload file to import Employees" />
              			      </div>
              			    </div>
              					</div>
                    </div>
                    <div className="row">
                      <button type="submit" className="btn blue" >Import Employees<span className="fa fa-send"></span></button>
                      <a href="#" className="btn grey lighten-1">Cancel</a>
                      </div>
                  </form>
                </div>
            </div>
          </div>
        );
    }
}
