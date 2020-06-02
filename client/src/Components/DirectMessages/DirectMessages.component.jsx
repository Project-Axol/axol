import React from 'react'
import {useParams} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Messages from '../Messages/Messages.component';

import './directMessages.styles.scss'

const DirectMessages = (props) =>{
    const {id} = useParams()

    return (
        <div className='dm-container'>
            {!id?
            <div>
                <h1>No Message selected</h1>
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
            <Messages dashType='dm'/>
            }
        </div>
    )
}

export default DirectMessages