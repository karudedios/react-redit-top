import * as React from 'react';
import styled from 'styled-components';
import Sidebar from 'components/Sidebar';
import Hamburger from 'components/Hamburger';
import RedditPostList from './RedditPostList';

type State = {
  open: bool,
  autoHide: bool,
};

const mobileContext = window.matchMedia('(max-width: 800px)');

export const StyledSidebar = styled(Sidebar)`
  z-index: 2;
  width: 300px;
  height: 100%;
  display: flex;
  overflow: auto;
  position: fixed;
  box-sizing: border-box;
  flex-direction: column;
  background-color: #dadada;
  border-right: 1px solid #f1f1f1;
  transition: transform .3s ease-in;

  &.auto-hide {
    border-right: 0;
    transform: translateX(-101%);
    box-shadow: -1px 0px 7px 1px #3f3f3f;

    &.open {
      transform: translateX(0%);
    }
  }
`;

export default class ResponsiveSidebar extends React.Component<null, State> {
  state = {
    open: false,
    autoHide: mobileContext.matches,
  };

  componentWillMount() {
    mobileContext.addListener(this.onMediaChange);
  }

  componentWillUnmount() {
    mobileContext.removeListener(this.onMediaChange);
  }

  onMediaChange = () => {
    this.setState({
      autoHide: mobileContext.matches,
    });
  };

  closeSidebar = () => {
    this.setState({
      open: false,
    });
  };

  openSidebar = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { open, autoHide } = this.state;

    return (
      <React.Fragment>
        <Hamburger onClick={this.openSidebar} />

        <StyledSidebar
          open={open}
          autoHide={autoHide}
          triggerClose={this.closeSidebar}
        >
          <RedditPostList
            onChildrenClick={this.closeSidebar}
          />
        </StyledSidebar>
      </React.Fragment>
    );
  }
}
