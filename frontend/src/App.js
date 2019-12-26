import React from 'react'
import {Provider} from 'react-redux'

import Main from './components/Main'
import configureStore from './configureStore'

import './App.css'


const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}


export default App;
