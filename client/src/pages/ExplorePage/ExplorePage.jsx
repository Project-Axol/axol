import React from 'react'
import useMedia from '../../hooks/useMedia'
import ServerNav from '../../Components/ServerNav/ServerNav'
import Explore from '../../Components/Explore/Explore'
import './ExplorePage.scss'

function ExplorePage(){

  let mobile = useMedia('(max-width: 399px)')
  let tablet = useMedia('(max-width: 1025px)')
  let desktop = useMedia('(max-width: 5000px)')


  if(mobile){
    return (
      <section className='explore-page'>
        <Explore />
      </section>
    )
  } else if (tablet) {
    return (
      <section className='explore-page'>
        <Explore />
      </section>
    )
  } else if (desktop) {
    return (
      <section className='explore-page'>
        <ServerNav />
        <Explore />
      </section>
    )
  }
}

export default ExplorePage