import * as React from 'react';
import { connect } from 'react-redux';
import RedditItemDetail from 'components/RedditItemDetail';

type Props = {
  post: Object,
};

function RedditPostDetail({ post }: Props) {
  return (
    <RedditItemDetail post={post} />
  );
}

export default connect(
  state => ({
    post: state.getIn(['reddit', 'selectedPost']),
  }),
)(RedditPostDetail);
