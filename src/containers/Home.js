import React from 'react';
import { connect } from 'react-redux';
import { changeToLocal } from '../actions/nav';

class Home extends React.Component {
  render() {
    return (
      <div>
        HOME
        <div onClick={ () => {
                         this.props.changeToLocal('JON IS AWESOME')
                       } }>
          { this.props.nav.text }
        </div>
      </div>
      );
  }
}

Home.propTypes = {
  nav: React.PropTypes.object,
  changeToLocal: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeToLocal: (text) => {
      dispatch(changeToLocal(text))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);
