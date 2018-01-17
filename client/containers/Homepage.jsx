import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Homepage extends React.Component {
  render() {
    return(
      <div>
        Homepage
      </div>
    );
  }
}

export default connect(
  state => ({ ...state })
)(Homepage);
