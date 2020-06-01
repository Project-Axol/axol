import React from 'react'
import {withRouter} from 'react-router-dom'
import Messages from '../Messages/Messages.component';

import './post.styles.scss'

const Posts = (props) => {
    return (
        <div className='post-container'>
            <Messages dashType='post'/>
        </div>
    )
}
export default withRouter(Posts)