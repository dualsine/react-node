import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions/user';

import Header from '../components/Header';

class App extends React.Component {
  componentDidMount() {
    this.props.login();
  }
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default connect(
  state => ({...state}),
  dispatch => bindActionCreators({login}, dispatch)
)(App);
