import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import util from '../../utils/util'
import Axios from 'axios'
import Channel from '../ChannelNav/Channel'
import User from '../User/User.component'
import io from 'socket.io-client'

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
                    <Channel key={i} channelName={channel.channel_name}/>
                    <User key={channel.channel_id} chId={channel.channel_id}/>
                </React.Fragment>
    }) 
    return(
        <div>
            {util.isObjectEmpty(server)?
            <p>
                No server selected
            </p>:
                <React.Fragment>
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