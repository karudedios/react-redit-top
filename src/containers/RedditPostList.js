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
  removePost: Function,
  selectPost: Function,
  onChildrenClick?: Function,
};

type State = {
  dismissingPosts: [],
};

const delay = time => new Promise(resolve => setTimeout(resolve, time));

class RedditPostList extends React.Component<Props, State> {
  static defaultProps = {
    onChildrenClick: x => x,
  };

  state = {
    dismissingPosts: {},
  };

  componentWillMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  removePostAsync = (id) => {
    const { removePost } = this.props;
    const { dismissingPosts } = this.state;

    this.setState({
      dismissingPosts: {
        ...dismissingPosts,
        [id]: true,
      },
    }, function autoDismissPost() {
      delay(200).then(() => {
        removePost(id);

        this.setState({
          dismissingPosts: {
            ...dismissingPosts,
            [id]: false,
          },
        });
      });
    });
  }

  selectPost = (id) => {
    const { selectPost, onChildrenClick } = this.props;

    selectPost(id);
    onChildrenClick();
  };

  render() {
    const { dismissingPosts } = this.state;
    const { posts, removePost } = this.props;

    return (
      <List
        root="div"
        items={posts}
        render={({ data }) => (
          <RedditItem
            post={data}
            key={data.id}
            onPostDismiss={removePost}
            onPostSelect={this.selectPost}
            isDismissing={dismissingPosts[data.id]}
            onPostDismissAsync={this.removePostAsync}
          />
        )}
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
    removePost: id => dispatch(RedditActions.removePost(id)),
    selectPost: id => dispatch(RedditActions.selectPost(id)),
  }),
)(RedditPostList);
