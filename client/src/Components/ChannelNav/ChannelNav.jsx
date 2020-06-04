import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Category from './Category'
import {connect} from 'react-redux'
import {withRouter, useLocation, Link} from 'react-router-dom'
import PopUp from '../Popup/PopUp.component'
import SearchUser from '../SearchUser/Search.component'

import useMedia from '../../hooks/useMedia'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

import './ChannelNav.scss'

function ChannelNav(props){
  let location = useLocation()
  let {server_id} = props.serverReducer.server
  let {user_id} = props.userReducer.user
  const [categories, setCategories] = useState([])
  const [conversations, setConversations] = useState([])
  const [popUp, togglePopUp] = useState(false)
  const [addChannel, setAddChannel] = useState(false)
  const [categoryId, setCategoryId] = useState(null)
  const [channelName, setChannelName] = useState('')
  

  let mobile = useMedia('(max-width: 399px)')
  let tablet = useMedia('(max-width: 1025px)')
  let desktop = useMedia('(max-width: 5000px)')

  const initialLogin = () => {
    server_id = 0
  }

  useEffect(() => {
    if(!server_id){
      initialLogin()
    }

    axios.get(`/api/categories/${server_id}`)
    .then(res => {
      setCategories(res.data)
    })
    .catch(err => {
      console.log(err)
    })

    axios.get(`/api/conversations/${user_id}`).then(res =>{
      setConversations(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [props.serverReducer.server])

  const handleStartDm = (user) =>{
    console.log("user to be added to dm: ", user)
    togglePopUp(!popUp)
    const myId = user_id
    const chatWith = user.user_id
    const chatWithName = user.user_name
    const myName = props.userReducer.user.user_name
    axios.post(`/api/conversations`, {myId, chatWith, chatWithName, myName}).then(res =>{
      props.history.push(`/messages/${res.data.dmg_id}`)
    }).catch(()=>alert('cant start a chant'))
    axios.get(`/api/conversations/${user_id}`).then(res =>{
      setConversations(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  const userConversations = conversations.map((convo, i)=>{
    return(
      <Link key={i} to={`/messages/${convo.dmg_id}`}>
        <p>{convo.dmg_name}</p>
      </Link>
    )
  })
  const categoryDisplay = categories.map((category, i) => {
    return (
      <React.Fragment>
        <List component='nav' key={category.category_id} >
          <Category category={category} />
        </List>
        <img
          style={{height: '20px', width: '20px', marginBottom: '10px'}}
          src='https://i.dlpng.com/static/png/6378688_preview.png'
          alt='Add Channel'
          onClick={() => {
            setAddChannel(true)
            setCategoryId(category.category_id)
          }}
        />
      </React.Fragment>
    )
  })

  if(mobile){
    return (
      <section className='channel-nav-mobile'>
      {popUp &&
        <PopUp modalState={popUp}>
            <SearchUser togglePopUp={togglePopUp} popUp={popUp} handleAddUser={handleStartDm}/>
        </PopUp>
      }
      {location.pathname.includes('messages') ?
          <React.Fragment>
            <div className='new-conversation-button'>
              <Button color='primary' size='small' className='conversation-button' variant='contained' onClick={()=>togglePopUp(!popUp)}>New Conversation</Button>
            </div>
            {userConversations}
          </React.Fragment>:
          server_id>0?
          categoryDisplay : <section>Friend list</section>}
      <div className='chnl-usr'></div>
    </section>
    )
  } else if(tablet){
    return (
      <section className='channel-nav-tablet'>
      {popUp &&
        <PopUp modalState={popUp}>
            <SearchUser togglePopUp={togglePopUp} popUp={popUp} handleAddUser={handleStartDm}/>
        </PopUp>
      }
      {location.pathname.includes('messages') ?
          <React.Fragment>
            <div className='new-conversation-button'>
              <Button color='primary' size='small' variant='contained' onClick={()=>togglePopUp(!popUp)}>New Conversation</Button>
            </div>
            {userConversations}
          </React.Fragment>:
          server_id>0?
          categoryDisplay : <section>Friend list</section>}
      <div className='chnl-usr'></div>
    </section>
    )
  } else if(desktop){
    return (
      <section className='channel-nav-desktop'>
      {popUp &&
        <PopUp modalState={popUp}>
            <SearchUser togglePopUp={togglePopUp} popUp={popUp} handleAddUser={handleStartDm}/>
        </PopUp>
      }
      {location.pathname.includes('messages') ?
          <React.Fragment>
            <div className='new-conversation-button'>
              <Button color='primary' size='small' variant='contained' onClick={()=>togglePopUp(!popUp)}>New Conversation</Button>
            </div>
            {userConversations}
          </React.Fragment>:
          server_id>0?
          categoryDisplay : <section>Friend list</section>}
      <div className='chnl-usr'></div>
      {addChannel ? (
        <section
          style={{height: '300px', width: '300px', backgroundColor: 'pink', position: 'absolute', top: '15%', left: '35%', zIndex: '1'}}
          onMouseLeave={() => {
            setChannelName('')
            setAddChannel(false)
          }}
        >
          <input
            placeholder='Name'
            value={channelName}
            onChange={event => setChannelName(event.target.value)}
          />
          <button
            onClick={() => {
              axios.post(`/api/channels/${categoryId}`, {channelName})
              .then(() => {
                setChannelName('')
                setAddChannel(false)
              })
              .catch(err => console.log(err))
            }}
          >Add Channel</button>
          <button
            onClick={() => {
              setChannelName('')
              setAddChannel(false)
            }}
          >Cancel</button>
        </section>
      ) : null}
    </section>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(withRouter(ChannelNav))