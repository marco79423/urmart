import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {reducer, rootSaga} from './duck'

const isDevelopment = process.env.NODE_ENV !== 'PRODUCTION'


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers = (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      )
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}
