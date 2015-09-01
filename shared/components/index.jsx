import React from 'react';
export default class AppView extends React.Component {
  classFunction() {
    var statement = 0;
    var potato = 0;
    for (var i; i < 10; i++) {
      const b = i;
      console.log(b);
      console.log(i);
    }

    console.log("Double Quotes!");
  }
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
