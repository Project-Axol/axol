import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import util from '../../utils/util'
import Axios from 'axios'
import Channel from '../ChannelNav/Channel'
import User from '../User/User.component'
import io from 'socket.io-client'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import './userStatus.styles.scss'

let socket;
const UserStatus = (props) =>{
    const server = props.server
    const Endpoint = 
    console.log(`props.server: ${util.isObjectEmpty(props.server)}`)
    const [serverSelected, toggleServerSelected] = useState(false)
    const [serverChannels, setServerChannels] = useState([])
    useEffect(()=>{
        // alert('fired')
        // alert(server)
        // alert(util.isObjectEmpty(server))
        if(!util.isObjectEmpty(server)){
            toggleServerSelected(!serverSelected)
            Axios.get(`/app/channels/${server.server_id}`).then(res =>{
                setServerChannels(res.data)
            })

        }
    }, [server])

    const channels = serverChannels.map((channel,i) => {
        return  <React.Fragment>
                    <Channel id='channel-user-status' key={i} channelName={channel.channel_name}/>
                    <User id='user-status-channel' key={channel.channel_id} chId={channel.channel_id}/>
                </React.Fragment>
    }) 
    return(
        <div className='dashboard-right'>
            {util.isObjectEmpty(server)?
            <Typography className='empty-state' variant='h6' color='textSecondary'>
                No Server Selected
            </Typography>:
                <React.Fragment className='not-empty'>
                    <Typography variant='h6' color='textSecondary'>Online Users</Typography>
                    {channels}
                </React.Fragment>
            }
        </div>
    )
}

const MapStateToProps = state => {
    return {
        server : state.serverReducer.server
    }
}
export default connect(MapStateToProps)(UserStatus)