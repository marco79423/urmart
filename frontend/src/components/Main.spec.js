import React from 'react'
import ReactTestRenderer from 'react-test-renderer'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

import Main from './Main'
import {initialState} from '../ducks'

const mockStore = configureStore()

test('it should render Main component correctly', () => {
  const store = mockStore(initialState)
  const component = ReactTestRenderer.create(
    <Provider store={store}>
      <Main/>
    </Provider>
  );
  expect(component.toJSON()).toMatchSnapshot()
})
