import React from 'react';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

class ServerError extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hide: false,
    };
  }

  render() {
    return (
      <div className={classNames({ hide: this.state.hidden })} style={{ marginBottom: '20px' }}>
        {this.props.servererror ?
          <Message error header="Something went wrong" content={this.props.servererror} />
          : '' }
      </div>
    );
  }
}

export default connect(
  state => ({ ...state.errors })
)(ServerError);
