import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  menuClick() {

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
          <Menu.Item
            as={NavLink}
            to='/login'
            exact
            name='login'
          />
          <Menu.Item
            as={NavLink}
            to='/signup'
            exact
            name='signup'
          />

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

export default Header;
