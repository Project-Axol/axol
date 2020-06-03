import React from 'react'
import {useLocation} from 'react-router-dom'
import useMedia from '../../hooks/useMedia'
import ServerNav from '../../Components/ServerNav/ServerNav'
import ChannelNav from '../../Components/ChannelNav/ChannelNav'
import UserStatus from '../../Components/UserStatus/UserStatus.component'
import Posts from '../../Components/Posts/Posts.component'
import DirectMessages from '../../Components/DirectMessages/DirectMessages.component'


import './dashboard.styles.scss'


const DashboardPage = (props) =>{
    let location = useLocation()

    let mobile = useMedia('(max-width: 399px)')
    let tablet = useMedia('(max-width: 1025px)')
    let desktop = useMedia('(max-width: 5026px)')


    if(mobile){
        return(
            <div className='dashboard-container-mobile'>
                <div className='dashboard-center-mobile'>
                {!location.pathname.includes('messages')?
                        <Posts/>:
                        <DirectMessages/>
                    }
                </div>
            </div>
        )
    } else if(tablet){
        return(
            <div className='dashboard-container-tablet'>
                <div className='dashboard-center-tablet'>
                {!location.pathname.includes('messages')?
                        <Posts/>:
                        <DirectMessages/>
                    }
                </div>
            </div>
        )
    } else if(desktop){
        return(
            <div className='dashboard-container-desktop'>
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
}

export default DashboardPage