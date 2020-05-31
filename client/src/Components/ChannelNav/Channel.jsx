import React from 'react'
import hashtag from '../../assets/icons8-hashtag-100.png'
import Typography from '@material-ui/core/Typography'
import ChannelNav from './ChannelNav.scss'
import ListItem from '@material-ui/core/ListItem'

function Channel(props) {
  return (
    <ListItem button className='channel-button'>
      <img className='channel-nav-hashtag' src={hashtag} alt='hashtag' />
      <Typography variant='subtitle2' className='channel-name'>
        {props.channelName}
      </Typography>
    </ListItem>
  )
}

export default Channel