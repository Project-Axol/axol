import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './ChannelNav.css'

function ChannelNav(props){
  let {server_id, server_name} = props.serverReducer.server
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if(!server_id){
      server_id = 0
    }

    axios.get(`/api/categories/${server_id}`)
    .then(res => {
      setCategories(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [props.serverReducer.server])

  const categoryDisplay = categories.map(category => {
    return (
      <section className='categories'>{category.category_name}</section>
    )
  })

  return (
    <section className='channel'>
      <div className='srvr-name'>{server_name}</div>
      {categoryDisplay}
      <div className='chnl-usr'></div>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(ChannelNav)