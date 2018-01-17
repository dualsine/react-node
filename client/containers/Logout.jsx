import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/user';

class Logout extends React.Component{
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(
  state => ({...state}),
  dispatch => bindActionCreators({ logout }, dispatch),
)(Logout);
