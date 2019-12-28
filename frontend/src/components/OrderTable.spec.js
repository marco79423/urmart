import React from 'react'
import ReactTestRenderer from 'react-test-renderer'

import {OrderTable} from './OrderTable'

test('it should render OrderTable component correctly with empty order list', () => {
  const component = ReactTestRenderer.create(<OrderTable/>);
  expect(component.toJSON()).toMatchSnapshot()
});

test('it should render OrderTable component correctly in loading state', () => {
  const component = ReactTestRenderer.create(<OrderTable loading={true}/>);
  expect(component.toJSON()).toMatchSnapshot()
});

test('it should render OrderTable component correctly with product list', () => {
  const orders = [
    {
      'key': 1,
      'id': 1,
      'productId': 1,
      'qty': 1,
      'price': 100.0,
      'customerId': 1,
      'vip': false,
    },
    {
      'key': 2,
      'id': 2,
      'productId': 2,
      'qty': 2,
      'price': 200.0,
      'customerId': 2,
      'vip': true,
    },
  ]

  const component = ReactTestRenderer.create(<OrderTable orders={orders}/>);
  expect(component.toJSON()).toMatchSnapshot()
});
