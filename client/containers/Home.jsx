import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteRedirectHome } from "../actions/user";

class Homepage extends React.Component {
  componentDidMount() {
    if (this.props.user.redirectHome) this.props.deleteRedirectHome();
  }
  render() {
    return(
      <div>
        Homepage
      </div>
    );
  }
}

export default connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({deleteRedirectHome}, dispatch),
)(Homepage);
