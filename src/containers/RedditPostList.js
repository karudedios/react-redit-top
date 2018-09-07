import * as React from 'react';
import { connect } from 'react-redux';
import * as RedditActions from 'actions/reddit';
// import { REDDIT_TYPES } from 'actions/types';
import { List as ImmutableList } from 'immutable';

import List from 'components/List';
import RedditItem from 'components/RedditItem';

type Props = {
  posts: ImmutableList,
  fetchPosts: Function,
};

class RedditPostList extends React.Component<Props> {
  componentWillMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <List
        root="div"
        items={posts}
        render={({ data }) => (<RedditItem key={data.id} post={data} />)}
      />
    );
  }
}

export default connect(
  state => ({
    posts: state.getIn(['reddit', 'posts']),
  }),

  dispatch => ({
    fetchPosts: () => dispatch(RedditActions.fetchPosts()),
  }),
)(RedditPostList);
