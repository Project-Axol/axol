import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Category from './Category'
import {connect} from 'react-redux'
import './ChannelNav.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function ChannelNav(props){
  let {server_id} = props.serverReducer.server
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

  const categoryDisplay = categories.map((category, i) => {
    return (
      <Link to={`/dashboard/${category.category_id}`} key={i}>
      <Category key={category.category_id} category={category} />
      </Link>
    )
  })

  return (
    <section className='channel'>
      {server_id > 0 ? categoryDisplay : <section>Friend list</section>}
      <div className='chnl-usr'></div>
    </section>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(ChannelNav)