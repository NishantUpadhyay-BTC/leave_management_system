import React, { PropTypes } from 'react';

export default class UserDetailsEditForm extends React.Component {
  render() {
    return(
      <div className="col m9">
        <form>
          <div className="user-details">
            <div className="row">
            <div className="col m12">
              <button type="submit" value="Save" className="right btn tooltipped green waves-effect waves-light white-text">Save</button>
            </div>
          </div>
          <h5>Job Description</h5>
            <div className="content-box row z-depth-1">
              <div className="input-field col m12">
                <input type="text" id="joining_date" value="11/12/2016" />
                <label htmlFor="joining_date" className="active" >Joining Date</label>
              </div>
              <div className="input-field col m12">
                <input type="text" id="probation_period" value="3 Months" />
                <label htmlFor="probation_period" className="active">Probation Period</label>
              </div>
              <div className="input-field col m12">
                <input type="text" id="confirmation_status" value="Confirm" />
                <label htmlFor="confirmation_status" className="active">Confirmation Status</label>
              </div>
              <div className="input-field col m12">
                <input type="text"  id="skills" value="Rails, Rubby, React, Node, Amazon" />
                <label htmlFor="skills" className="active">Skills</label>
              </div>
              <div className="input-field col m12">
                <input type="text"  id="experiance" value="4 years" />
                <label htmlFor="experiance" className="active">Experience</label>
              </div>
            </div>
          </div>
        </form>
        <div className="user-details">
          <h5>Contact Information</h5>
          <div className="content-box row z-depth-1">
            <div className="input-field col m12">
              <input type="text"  id="permanent_address" value="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." />
              <label htmlFor="permanent_address" className="active">Permanent Address</label>
            </div>
            <div className="input-field col m12">
              <input type="text"  id="permanent_address" value="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." />
              <label htmlFor="permanent_address" className="active">Current Address</label>
            </div>
            <div className="input-field col m12">
              <input type="text"  id="phone_number" value="1112223334" />
              <label htmlFor="phone_number" className="active">Phone Number</label>
            </div>
            <div className="input-field col m12">
              <input type="text"  id="emergency_number" value="4455566677" />
              <label htmlFor="emergency_number" className="active">Emergency Number</label>
            </div>
            <div className="input-field col m12">
              <input type="text"  id="personal_email_address" value="nishant.upadhyay@gmail.com" />
              <label htmlFor="personal_email_address" className="active">Personal Email Address</label>
            </div>
          </div>
        </div>
        <div className="user-details">
          <h5>Education Information</h5>
          <div className="content-box row z-depth-1">
            <div className="input-field col m12">
              <input type="text" id="qualification" value="B.E. with Computer Science" />
              <label htmlFor="qualification" className="active">Qualification</label>
            </div>
            <div className="input-field col m12">
              <input type="text" id="institude" value="IIM- Ahmedabad" />
              <label htmlFor="institude" className="active">Education Institute</label>
            </div>
            <div className="input-field col m12">
              <input type="text" id="certified_cources" value="DBA - Oracle, RedHat Linux" />
              <label htmlFor="certified_cources" className="active">Other Certification Courses</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
