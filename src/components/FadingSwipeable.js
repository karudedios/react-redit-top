// @flow
import * as React from 'react';

type Prop = {
  tolerance?: number,
  threshold?: number,
  className?: string,
  onSwipeEnd?: Function,
  children: [React.Component],
  base?: string | React.Component,
};

type State = {
  detected: bool,
  initialX: number,
  timestamp: number,
};

const idFunc = x => x;

const normalizeCoordinates = (event) => {
  let root = event;

  if (event.touches) {
    // eslint-disable-next-line
    root = event.touches[0];
  }

  return ({
    x: root.screenX,
  });
};

let supportsPassive = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
      return supportsPassive;
    },
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {
  supportsPassive = false;
}

export default class FadingSwipeable extends React.Component<Prop, State> {
  state = {
    initialX: 0,
    timestamp: 0,
    detected: false,
  };

  static defaultProps = {
    base: 'div',
    tolerance: 10,
    threshold: 75,
    className: '',
    onSwipeEnd: idFunc,
  };

  componentDidMount() {
    const { root } = this;
    const passiveOpt = supportsPassive ? { passive: true } : false;

    this.setState({
      timestamp: Date.now(),
    });

    root.addEventListener('touchstart', this.start, passiveOpt);
    root.addEventListener('touchmove', this.move, passiveOpt);
    root.addEventListener('touchend', this.end, passiveOpt);
  }

  componentWillUnmount() {
    const { root } = this;

    root.removeEventListener('touchstart', this.start);
    root.removeEventListener('touchmove', this.move);
    root.removeEventListener('touchend', this.end);
  }

  start = (event) => {
    const { x: offset } = normalizeCoordinates(event);

    this.setState({
      detected: true,
      initialX: offset,
    });
  };

  move = (event) => {
    const { threshold, tolerance } = this.props;
    const { initialX, detected } = this.state;

    if (!detected) return;

    const { x } = normalizeCoordinates(event);

    const delta = x - initialX;
    const distance = Math.abs(delta);
    const opacity = 1 - (Math.min(distance, 100) / 100);

    if (distance < tolerance && opacity !== 1) return;

    this.setState({
      pastThreshold: distance > threshold,
    });

    if (opacity > 0) {
      this.root.style.opacity = opacity;
      this.root.style.left = `${delta}px`;
    } else {
      this.root.style.opacity = 0;
    }
  };

  end = () => {
    const { onSwipeEnd } = this.props;
    const { pastThreshold } = this.state;

    if (!pastThreshold) {
      this.root.style.opacity = 1;
      this.root.style.left = '0px';
    } else {
      this.root.style.opacity = 0;
    }

    this.setState({
      detected: false,
      pastThreshold: false,
    });

    onSwipeEnd({
      pastThreshold,
    });
  };

  setRoot = (node) => {
    this.root = node;
  };

  render() {
    const { base, children, className } = this.props;
    const { timestamp } = this.state;

    return (
      React.createElement(
        base,
        {
          className,
          ref: this.setRoot,
          id: `swipable-${timestamp}`,
          style: { position: 'relative' },
        },
        children,
      )
    );
  }
}
