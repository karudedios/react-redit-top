// @flow

import * as React from 'react';

type Prop<T> = {
  items: [T],
  render: T => React.Component,
  root?: (string | React.Component),
};

export default function List({ root, items, render }: Prop) {
  return React.createElement(
    root,
    null,
    items.map(render),
  );
}

List.defaultProps = {
  root: 'ul',
};
