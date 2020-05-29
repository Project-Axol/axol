import React, {useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './ServerNav.scss'
import { selectServer, userServers } from '../../ducks/serverReducer'

function ServerNav(props){
  const {servers} = props.serverReducer
  // const {user} = props.userReducer

  useEffect(() => {
    axios.get(`/api/servers/${21}`)
    .then(res => {
      props.userServers(res.data)
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
      ></section>
    )
  })

  return (
    <div className='servers'>
    <Link to='/dashboard/messages'>
        <div className='srvr-bttn' onClick={() => props.selectServer({server_id: 0})}>Home</div>
    </Link>
      {serverDisplay}
      <Link to='/explore'>
        <div className='srvr-bttn'>Add</div>
      </Link>
    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {selectServer, userServers})(ServerNav)