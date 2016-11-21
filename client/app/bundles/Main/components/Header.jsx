import React, { PropTypes } from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="page-topbar" id="header">
        <div className="navbar-fixed">
          <nav className="cyan">
            <div className="nav-wrapper">
              <ul className="left">
                <li className="no-hover">
                  <a
                    className="menu-sidebar-collapse btn-floating btn-flat btn-medium waves-effect waves-light cyan hide-on-large-only"
                    data-activates="slide-out"
                    href="#">
                    <i className="mdi-navigation-menu">
                    </i>
                  </a>
                </li>
                <li>
                  <h1 className="logo-wrapper">
                    Smart SignOff
                  </h1>
                </li>
              </ul>
              <ul className="right hide-on-med-and-down">
                <li>
                  <a
                    className="waves-effect waves-block waves-light toggle-fullscreen"
                    href="javascript:void(0);">
                    <i className="mdi-action-settings-overscan">
                    </i>
                  </a>
                </li>
                <li>
                  <a
                    className="waves-effect waves-block waves-light"
                    href="javascript:void(0);">
                    <i className="mdi-navigation-apps">
                    </i>
                  </a>
                </li>
                <li>
                  <a
                    className="waves-effect waves-block waves-light"
                    href="javascript:void(0);">
                    <i className="mdi-social-notifications">
                    </i>
                  </a>
                </li>
                <li>
                  <a
                    className="waves-effect waves-block waves-light chat-collapse"
                    data-activates="chat-out"
                    href="#">
                    <i className="mdi-communication-chat">
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
