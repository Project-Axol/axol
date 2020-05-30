import React from 'react'
import ReactEmoji from 'react-emoji'

import './message.styles.scss'
import ListItem from '@material-ui/core/ListItem'


const Message = (props) =>{
    return(
        <ListItem  button key={props.key} className='message-container'>
            <div className='message-user-img'>
                <div className='user-img'>
                    <img src={props.message.profilePic} alt="profile"/>
                </div>
            </div>
            <div className='message-message-content'>
                <div className='message-message-info'>
                    <div className='message-user-name'>
                        <p>{props.message.user}</p>
                    </div>
                    <div className='message-time-stamp'>
                        <p>{props.message.postTime}</p>
                    </div>
                </div>
                <div className='message-message-data'>
                    <div className='message-message'>
                        <p>{ReactEmoji.emojify(props.message.text)}</p>
                    </div>
                    <div className='message-link-preview'>

                    </div>
                </div>
            </div>
        </ListItem>
    )
}

export default Message