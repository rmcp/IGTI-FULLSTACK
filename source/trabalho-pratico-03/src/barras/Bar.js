import React from "react";

export default class Bar extends React.Component {
  render() {
    const { value, color = "black" } = this.props;
    const width = value.toString() + "%";

    return (
      <div
        style={{
          marginTop: "40px",
          width: width,
          height: "20px",
          backgroundColor: color,
        }}
        alt={width}
      />
    );
  }
}
