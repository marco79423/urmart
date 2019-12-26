import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import {ProductTable} from './ProductTable'

test('it should render ProductTable component correctly with empty product list', () => {
  const component = ReactTestRenderer.create(<ProductTable/>);
  expect(component.toJSON()).toMatchSnapshot()
});

test('it should render ProductTable component correctly with product list', () => {

  const products = [
    {
      'key': 1,
      'id': 1,
      'name': 'product A1',
      'stockPcs': 4,
      'price': 100.0,
      'shopId': 1,
      'vip': false
    },
    {
      'key': 2,
      'id': 2,
      'name': 'product A2',
      'stockPcs': 19,
      'price': 200.0,
      'shopId': 1,
      'vip': false
    },
    {
      'key': 3,
      'id': 3,
      'name': 'product A3',
      'stockPcs': 30,
      'price': 300.0,
      'shopId': 1,
      'vip': true
    },
  ]

  const component = ReactTestRenderer.create(<ProductTable products={products}/>);
  expect(component.toJSON()).toMatchSnapshot()
});
