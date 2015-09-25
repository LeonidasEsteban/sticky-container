import React from 'react';

const Sticking = React.createClass({
  propTypes: {
    active: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      className: '',
    };
  },
  getInitialState() {
    return {
      height: 0,
      sticky: false,
      initialHeight: 0,
    };
  },
  componentDidMount() {
    this.onWindowScroll();
  },
  onWindowScroll() {
    const StickyElement = React.findDOMNode(this.refs.element);
    this.setState({initialHeight: StickyElement.offsetTop});
    window.onscroll = ()=> {
      this.calculateDistance(window.scrollY, this.state.initialHeight);
    };
  },
  render() {
    let stickyStyles = {};
    if (this.state.sticky) {
      stickyStyles = { position: 'fixed', top: 0, zIndex: 10};
      return (
         <div
          style={stickyStyles}
          ref="element"
          className={this.props.className}
          >
          {this.props.children}
        </div>
      );
    }
    stickyStyles = { position: 'initial', top: 'initial'};
    return (
      <div
        style={stickyStyles}
        ref="element"
        className={this.props.className}
        >
        {this.props.children}
      </div>
    );
  },
  calculateDistance(scrollDistance, initHeight) {
    this.setState({height: initHeight - scrollDistance});
    if (this.state.height < 0 ) {
      this.setState({sticky: true});
      this.props.active(true);
    } else {
      this.setState({sticky: false});
      this.props.active(false);
    }
  },
});

export default Sticking;
