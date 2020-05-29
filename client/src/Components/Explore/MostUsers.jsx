import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectServer} from '../../ducks/serverReducer'

function MostUsers(props) {
const {server_name, server_img} = props.server

  return (
    <Link to='/dashboard'>
    <section
      className='display'
      onClick={() => {
        props.selectServer(props.server)
      }}
    >
      {server_name}
      {server_img}
    </section>
    </Link>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {selectServer})(MostUsers)