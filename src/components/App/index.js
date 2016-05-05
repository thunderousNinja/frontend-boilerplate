import React from 'react';
import styles from './index.scss';

class App extends React.Component {
  render() {
    return (
      <div className={ styles.app }>
        { this.props.children }
      </div>
      );
  }
}

App.propTypes = {
  children: React.PropTypes.object
}

export default App;
