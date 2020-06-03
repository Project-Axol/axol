import React, {useEffect} from 'react'
import useMedia from '../../hooks/useMedia'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './ServerNav.scss'
import { selectServer, userServers } from '../../ducks/serverReducer'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import logo from '../../assets/home-icon.svg'
import findServerButton from '../../assets/icons8-compass-96.png'
import socket from '../../Sockets'

function ServerNav(props){
  const {servers} = props.serverReducer
  // const {user} = props.userReducer

  let mobile = useMedia('(max-width: 399px)')
  let tablet = useMedia('(max-width: 1025px)')
  let desktop = useMedia('(max-width: 5000px)')

  useEffect(() => {
    axios.get(`/api/servers/${21}`)
    .then(res => {
      props.userServers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    socket.on('dmMessage', message => {
      console.log(message, " new message for")
   })
  }, [])

  const serverDisplay = servers.map(server => { 
    return (
      <section key={server.server_id} className='server-buttons'>
        <div
        key={server.server_id}
        className='srvr-bttn'
        onClick={() => {
          props.selectServer(server)
          props.history.push('/dashboard')
        }}
        >
          <div className='server-icon-btn'>Hi</div>
        </div>
      </section>
    )
  })

  if(mobile){
    return (
      <div className='servers-mobile'>
        <div className='home-icon'>
          <Link to='/dashboard/messages' className='logo-link'>
            <IconButton className='logo'>
              <img src={logo} alt="logo"/>
            </IconButton>
          </Link>
        </div>
        {serverDisplay}
        <div className='server-nav-find-btn'>
          <Link to='/explore'>
            <IconButton>
              <img className='find-btn-img' src={findServerButton} alt='new-server-button'/>
            </IconButton>
          </Link>
        </div>
      </div>
    )
  } else if(tablet){
    return (
      <div className='servers-tablet'>
        <div className='home-icon'>
          <Link to='/dashboard/messages' className='logo-link'>
            <IconButton className='logo'>
              <img src={logo} alt="logo"/>
            </IconButton>
          </Link>
        </div>
        {serverDisplay}
        <div className='server-nav-find-btn'>
          <Link to='/explore'>
            <IconButton>
              <img className='find-btn-img' src={findServerButton} alt='new-server-button'/>
            </IconButton>
          </Link>
        </div>
      </div>
    )
  } else if(desktop){
    return (
      <div className='servers-desktop'>
        {serverDisplay}
        <div className='server-nav-find-btn'>
          <Link to='/explore'>
            <IconButton>
              <img className='find-btn-img' src={findServerButton} alt='new-server-button'/>
            </IconButton>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {selectServer, userServers})(withRouter(ServerNav))