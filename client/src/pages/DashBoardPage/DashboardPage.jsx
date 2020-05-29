import React from 'react'
import {useLocation} from 'react-router-dom'
import ServerNav from '../../Components/ServerNav/ServerNav'
import ChannelNav from '../../Components/ChannelNav/ChannelNav'
// import 
import Posts from '../../Components/Posts/Posts.component'


import './dashboard.styles.scss'
import DirectMessages from '../../Components/DirectMessages/DirectMessages.component'


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
                <div className='dashboard-message-input'>
                    <input type="text" placeholder='Message...'/>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage