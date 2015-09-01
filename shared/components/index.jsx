import React from 'react';
export default class AppView extends React.Component {
  render() {
    return (
      <main id="app-view">
        <h1>Todos Redux</h1>
        <hr />
        {this.props.children}
      </main>
    );
  }
}
