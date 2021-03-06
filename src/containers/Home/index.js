import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

@CSSModules(styles)
class Home extends React.Component {

  static propTypes = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName='home'>
        <h1>welcome to frontend-boilerplate</h1>
        <h4>react // redux // eslint // webpack // css-modules</h4>
        <img src='https://media.giphy.com/media/gx54W1mSpeYMg/giphy.gif' />
      </div>
    );
  }
}

module.exports = Home;
