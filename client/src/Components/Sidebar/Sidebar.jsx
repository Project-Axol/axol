import React from 'react'
import './Sidebar.scss'

import ChannelNav from '../ChannelNav/ChannelNav'
import ServerNav from '../ServerNav/ServerNav'


function Sidebar(){
    return (
        <div className='sidebar-container'>
            <ServerNav />
            <ChannelNav />
        </div>
    )
}

export default Sidebar