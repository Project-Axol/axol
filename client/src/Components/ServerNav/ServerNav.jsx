import React from 'react'
import {Link} from 'react-router-dom'
import './ServerNav.css'

function ServerNav(){
  const servers = [1, 2]
  
  let serverDisplay = servers.map(() => { 
    return (
      <div className='srvr-bttn'></div>
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

export default ServerNav