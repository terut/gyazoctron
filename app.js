'use strict'

const React = require('react')
const ReactDOM = require('react-dom')

const AppScreen = React.createClass({
  getInitialState: function() {
    return {
      cropping: false,
      cursor: { x: 100, y: 100 },
      entryPoint: {},
      rect: {}
    };
  },
  computedRect: function(a, b) {
    return {
      x: Math.min(a.x, b.x),
      y: Math.min(a.y, b.y),
      width: Math.abs(a.x - b.x),
      height: Math.abs(a.y - b.y)
    }
  },
  handleMouseDown: function(e) {
    this.setState({ cropping: true, entryPoint: { x: e.clientX, y: e.clientY } });
  },
  handleMouseMove: function(e) {
    this.setState({ cursor: { x: e.clientX, y: e.clientY } });

    if (!this.state.cropping) return;

    this.setState({
      rect: this.computedRect(this.state.entryPoint, { x: e.clientX, y: e.clientY })
    });
  },
  handleMouseUp: function(e) {
    this.setState({ cropping: false, rect: {} });
  },
  render: function() {
    return (
        <div className="appScreen" onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
          <RectangleScreen rect={this.state.rect} />
          <div className="cursor" style={ { left: this.state.cursor.x, top: this.state.cursor.y } }>
            <div className="indicator">{ this.state.cursor.x + "\n" + this.state.cursor.y }</div>
          </div>
        </div>
    );
  }
})

const RectangleScreen = React.createClass({
  capture: function() {
  },
  render: function(e) {
    return (
      <div className="rectangleScreen"
           style={ { left: this.props.rect.x, top: this.props.rect.y,
                      width: this.props.rect.width, height: this.props.rect.height } }>
      </div>
    );
  }
});

ReactDOM.render(
  <AppScreen />,
  document.getElementById("app")
);
