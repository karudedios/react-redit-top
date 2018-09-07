import * as React from 'react';
import RedditPostDetail from './RedditPostDetail';
import ResponsiveSidebar from './ResponsiveSidebar';

export default function Application() {
  return (
    <React.Fragment>
      <ResponsiveSidebar />

      <RedditPostDetail />
    </React.Fragment>
  );
}
