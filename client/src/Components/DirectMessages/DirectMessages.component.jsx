import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import useMedia from '../../hooks/useMedia'
import greenIcon from '../../assets/green-icon.svg'
import Typography from '@material-ui/core/Typography'

import './directMessages.styles.scss'

const DirectMessages = (props) =>{


    let mobile = useMedia('(max-width: 399px)')
    let tablet = useMedia('(max-width: 1025px)')
    let desktop = useMedia('(max-width: 5000px)')

    const [messages, setMessages] = useState([])
    const {dmId} = useParams()
    useEffect(()=>{
        if(dmId){
            //axios request to get posts for the channel
        }
    },[])

    if(mobile){
        return (
            <div className='dm-container-mobile'>
                {messages.length?
                    <div>
                        <h1>Yaaayyy there are some messages</h1>
                    </div>:
                    <div className='dm-no-messages'>
                        <img src={greenIcon} alt="noMessages"/>
                        <Typography variant='h5'>No Messages...</Typography>
                    </div>
                }
            </div>
        )
    } else if (tablet){
        return (
            <div className='dm-container-tablet'>
                {messages.length?
                    <div>
                        <h1>Yaaayyy there are some messages</h1>
                    </div>:
                    <div className='dm-no-messages'>
                        <img src={greenIcon} alt="noMessages"/>
                        <Typography variant='h4'>No Messages...</Typography>
                    </div>
                }
            </div>
        )
    } else if (desktop) {
        return (
            <div className='dm-container-desktop'>
                {messages.length?
                    <div>
                        <h1>Yaaayyy there are some messages</h1>
                    </div>:
                    <div className='dm-no-messages'>
                        <img src={greenIcon} alt="noMessages"/>
                        <Typography variant='h3'>No Messages...</Typography>
                    </div>
                }
            </div>
        )
    }
}

export default DirectMessages