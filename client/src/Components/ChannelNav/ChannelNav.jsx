import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Category from './Category'
import {connect} from 'react-redux'
import './ChannelNav.scss'

import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

function ChannelNav(props){
  let {server_id} = props.serverReducer.server
  const [categories, setCategories] = useState([])

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
  }, [props.serverReducer.server])

  const categoryDisplay = categories.map((category, i) => {
    return (
      <List component='nav' key={category.category_id} >
        
            <Category category={category} />
        
      </List>
    )
  })

  return (
    <section className='channel-nav'>
      {server_id > 0 ? categoryDisplay : <section>Friend list</section>}
      <div className='chnl-usr'></div>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(ChannelNav)