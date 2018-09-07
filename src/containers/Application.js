import * as React from 'react';
import RedditPostList from './RedditPostList';
import RedditPostDetail from './RedditPostDetail';
import ResponsiveSidebar from './ResponsiveSidebar';

export default function Application() {
  return (
    <React.Fragment>
      <ResponsiveSidebar>
        <RedditPostList />
      </ResponsiveSidebar>

      <RedditPostDetail />
    </React.Fragment>
  );
}
