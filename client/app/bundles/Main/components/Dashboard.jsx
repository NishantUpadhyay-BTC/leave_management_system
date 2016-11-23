import React, {PropTypes} from 'react';
import Header from './Header';

export default class Dashboard extends React.Component {
    componentDidMount(){
        $('ul.tabs').tabs();
    }
    render() {
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
                            <thead>
                              <tr>
                                <th data-field="id">Em. ID</th>
                                <th data-field="name">Name</th>
                                <th data-field="designation">Designation</th>
                                <th data-field="applyed">Applyed Date</th>
                                <th data-field="leave">Leave Date</th>
                                <th data-field="by">Approved By</th>
                                <th data-field="action"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>001</td>
                                <td>Nishant Upadhyay</td>
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
                              <tr>
                                <td>001</td>
                                <td>Nishant Upadhyay</td>
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
                              <tr>
                                <td>001</td>
                                <td>Nishant Upadhyay</td>
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
                        <div className="tab-content" id="pendding">
                          <table className="responsive-table">
                            <thead>
                              <tr>
                                <th data-field="id">Em. ID</th>
                                <th data-field="name">Name</th>
                                <th data-field="designation">Designation</th>
                                <th data-field="applyed">Applyed Date</th>
                                <th data-field="leave">Leave Date</th>
                                <th data-field="by">Approved By</th>
                                <th data-field="action"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>001</td>
                                <td>Nishant Upadhyay</td>
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
                        <div className="tab-content" id="rejected">
                          <table className="responsive-table">
                            <thead>
                              <tr>
                                <th data-field="id">Em. ID</th>
                                <th data-field="name">Name</th>
                                <th data-field="designation">Designation</th>
                                <th data-field="applyed">Applyed Date</th>
                                <th data-field="leave">Leave Date</th>
                                <th data-field="by">Approved By</th>
                                <th data-field="action"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>001</td>
                                <td>Nishant Upadhyay</td>
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
                        <div className="tab-content" id="cancelled">
                          <table className="responsive-table">
                            <thead>
                              <tr>
                                <th data-field="id">Em. ID</th>
                                <th data-field="name">Name</th>
                                <th data-field="designation">Designation</th>
                                <th data-field="applyed">Applyed Date</th>
                                <th data-field="leave">Leave Date</th>
                                <th data-field="by">Approved By</th>
                                <th data-field="action"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>001</td>
                                <td>Nishant Upadhyay</td>
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
                            <thead>
                              <tr>
                                <th data-field="id">Em. ID</th>
                                <th data-field="name">Name</th>
                                <th data-field="designation">Designation</th>
                                <th data-field="applyed">Applyed Date</th>
                                <th data-field="leave">Leave Date</th>
                                <th data-field="by">Approved By</th>
                                <th data-field="action"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>001</td>
                                <td>Nishant Upadhyay</td>
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
