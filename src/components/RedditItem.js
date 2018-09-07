import moment from 'moment';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import FadingSwipeable from './FadingSwipeable';

type Props = {
  post: Object,
  isDismissing?: bool,
  onPostSelect?: Function,
  onPostDismiss?: Function,
  onPostDismissAsync?: Function,
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
  width: 280px;
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
      width: 220px;
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

const SwipeRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const FadingSwipeableDismissed = styled(FadingSwipeable)`
  animation-fill-mode: forwards;
  ${props => (props.fading ? `animation: 300ms ${SwipeRight} ease-in;` : '')}
`;

export default function RedditItem({
  post,
  isDismissing,
  onPostSelect,
  onPostDismiss,
  onPostDismissAsync,
}: Props) {
  if (!post) return null;

  const selectPost = () => onPostSelect(post.id);
  const dismissPost = () => onPostDismiss(post.id);
  const dismissPostWithAnimation = () => onPostDismissAsync(post.id);

  const renderImagePreview = () => {
    let preview = post.thumbnail;
    const previewImages = (post.preview && post.preview.images);

    if (preview === 'self' || preview === 'default') {
      if (!previewImages) {
        return null;
      }

      preview = previewImages[0].source.url;
    }

    return (
      <ImagePreview
        style={{ backgroundImage: `url(${preview})` }}
      />
    );
  };

  return (
    <FadingSwipeableDismissed
      threshold={75}
      fading={isDismissing}
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
            <span>
              { moment.unix(post.created_utc).fromNow() }
            </span>
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
          onClick={dismissPostWithAnimation}
        >
          &times;
        </DismissButton>
      </Post>
    </FadingSwipeableDismissed>
  );
}

RedditItem.defaultProps = {
  isDismissing: false,
  onPostSelect: x => x,
  onPostDismiss: x => x,
  onPostDismissAsync: x => x,
};
