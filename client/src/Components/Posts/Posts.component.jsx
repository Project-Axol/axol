import React from 'react'
import {withRouter, useParams} from 'react-router-dom'
import Messages from '../Messages/Messages.component';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import greenCircleIcon from '../../assets/green-circle-icon.svg'

import './post.styles.scss'

const Posts = (props) => {
    const {id} = useParams()
    return (
        <div className='post-container'>
            {!id?
            <div className='no-channel-selected'>
                <img src={greenCircleIcon} alt='green-axolotl' className='green-axolotl'/>
                <br/>
                <Typography variant='h4' color='textSecondary' className='no-channel-message'>No channel selected...</Typography>
            </div>:
            <Messages dashType='post'/>
            }
        </div>
    )
}
export default withRouter(Posts)