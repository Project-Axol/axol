import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LandingPage from './pages/HomePage/LandingPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import DashboardPage from './pages/DashBoardPage/DashboardPage'

export default(
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/dashboard' component={DashboardPage}/>
        <Route exact path='/dashboard/:id' component={DashboardPage}/>
        <Route exact path='/messages' component={DashboardPage}/>
        <Route exact path='/explore' component={ExplorePage}/>
    </Switch>
) 

