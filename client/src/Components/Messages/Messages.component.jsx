import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {withRouter, useParams} from 'react-router-dom'
import Message from '../Message/Message.component'
import TextField from '@material-ui/core/TextField'
import ScrollToBottom from 'react-scroll-to-bottom'

import './messages.styles.scss'
let socket;
const Messages = (props) =>{
    const {id} = useParams()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const Endpoint = 'http://localhost:3000/'
    const serverid = props.serverReducer.server.server_id
    const user = props.userReducer.user
    useEffect(()=>{
        setMessages([])
        let room = `${props.dashType}-${id}`
        socket = io(Endpoint)//, {transport : ['websocket'] })
        socket.on('connect', function() {
            // Connected, let's sign-up for to receive messages for this room
            socket.emit('join-room', {username: user.user_name, profilePic:user.profile_pic,room:room});
         });
        
        //socket closing when user leaves or component unmounts 
        return () =>{
            console.log('component unmount')
            socket.emit('disconnect')
            socket.off()
        }
    },[Endpoint, id])

    //incoming messages 

    useEffect(()=>{
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          })
    },[id])

    //send message
    const sendMessage =(e) =>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () =>{
                setMessage('')
            })

        }
    }
    const groupMessages = messages.map((message, i) =>{
        return <Message message={message} key={i}/>
    })
    return(
        <div className='messages-container'>
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

const MapStateToComponent = state => {
    return{
        userReducer: state.userReducer,
        serverReducer: state.serverReducer
    }
}
export default connect(MapStateToComponent)(withRouter(Messages))