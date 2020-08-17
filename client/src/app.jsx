import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'


import configureStore from 'redux/stores/configureStore'

import Router from 'routes/routes'
import CatchError from 'components/helpers/catchError/catchError'

import 'styles/main'

export const history = createBrowserHistory()

const App = () => (
  <CatchError>
    <Provider store={configureStore}>
      <Router history={history} />
    </Provider>
  </CatchError>
)

export default App
