import React, {PropTypes} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Header extends React.Component {
    componentDidMount(){
      $('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          gutter: 0, // Spacing from edge
          belowOrigin: false, // Displays dropdown below the button
          alignment: 'left' // Displays dropdown with edge aligned to the left of button
        }
      );
    }
      render() {

          return (
            <div className="nav header z-depth-2">
              {this.props.children}
              <div className="container">
                  <div className="header-top clearfix">
                      <div className="logo left">
                          <a href="index.html"><img src="assets/logo.png" alt=""/><span className="header-text">mart SignOff</span></a>
                      </div>
                      <div className="right-links">
                          <ul className="menu">
                              <li className="menu-whitebg">
                                <Link to= "/dashboard" className="fa fa-dashboard"></Link>
                              </li>
                              <li className="menu-whitebg notify-dropdown">
                                  <a href="#" className="dropdown-button fa fa-gear" data-constrainwidth="false" data-alignment="right" data-beloworigin="true" data-activates="setting-nav"></a>
                                  <ul className="dropdown-content" id="setting-nav">
                                      <li>
                                        <Link to="/holidays">Manage Holidays</Link>
                                      </li>
                                      <li>
                                        <Link to="/leave_types">Manage Leave Types</Link>
                                      </li>
                                      <li>
                                          <Link to="/new_employee">Add New Employe</Link>
                                      </li>
                                  </ul>
                              </li>
                              <li className="menu-whitebg notify-dropdown">
                                  <a href="#" className="dropdown-button fa fa-bell" data-constrainwidth="false" data-alignment="right" data-beloworigin="true" data-activates="notifications">
                                      <span className="notify-icon"></span>
                                  </a>
                                  <ul className="dropdown-content" id="notifications">
                                      <li className="highlighted">
                                          <a href="#">
                                              <span className="fa fa-envelope"></span>
                                              Nishant requested for Leave...</a>
                                      </li>
                                      <li>
                                          <a href="#">
                                              <span className="fa fa-envelope-open"></span>
                                              Nishant cancelled his Leave...</a>
                                      </li>
                                      <li>
                                          <a href="#">
                                              <span className="fa fa-envelope-open"></span>
                                              Nishant requested for Leave...</a>
                                      </li>
                                      <li>
                                          <a href="#">
                                              <span className="fa fa-envelope-open"></span>
                                              Nishant requested for Leave...</a>
                                      </li>
                                      <li className="seeall">
                                          <Link to="/notifications">See All</Link>
                                      </li>
                                  </ul>
                              </li>
                              <li className="profile-menu">
                                  <a href="#" className="dropdown-button" data-constrainwidth="false" data-alignment="right" data-beloworigin="true" data-activates="profileDropdown"><img src="assets/profile-image.jpg" alt="" className="rounded"/>
                                      <span className="dropdown-icon fa fa-caret-down"></span>
                                  </a>
                                  <ul className="dropdown-content" id="profileDropdown">
                                      <li>
                                          <div className="user-detail clearfix">
                                              <div className="profile-image">
                                                  <img src="assets/profile-image.jpg" alt=""/>
                                              </div>
                                              <div className="basic-detail">
                                                  <h5>User Name</h5>
                                                  <div className="username-email">hitesh.patoliya@botreetechnologies.com</div>
                                              </div>
                                          </div>
                                      </li>
                                      <li className="divider"></li>
                                      <li>
                                          <div className="profilemenu-bottom">
                                              <div className="link">
                                                <Link to="/profile">My Account</Link>
                                                |
                                                <Link to="request_leave">Request Leave</Link>
                                              </div>
                                              <div className="logout-btn">
                                                  <a href="#" className="fa fa-power-off"></a>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>
                              </li>
                          </ul>
                      </div>
                  </div>
                  <div className="header-bottom">
                      <div className="row">
                          <div className="col m8">
                              <h1>{this.props.current_page}</h1>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
  }
