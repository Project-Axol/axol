import React, {useState, useEffect} from 'react'
import util from '../../utils/util.js'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {withRouter, useParams} from 'react-router-dom'
import Message from '../Message/Message.component'
import TextField from '@material-ui/core/TextField'
import ScrollToBottom from 'react-scroll-to-bottom'
import useMedia from '../../hooks/useMedia'

import './messages.styles.scss'
import Axios from 'axios'
// let socket;
const Messages = (props) =>{

    let mobile = useMedia('(max-width: 399px)')
    let tablet = useMedia('(max-width: 1025px)')
    let desktop = useMedia('(max-width: 5026px)')

    const {id} = useParams()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const Endpoint = util.Endpoint
    const serverid = props.serverReducer.server.server_id
    const user = props.userReducer.user
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    useEffect(()=>{
        Axios.get(`/api/messages/${id}`).then(res =>{
            setMessages(res.data)
        })

        // forceUpdate()
        let room = `${props.dashType}-${id}`
        util.socket = io(Endpoint)//, {transport : ['websocket'] })
        util.socket.on('connect', function() {
            // Connected, let's sign-up for to receive messages for this room
            util.socket.emit('join-room', {username: user.user_name, profilePic:user.profile_pic,room:room, userId:user.user_id});
         });
        
        //socket closing when user leaves or component unmounts 
        return () =>{
            // console.log('component unmount')
            util.socket.emit('disconnect')
            util.socket.off()
        }
    },[Endpoint, id])

    //incoming messages 

    useEffect(()=>{
        util.socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          })
    },[id])

    //send message
    const sendMessage =(e) =>{
        e.preventDefault();
        const time = new Date()
        const data = {
            userId: user.user_id,
            time,
            post:message,
            channelId: id,
            from:props.dashType,
        }
        if(message){
            Axios.post(`/api/messages`, data)
            util.socket.emit('sendMessage', message, () =>{
                setMessage('')
            })

        }
    }

    const groupMessages = messages.map((message, i) =>{
        return <Message message={message} key={i}/>
    })
    if(mobile){
        return(
            <div className='messages-container-mobile'>
                    <ScrollToBottom className='messages-messages'>
                        {groupMessages}
                    </ScrollToBottom>
                <div className='dashboard-message-input'>
                        <TextField
                        id='outlined-message-input'
                        size='small'
                        placeholder='Message...'
                        fullWidth
                        variant='outlined'
                        value={message}
                        onChange={e=> setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e): null}
                        />
                    </div>
            </div>
        )
    } else if(tablet){
        return(
            <div className='messages-container-tablet'>
                    <ScrollToBottom className='messages-messages'>
                        {groupMessages}
                    </ScrollToBottom>
                <div className='dashboard-message-input'>
                        <TextField
                        id='outlined-message-input'
                        size='small'
                        placeholder='Message...'
                        fullWidth
                        variant='outlined'
                        value={message}
                        onChange={e=> setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e): null}
                        />
                    </div>
            </div>
        )
    } else if(desktop) {
        return(
            <div className='messages-container-desktop'>
                    <ScrollToBottom className='messages-messages'>
                        {groupMessages}
                    </ScrollToBottom>
                <div className='dashboard-message-input'>
                        <TextField
                        id='outlined-message-input'
                        size='small'
                        placeholder='Message...'
                        fullWidth
                        variant='outlined'
                        value={message}
                        onChange={e=> setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e): null}
                        />
                    </div>
            </div>
        )
    }
}

const MapStateToComponent = state => {
    return{
        userReducer: state.userReducer,
        serverReducer: state.serverReducer
    }
}
export default connect(MapStateToComponent)(withRouter(Messages))