import * as React from 'react';
import RedditPostList from './RedditPostList';
import ResponsiveSidebar from './ResponsiveSidebar';

export default function Application() {
  return (
    <React.Fragment>
      <ResponsiveSidebar>
        <RedditPostList />
      </ResponsiveSidebar>
    </React.Fragment>
  );
}
