import * as React from 'react';
import { storiesOf } from '@storybook/react';

import List from '../components/List';

const items = [
  1,
  2,
  3,
  4,
  5,
];

storiesOf('Components/List', module)
  .add('it renders nothing if no items are provided', () => (
    <List />
  ))
  .add('it renders nothing if no `render` mechanism is provided', () => (
    <List items={items} />
  ))
  .add('it renders properly if `items` and `render` are provided', () => (
    <List
      items={items}
      render={x => (<li key={x}>{x}</li>)}
    />
  ))
  .add('it should let you customize the `root` element in which the list is rendered', () => (
    <List
      root="div"
      items={items}
      render={x => (<div key={x}>{x}</div>)}
    />
  ));
