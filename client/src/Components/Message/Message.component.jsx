import React from 'react'

import './message.styles.scss'


const Message = (props) =>{
    return(
        <section key={props.post.key} className='message-container'>
            <div className='message-user-img'>
                <div className='user-img'>
                    <img src={props.post.profilePic} alt="profile"/>
                </div>
            </div>
            <div className='message-message-content'>
                <div className='message-message-info'>
                    <div className='message-user-name'>
                        <p>Bonsa</p>
                    </div>
                    <div className='message-time-stamp'>
                        <p>05/24/2020 03:44</p>
                    </div>
                </div>
                <div className='message-message-data'>
                    <div className='message-message'>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                    <div className='message-link-preview'>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Message