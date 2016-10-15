import React from 'react';
import { connect } from 'react-redux';
import { changeToLocal } from '../actions/nav';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this._changeToLocal = this._changeToLocal.bind(this);
  }

  _changeToLocal() {
    this.props.changeToLocal('This is now from the local state.')
  }

  render() {
    return (
      <div>
        Welcome to frontend-boilerplate
        <div onClick={ this._changeToLocal }>
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
