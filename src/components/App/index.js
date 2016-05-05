import React from 'react';

const styles = (process.env.BROWSER && require('./index.scss')) || {};

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        { this.props.children }
      </div>
      );
  }
}

App.propTypes = {
  children: React.PropTypes.object
}

export default App;
