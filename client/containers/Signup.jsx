import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import validate from 'validate.js';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import ServerError from './ServerError';
import { signup } from '../actions/user';
import { deleteServerError } from "../actions/errors";

class Signup extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validation: {},
    };

    this.validationConstraints = {
      email: {
        presence: {allowEmpty: false},
        email: true,
      },
      password: {
        presence: {allowEmpty: false},
      },
    };
  }
  componentDidMount() {
    if (this.props.errors.servererror) this.props.deleteServerError();
  }
  handleUserInput(e) {
    if (this.props.errors.servererror) this.props.deleteServerError();

    const { value, name } = e.target;
    this.setState({ [name]: value });
  }
  validate() {
    const validation = validate({
      email: this.state.email,
      password: this.state.password,
    }, this.validationConstraints);

    this.setState({ validation });

    if (!validation) {
      this.props.signup(this.state.email, this.state.password);
    }
  }

  render() {
    const formClasses = classNames({
      error: true,
      loading: this.props.user.loading
    });
    return (
      <Form noValidate className={formClasses}>
        <Header size='huge'>Create account</Header>

        <Form.Field>
          <label htmlFor="email">Email</label>
          <input type="email"
                 placeholder="Email"
                 name="email"
                 value={this.state.email}
                 onInput={this.handleUserInput.bind(this)}
          />
        </Form.Field>
        {(this.state.validation && this.state.validation.email) ?
          <Message error header='Wrong email' content={this.state.validation.email} />
        : '' }

        <Form.Field>
          <label htmlFor="password">Password</label>
          <input type="password"
                 placeholder="Password"
                 name="password"
                 value={this.state.password}
                 onInput={this.handleUserInput.bind(this)}
          />
        </Form.Field>
        {(this.state.validation && this.state.validation.password) ?
          <Message error header='Wrong password' content={this.state.validation.password} />
        : '' }

        <ServerError />

        {this.props.user.redirectLogin ?
          <Redirect to="/login" push />
        : '' }

        <Button onClick={this.validate.bind(this)}>Create account</Button>
      </Form>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteServerError: PropTypes.func.isRequired,
};

export default connect(
  state => ({...state}),
  dispatch => bindActionCreators({signup, deleteServerError}, dispatch),
)(Signup);
