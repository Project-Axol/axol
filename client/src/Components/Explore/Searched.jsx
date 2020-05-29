import React from 'react'
import {connect} from 'react-redux'
import { selectServer } from '../../ducks/serverReducer'
import {Link} from 'react-router-dom'

function Searched(props) {
  const {server_name} = props.search

  return (
    <Link to='/dashboard'>
      <section
        className='display'
        onClick={() => {
          props.selectServer(props.search)
        }}
      >
        <section>{server_name}</section>
      </section>
    </Link>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {selectServer})(Searched)