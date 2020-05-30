import React from 'react'
import ServerNav from '../../Components/ServerNav/ServerNav'
import Explore from '../../Components/Explore/Explore'
import './ExplorePage.scss'

function ExplorePage(){
  return (
    <section className='explore-page'>
      <ServerNav />
      <Explore />
    </section>
  )
}

export default ExplorePage