import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

@CSSModules(styles)
class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.any
  }

  render() {
    
    return (
      <div styleName='app'>
        { this.props.children }
      </div>
      );
  }
}

export default App;
