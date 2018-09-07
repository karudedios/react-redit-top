import moment from 'moment';
import * as React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 50px;
  flex: 1 1 100%;
  margin-left: 300px;
  flex-direction: column;
  transition: margin-left .3s ease-in;

  @media(max-width: 800px) {
    margin-left: 0;
  }
`;

const Image = styled.img`
  width: 100%;
  margin-bottom: 5px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type Props = {
  post: Object,
};

export default function RedditItemDetail({ post }: Props) {
  if (!post) return null;

  const data = post.get('data');

  const renderThumbnail = () => {
    if (!data.getIn(['preview', 'images'])) return null;

    const url = data.getIn(['preview', 'images', 0, 'source', 'url']);

    return (
      <Image src={url} />
    );
  };

  const renderText = () => {
    if (!data.get('selftext')) return null;

    return (
      <Markdown source={data.get('selftext')} />
    );
  };

  console.log(
    data.toJS(),
  );

  return (
    <Container>
      <Info>
        <span>
          { `by: ${data.get('author')}` }
        </span>

        <span>
          { moment.unix(data.get('created_utc')).fromNow() }
        </span>
      </Info>
      <h1>{ data.get('title') }</h1>

      { renderThumbnail() }

      <h6>
        <a href={data.get('url')}>
          Source
        </a>
      </h6>

      { renderText() }
    </Container>
  );
}
