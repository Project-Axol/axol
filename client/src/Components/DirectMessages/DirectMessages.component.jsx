import React from 'react'
import {useParams} from 'react-router-dom'
import useMedia from '../../hooks/useMedia'
import greenIcon from '../../assets/green-icon.svg'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Messages from '../Messages/Messages.component';

import './directMessages.styles.scss'

const DirectMessages = (props) =>{
    const {id} = useParams()

    let mobile = useMedia('(max-width: 399px)')
    let tablet = useMedia('(max-width: 1025px)')
    let desktop = useMedia('(max-width: 5000px)')

    if(mobile){
        return (
            <div className='dm-container-mobile'>
                {!id?
                <div>
                    <div className='dm-no-messages'>
                        <img src={greenIcon} alt="noMessages"/>
                        <Typography variant='h3'>No Messages...</Typography>
                    </div>
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
    } else if (tablet){
        return (
            <div className='dm-container-tablet'>
                {!id?
                <div>
                    <div className='dm-no-messages'>
                        <img src={greenIcon} alt="noMessages"/>
                        <Typography variant='h3'>No Messages...</Typography>
                    </div>
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
    } else if (desktop) {
        return (
            <div className='dm-container-desktop'>
                {!id?
                <div>
                    <div className='dm-no-messages'>
                        <img src={greenIcon} alt="noMessages"/>
                        <Typography variant='h3'>No Messages...</Typography>
                    </div>
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
}

export default DirectMessages