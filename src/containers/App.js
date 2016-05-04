import React from 'react';

class App extends React.Component {

  static propTypes() {
    return {
      children: React.PropTypes.array
    };
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            foo
          </li>
          <li>
            foo
          </li>
        </ul>
        { this.props.children }
      </div>
      );
  }
}

module.exports = App;
