import React from 'react'

import './message.styles.scss'


const Message = (props) =>{
    return(
        <section key={props.key} className='message-container'>
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
                        <p>{props.message.text}</p>
                    </div>
                    <div className='message-link-preview'>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Message