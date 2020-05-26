import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './ServerNav.css'
import { selectServer } from '../../ducks/serverReducer'

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
      ></section>
    )
  })

  return (
    <section className='servers'>
    <Link to='/dashboard/messages'>
        <div className='srvr-bttn'>Home</div>
    </Link>
      {serverDisplay}
      <div className='srvr-bttn'>New</div>
      <div className='srvr-bttn'>search</div>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {selectServer})(ServerNav)