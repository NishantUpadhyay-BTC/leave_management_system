import React, {PropTypes} from 'react';
import Header from './Header';
import LeaveListingRaw from './LeaveListingRaw'
import LeavesListingTableHeader from './LeavesListingTableHeader'

export default class Dashboard extends React.Component {
    constructor(){
      super();
      this.getLeaveDetails = this.getLeaveDetails.bind(this);
      this.getUserLeavesListBytype = this.getUserLeavesListBytype.bind(this);
      this.getSignOffNewObject = this.getSignOffNewObject.bind(this);
      this.getPendingRequestCount = this.getPendingRequestCount.bind(this);
      this.prepare_rejected_leaves = this.prepare_rejected_leaves.bind(this);
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

    prepare_rejected_leaves(leave){
      return <LeaveListingRaw key={leave.id} data = {leave} />
    }

  render() {
    let rejected_leaves = [
      { id: 2, name: 'Hitesh Patel', designation: 'Sr. Developer', from_date: '03/11/2016', to_date: '16/11/2016', approved_by: 'Amit Patel' },
      { id: 3, name: 'Nishant Patel', designation: 'Sr. Developer', from_date: '03/11/2016', to_date: '16/11/2016', approved_by: 'Amit Patel' }
    ];
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
                      <li className="tab"><a className="active" href="#approved">Approved</a></li>
                      <li className="tab"><a href="#pendding">Pendding</a></li>
                      <li className="tab"><a href="#rejected">Rejected</a></li>
                      <li className="tab"><a href="#cancelled">Cancelled</a></li>
                      <li className="tab"><a href="#emergency">Emergency</a></li>
                    </ul>
                    <div className="tab-content" id="approved">
                      <table className="responsive-table">
                        <LeavesListingTableHeader />
                        <tbody>
                          <tr>
                            <td>001</td>
                            <td onClick={this.getUserLeavesListBytype} >Nishant Upadhyay</td>
                            <td>Sr. Developer</td>
                            <td>03/11/2016</td>
                            <td>16/11/2016</td>
                            <td>Amit Patel</td>
                            <td><a href="#"><span className="fa fa-share"></span></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-content" id="pendding">
                      <table className="responsive-table">
                        <LeavesListingTableHeader />
                        <tbody>
                          <tr>
                            <td>001</td>
                            <td onClick={this.getLeaveDetails}>Nishant Upadhyay</td>
                            <td>Sr. Developer</td>
                            <td>03/11/2016</td>
                            <td>16/11/2016</td>
                            <td>Amit Patel</td>
                            <td><a href="#"><span className="fa fa-share"></span></a></td>
                          </tr>
                          <tr>
                            <td>002</td>
                            <td onClick={this.getLeaveDetails}>Hitesh Patel</td>
                            <td>Sr. Developer</td>
                            <td>03/11/2016</td>
                            <td>16/11/2016</td>
                            <td>Amit Patel</td>
                            <td><a href="#"><span className="fa fa-share"></span></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-content" id="rejected">
                      <table className="responsive-table">
                        <LeavesListingTableHeader />
                        <tbody>
                          { rejected_leaves.map(leave => this.prepare_rejected_leaves(leave))}
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-content" id="cancelled">
                      <table className="responsive-table">
                        <LeavesListingTableHeader />
                        <tbody>
                          <tr>
                            <td>001</td>
                            <td onClick={this.getPendingRequestCount}>Nishant Upadhyay</td>
                            <td>Sr. Developer</td>
                            <td>03/11/2016</td>
                            <td>16/11/2016</td>
                            <td>Amit Patel</td>
                            <td><a href="#"><span className="fa fa-share"></span></a></td>
                          </tr>
                          <tr>
                            <td>002</td>
                            <td>Hitesh Patel</td>
                            <td>Sr. Developer</td>
                            <td>03/11/2016</td>
                            <td>16/11/2016</td>
                            <td>Amit Patel</td>
                            <td><a href="#"><span className="fa fa-share"></span></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-content" id="emergency">
                      <table className="responsive-table">
                        <LeavesListingTableHeader />
                        <tbody>
                          <tr>
                            <td>001</td>
                            <td onClick={this.getSignOffNewObject}>Nishant Upadhyay</td>
                            <td>Sr. Developer</td>
                            <td>03/11/2016</td>
                            <td>16/11/2016</td>
                            <td>Amit Patel</td>
                            <td><a href="#"><span className="fa fa-share"></span></a></td>
                          </tr>
                          <tr>
                            <td>002</td>
                            <td>Hitesh Patel</td>
                            <td>Sr. Developer</td>
                            <td>03/11/2016</td>
                            <td>16/11/2016</td>
                            <td>Amit Patel</td>
                            <td><a href="#"><span className="fa fa-share"></span></a></td>
                          </tr>
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
