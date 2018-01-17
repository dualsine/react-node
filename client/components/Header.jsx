import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
  guestElements() {
    return [
      <Menu.Item as={NavLink} to='/login' exact name='login' key="login" />,
      <Menu.Item as={NavLink} to='/signup' exact name='signup' key="signup" />
    ];
  }
  loggedElements() {
    return [
      <Menu.Item as={NavLink} to='/logout' exact name="logout" key="logout" />,
    ];
  }
  render() {
    return (
      <Container text>
        <Menu>
          <Menu.Item
            as={NavLink}
            to='/'
            exact
            name='home'
          />
          {this.props.user.email ? this.loggedElements() : this.guestElements() }

          <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Search...' />
                <i className='search link icon' />
              </div>
              <div className='results' />
            </div>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}

export default connect(
  state => ({...state})
)(Header);
