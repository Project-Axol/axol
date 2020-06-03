import React from 'react'
import {withRouter, useParams} from 'react-router-dom'
import Messages from '../Messages/Messages.component';
import TextField from '@material-ui/core/TextField'

import './post.styles.scss'

const Posts = (props) => {
    const {id} = useParams()
    return (
        <div className='post-container'>
            {!id?
            <div>
                <h1>No Channel selected</h1>
                <div className='dashboard-message-input'>
                    <TextField
                    id='outlined-message-input'
                    size='small'
                    placeholder='Message...'
                    fullWidth
                    variant='outlined'
                    />
                </div>
            </div>:
            <Messages dashType='post'/>
            }
        </div>
    )
}
export default withRouter(Posts)