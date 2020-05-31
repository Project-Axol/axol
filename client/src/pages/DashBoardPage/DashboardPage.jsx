import React from 'react'
import {useLocation} from 'react-router-dom'
import ServerNav from '../../Components/ServerNav/ServerNav'
import ChannelNav from '../../Components/ChannelNav/ChannelNav'
import UserStatus from '../../Components/UserStatus/UserStatus.component'
import Posts from '../../Components/Posts/Posts.component'
import DirectMessages from '../../Components/DirectMessages/DirectMessages.component'


import './dashboard.styles.scss'


const DashboardPage = (props) =>{
    let location = useLocation()
    return(
        <div className='dashboard-container'>
            <ServerNav />
            <ChannelNav />
            <div className='dashboard-center'>
                {!location.pathname.includes('messages')?
                    <Posts/>:
                    <DirectMessages/>
                }
            </div>
            <div className='dashboard-right'>
                <UserStatus/>
            </div>
        </div>
    )
}

export default DashboardPage