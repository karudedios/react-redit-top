// @flow

import * as React from 'react';

type Prop<T> = {
  items: [T],
  render: T => React.Component,
  root?: (string | React.Component),
};

export default function List({ root, items, render }: Prop) {
  if (!items || !render) return null;

  return React.createElement(
    root,
    null,
    items.map(render),
  );
}

List.defaultProps = {
  root: 'ul',
};
