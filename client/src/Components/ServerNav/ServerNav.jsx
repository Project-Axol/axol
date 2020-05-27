import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './ServerNav.scss'
import { selectServer } from '../../ducks/serverReducer'
import IconButton from '@material-ui/core/IconButton'
import findServerButton from '../../assets/icons8-compass-96.png'

function ServerNav(props){
  const [servers, setServers] = useState([])
  const {user} = props.userReducer

  useEffect(() => {
    axios.get(`/api/servers/${21}`)
    .then(res => {
      setServers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const serverDisplay = servers.map(server => { 
    return (
      <section
        key={server.server_id}
        className='srvr-bttn'
        onClick={() => {
          props.selectServer(server)
        }}
      >
        <IconButton><div className='server-icon-btn'>Hi</div></IconButton>
      </section>
    )
  })

  return (
    <div className='servers'>
    <Link to='/dashboard/messages'>
        <div className='srvr-bttn' onClick={() => props.selectServer({server_id: 0})}>Home</div>
    </Link>
      {serverDisplay}
      <div className='server-nav-find-btn'>
        <IconButton><img className='find-btn-img' src={findServerButton} alt='new-server-button'/></IconButton>
      </div>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {selectServer})(ServerNav)