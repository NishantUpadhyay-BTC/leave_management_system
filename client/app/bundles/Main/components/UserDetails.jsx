import React, { PropTypes } from 'react';

export default class UserDetails extends React.Component {
  constructor(props, context){
    super(props, context);
    this.userConfirmationStatus = this.userConfirmationStatus.bind(this)
    this.getExperianceYear = this.getExperianceYear.bind(this)

  }

  userConfirmationStatus(){
    this.props.data.confirmation_status ? "confirmed" : "Not Confirmed"
  }

  getExperianceYear(){
    let joining_date = this.props.data.joining_date.toDate("yyyy-mm-dd")
    return joining_date.getFullYear() - new Date().getFullYear()
  }

  render() {
    let data = this.props.data
      return(
      <div className="col m9">
        <div className="user-details">
          <h5>Job Description</h5>
          <div className="content-box">
            <dl>
              <dt>Joining Date</dt>
              <dd>{data.joining_date}</dd>
            </dl>
            <dl>
              <dt>Probation Period</dt>
              <dd>{data.probation_period} Month</dd>
            </dl>
            <dl>
              <dt>Confirmation Status</dt>
              <dd>{this.userConfirmationStatus()}</dd>
            </dl>
            <dl>
              <dt>Skills</dt>
              <dd>{data.skills}</dd>
            </dl>
            <dl>
              <dt>Experience</dt>
              <dd>{this.getExperianceYear()} years</dd>
            </dl>
          </div>
        </div>
        <div className="user-details">
          <h5>Contact Information</h5>
          <div className="content-box">
            <dl>
              <dt>Permanent Address</dt>
              <dd>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</dd>
            </dl>
            <dl>
              <dt>Current Address</dt>
              <dd>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</dd>
            </dl>
            <dl>
              <dt>Phone Number</dt>
              <dd>1112223334</dd>
            </dl>
            <dl>
              <dt>Emergency Number</dt>
              <dd>4455566677</dd>
            </dl>
            <dl>
              <dt>Personal Email Address</dt>
              <dd>nishant.upadhyay@gmail.com</dd>
            </dl>
          </div>
        </div>
        <div className="user-details">
          <h5>Education Information</h5>
          <div className="content-box">
            <dl>
              <dt>Permanent Address</dt>
              <dd>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</dd>
            </dl>
            <dl>
              <dt>Current Address</dt>
              <dd>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</dd>
            </dl>
            <dl>
              <dt>Phone Number</dt>
              <dd>1112223334</dd>
            </dl>
            <dl>
              <dt>Emergency Number</dt>
              <dd>4455566677</dd>
            </dl>
            <dl>
              <dt>Personal Email Address</dt>
              <dd>nishant.upadhyay@gmail.com</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
