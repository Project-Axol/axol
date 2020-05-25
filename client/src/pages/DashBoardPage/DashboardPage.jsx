import React from 'react'
import ServerNav from '../../Components/ServerNav/ServerNav'
import ChannelNav from '../../Components/ChannelNav/ChannelNav'

import './dashboard.styles.scss'

const DashboardPage = (props) =>{
    return(
        <div className='dashboard-container'>
            <ServerNav />
            <ChannelNav />
        </div>
    )
}

export default DashboardPage