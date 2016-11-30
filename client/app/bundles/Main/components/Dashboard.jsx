import React, {PropTypes} from 'react';
import Header from './Header';
import LeaveListingRaw from './LeaveListingRaw'
import LeavesListingTableHeader from './LeavesListingTableHeader'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as dashboardActions from './../actions/dashboardActions';
import { browserHistory } from 'react-router';

class Dashboard extends React.Component {
  constructor(props, context){
    super(props, context);
    this.getLeaveDetails = this.getLeaveDetails.bind(this);
    this.getUserLeavesListBytype = this.getUserLeavesListBytype.bind(this);
    this.getSignOffNewObject = this.getSignOffNewObject.bind(this);
    this.getPendingRequestCount = this.getPendingRequestCount.bind(this);
    this.prepare_leave_row = this.prepare_leave_row.bind(this);
  }

  componentWillMount(){
    if (!this.props.authUser.isLoggedIn){
      browserHistory.push('/login')
    } else {
      this.props.actions.loadAllRequests();
    }
  }
  
  componentDidUpdate(){
    if (!this.props.authUser.isLoggedIn){
      browserHistory.push('/login')
    } else {
      this.props.actions.loadAllRequests();
    }
  }
  componentDidMount(){
    $('ul.tabs').tabs();
  }

  getPendingRequestCount(e){
    e.preventDefault();
    return $.ajax({
      url: "/pending_requests_count",
      dataType: 'json',
      method: "get",
      data: {access_token: '17c60fdf5981794bb31f246849ae398e'},
    success: function(data){
      console.log(data)
      }.bind(this)
    });
  }

  getLeaveDetails(e) {
    e.preventDefault();
    return $.ajax({
      // Add replace 22 with leave id of current selected leave
      url: "/sign_offs/22",
      dataType: 'json',
      method: "get",
      data: {access_token: '17c60fdf5981794bb31f246849ae398e'},
    success: function(data){
      console.log(data)
      }.bind(this)
    });
  }

  getUserLeavesListBytype(e){
    e.preventDefault();
    return $.ajax({
      url: "/sign_offs",
      dataType: 'json',
      method: "get",
      data: {access_token: '17c60fdf5981794bb31f246849ae398e'},
    success: function(data){
      console.log(data)
      }.bind(this)
    });
  }

  getSignOffNewObject(e){
    e.preventDefault();
    return $.ajax({
      url: "/sign_offs/new",
      dataType: 'json',
      method: "get",
      data: {access_token: '17c60fdf5981794bb31f246849ae398e'},
    success: function(data){
      console.log(data)
      }.bind(this)
    });
  }

  prepare_leave_row(leave){
    return <LeaveListingRaw key={leave.id} data = {leave} />
  }

  render() {
    let approval_requests = this.props.leave_requests.leaves_for_approval || [];
    let approved_requests = this.props.leave_requests.approved_requests || [];
    let pending_requests = this.props.leave_requests.pending_requests || [];
    let rejected_requests = this.props.leave_requests.rejected_requests || [];
    return (
      <div>
      <div className="content">
        <div className="container">
            <div className="whitebg z-depth-2">
              <div className="row">
                <div className="col m3">
                  <div className="box indigo z-depth-1">
                    <strong>Total Working Days</strong>: 22
                  </div>
                </div>

                <div className="col m3">
                  <div className="box blue z-depth-1">
                    <strong>Public Holidays</strong>: 2
                  </div>
                </div>

                <div className="col m3">
                  <div className="box light-blue lighten-1 z-depth-1">
                    <strong>Weekly Holidays</strong>: 8
                  </div>
                </div>
                <div className="col m3">
                  <div className="box red lighten-3 z-depth-1">
                    <strong>Leave Request</strong>: 12
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m12 leave-requests">
                  <div className="tab-options notify-dropdown">
                    <a href="#" className="dropdown-button btn-flat waves-effect grey lighten-3 font-center" data-constrainwidth="false" data-alignment="right" data-activates="tabOption" ><span className="fa fa-bars"></span></a>
                    <ul className="dropdown-content" id="tabOption">
                      <li><a href="#">Export List</a></li>
                      <li><a href="#">Short By Leave Dates</a></li>
                      <li><a href="#">Short By Latest</a></li>
                    </ul>
                    <a href="#calendar-view" data-hide="#tabview" className="togglebtn btn-flat waves-effect grey lighten-3 center-align"><span className="fa fa-calendar-o"></span></a>
                  </div>
                  <div id="tabview">
                    <ul className="tabs">
                      <li className="tab"><a className="active" href="#approval">Waiting Approval</a></li>
                      <li className="tab"><a href="#approved">Approved</a></li>
                      <li className="tab"><a href="#pendding">Pendding</a></li>
                      <li className="tab"><a href="#rejected">Rejected</a></li>
                    </ul>
                    <div className="tab-content" id="approval">
                      <table className="responsive-table">
                        <LeavesListingTableHeader requestType='approval_requests'/>
                        <tbody>
                          { approval_requests.map(leave => this.prepare_leave_row(leave))}
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-content" id="approved">
                      <table className="responsive-table">
                        <LeavesListingTableHeader requestType='approved_requests'/>
                        <tbody>
                          { approved_requests.map(leave => this.prepare_leave_row(leave))}
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-content" id="pendding">
                      <table className="responsive-table">
                        <LeavesListingTableHeader requestType='pending_requests'/>
                        <tbody>
                          { pending_requests.map(leave => this.prepare_leave_row(leave))}
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-content" id="rejected">
                      <table className="responsive-table">
                        <LeavesListingTableHeader requestType='rejected_requests' />
                        <tbody>
                          { rejected_requests.map(leave => this.prepare_leave_row(leave))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div id="calendar-view" className="calendar-view"></div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    );
  }
}

Dashboard.propTypes = {
  leave_requests: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps){
  return {
      leave_requests: state.leave_requests,
      authUser: state.auth_reducer
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(dashboardActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
