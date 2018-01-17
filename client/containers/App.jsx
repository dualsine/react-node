import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginFromStorage } from '../actions/user';
import Header from '../components/Header';
import Content from './Content';

class App extends React.Component {
  componentDidMount() {
    this.props.loginFromStorage();
  }
  render() {
    return (
      <div>
        <Header />

        <Content />
      </div>
    );
  }
}

App.propTypes = {
  loginFromStorage: PropTypes.func.isRequired,
};

App = connect(
  state => ({ ...state }),
  dispatch => bindActionCreators({ loginFromStorage }, dispatch),
)(App);

export default withRouter(App);
