import React, { PropTypes } from 'react';

export default class UserDetails extends React.Component {
  render() {
    return(
      <div className="col m9">
        <div className="user-details">
          <h5>Job Description</h5>
          <div className="content-box">
            <dl>
              <dt>Joining Date</dt>
              <dd>20 Nov 2017</dd>
            </dl>
            <dl>
              <dt>Probation Period</dt>
              <dd>3 Month</dd>
            </dl>
            <dl>
              <dt>Confirmation Status</dt>
              <dd>Confirm</dd>
            </dl>
            <dl>
              <dt>Skills</dt>
              <dd>Rails, Rubby, React, Node, Amazon</dd>
            </dl>
            <dl>
              <dt>Experience</dt>
              <dd>4 years</dd>
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
