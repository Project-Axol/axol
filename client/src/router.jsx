import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './pages/HomePage/LandingPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import DashboardPage from './pages/DashBoardPage/DashboardPage'
import Header from './Components/Header/Header.component'

const renderComponentWithHeader = (routerProps, Component) => {
  return (
    <>
      <Header />
      <Component {...routerProps} />
    </>
  )
}

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route
      exact
      path="/dashboard"
      render={(props) => renderComponentWithHeader(props, DashboardPage)}
    />
    <Route
      exact
      path="/dashboard/:id"
      render={(props) => renderComponentWithHeader(props, DashboardPage)}
    />
    <Route
      exact
      path="/messages"
      render={(props) => renderComponentWithHeader(props, DashboardPage)}
    />
    <Route
      exact
      path="/messages/:id"
      render={(props) => renderComponentWithHeader(props, DashboardPage)}
    />
    <Route exact path="/explore" component={ExplorePage} />
  </Switch>
)