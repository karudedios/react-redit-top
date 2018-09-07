import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';

import FadingSwipeable from './FadingSwipeable';

type Props = {
  post: Object,
  onPostSelect?: Function,
  onPostDismiss?: Function,
};

const Post = styled.div`
  display: flex;
  flex: 1 1 100%;
  cursor: pointer;
  font-size: 12px;
  padding: 20px 10px;
  position: relative;
  flex-direction: row;
  font-family: Roboto;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => (props.selected ? '#f3f3f3' : '')};

  &:hover {
    background-color: #f3f3f3;
  }
`;

const ImagePreview = styled.div`
  height: 50px;
  display: flex;
  flex: 0 0 50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Header = styled.h4`
  margin: 0;
  width: 300px;
  margin-top: 5px;
`;

const PostDetails = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ${ImagePreview} + & {
    margin-left: 10px;

    ${Header} {
      width: 230px;
    }
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${Header} + &, & + & {
    margin-top: 5px;
  }
`;

const ReadBullet = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: ${props => (props.read ? 'blue' : 'transparent')}
`;

const DismissButton = styled.div`
  top: 10px;
  right: 10px;
  color: #a0a0a0;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
`;

export default function RedditItem({ post, onPostSelect, onPostDismiss }: Props) {
  if (!post) return null;

  const selectPost = () => onPostSelect(post.id);
  const dismissPost = () => onPostDismiss(post.id);

  const renderImagePreview = () => {
    if (!post.thumbnail) return null;

    return (
      <ImagePreview
        style={{ backgroundImage: `url(${post.thumbnail})` }}
      />
    );
  };

  return (
    <FadingSwipeable
      threshold={75}
      onSwipeEnd={({ pastThreshold }) => (pastThreshold ? dismissPost() : null)}
    >
      <Post onClick={selectPost}>
        { renderImagePreview() }

        <PostDetails>
          <Header>{post.title}</Header>

          <Info>
            <span>
              {`By: ${post.author}`}
            </span>
            <span>{ moment(post.created).from(Date.now()) }</span>
          </Info>

          <Info>
            <span>
              { `${post.num_comments} Comments` }
            </span>
            <ReadBullet
              read={post.visited}
              title={post.visited ? 'read' : 'unread'}
            />
          </Info>
        </PostDetails>

        <DismissButton
          title="dismiss post"
          onClick={dismissPost}
        >
          &times;
        </DismissButton>
      </Post>
    </FadingSwipeable>
  );
}

RedditItem.defaultProps = {
  onPostSelect: x => x,
  onPostDismiss: x => x,
};
