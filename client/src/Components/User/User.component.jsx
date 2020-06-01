import React, { useState, useEffect } from 'react'
import util from '../../utils/util'
import {useParams} from 'react-router-dom'
import socket from '../../Sockets'

import './user.styles.scss'

const User = (props) => {
    const {id} = useParams()
    const [roomInfo, setRoomInfo] = useState([])
    // useEffect(()=>{
    //     util.socket.emit('getAllUsersInAllRoom', `post-${props.chId}`, res =>{
    //         // console.log(res, "room data::::::::users: res")
    //     })
    //     util.socket.on('channelData', roomData =>{
    //         setRoomInfo(roomData.users)
    //         console.log(roomData, "room data::::::::users")
    //     })
    // }, [id])
    useEffect(()=>{
        socket.on('roomData', roomData =>{
            setRoomInfo(roomData.users)
            console.log(roomData, "room data::::::::users")
        })
    }, [id])
    
    const users = roomInfo.map(user => {
        return (
            <div>
                <div className='message-user-img'>
                    <div className='user-img'>
                        <img src={user.profilePic} alt="profile"/>
                    </div>
                </div>
                <div className='user-name'>
                    <p>{user.username}</p>
                </div>
            </div>
        )
    })
    return (
        <div className='single-user-container'>
            {users}
        </div>
    )
}

export default User