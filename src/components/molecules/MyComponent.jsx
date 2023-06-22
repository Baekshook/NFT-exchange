import React, { Component } from "react";

class MyComponent extends Component {
  componentDidMount() {
    alert("Page refreshed!");
  }

  handleButtonClick = () => {
    window.location.reload(); // Refresh the page
  };

  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick}>Refresh Page</button>
      </div>
    );
  }
}

export default MyComponent;
