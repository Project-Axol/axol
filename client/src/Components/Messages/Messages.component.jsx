import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Message from '../Message/Message.component'

import './messages.styles.scss'
let socket;
const Messages = (props) =>{
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const Endpoint = 'https://axol.herokuapp.com/'
    const serverid = props.serverReducer.server.server_id
    const user = props.userReducer.user
    useEffect(()=>{
        if(socket){
            socket.emit('disconnect')
        }
        socket = io.connect(Endpoint, {transport : ['websocket'] })
        
        //socket to do specific thing on join
        console.log('user: ', user, ' : serverid: ', serverid)
        socket.emit('join', {username: user.user_name, profilePic:user.profile_pic, group: serverid}, () =>{
            //error handling goes here
        })

        //socket closing when user leaves or component unmounts 
        return () =>{
            socket.emit('disconnect')
            socket.off()
        }
    },[Endpoint, serverid])
    //incoming messages 
    useEffect(()=>{
        socket.on('message', (message) =>{
            console.log('recieving on: ', socket, " message: ", message)
            setMessages([...messages, message])
        })
    })
    //send message
    const sendMessage =(e) =>{
        e.preventDefault();
        if(message){
            console.log(socket)
            socket.emit('sendMessage', message, () =>{
                setMessage('')
            })

        }
    }
    console.log(message, messages)
    const groupMessages = messages.map((message, i) =>{
        return <Message message={message} key={i}/>
    })
    return(
        <div>
            <div>
                {groupMessages}
                <input value={message} onChange={e=> setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' ? sendMessage(e): null}/>
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