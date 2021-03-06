import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'
import Main from './components/Main'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Homepage from './components/Homepage'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Signup } />
          <Route exact path='/signin' component={ Signin } />
          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/main' component={ Main } />
          <Route exact path='/home' component={ Homepage } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )