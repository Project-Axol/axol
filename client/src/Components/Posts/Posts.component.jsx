import React, {useState } from 'react'
import {useParams, withRouter} from 'react-router-dom'
import { animateScroll } from "react-scroll";
import Messages from '../Messages/Messages.component';

import './post.styles.scss'

const Posts = (props) => {
    const scrollToBottom =()=> {
        animateScroll.scrollToBottom({
          containerId: "post-cont"
        });
    }
    return (
        <div className='post-container'>
            <Messages dashType='post'/>
        </div>
    )
}
export default withRouter(Posts)