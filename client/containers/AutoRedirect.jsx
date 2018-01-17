import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { removeRedirect } from '../actions/user';

class AutoRedirect extends React.Component{
  componentDidUpdate(){
    if (this.props.user.redirect) {
      this.props.removeRedirect();
    }
  }
  render() {
    return (
      <div>
        {this.props.user.redirect ?
          <Redirect to={this.props.user.redirect} />
        : '' }
      </div>
    );
  }
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({removeRedirect}, dispatch)
)(AutoRedirect);
