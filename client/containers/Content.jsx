import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Login from './Login';
import Signup from './Signup';
import { Homepage } from './Home';

class Component extends React.Component {
  render() {
    return (
      <Container text style={{marginTop: '20px',}}>
        <Route path='/' exact component={Homepage} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup}  />
      </Container>
    );
  }
}

export default Component;
