import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import './directMessages.styles.scss'

const DirectMessages = (props) =>{
    const [messages, setMessages] = useState([])
    const {dmId} = useParams()
    useEffect(()=>{
        if(dmId){
            //axios request to get posts for the channel
        }
    },[])

    return (
        <div className='dm-container'>
            {messages.length?
                <div>
                    <h1>Yaaayyy there are some messages</h1>
                </div>:
                <div className='dm-no-messages'>
                    <img src="https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80" alt=""/>
                    <h1>NO Messages...</h1>
                </div>
            }
        </div>
    )
}

export default DirectMessages