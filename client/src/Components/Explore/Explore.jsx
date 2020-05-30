import React, {useEffect, useState} from 'react'
import axios from 'axios'
import MostUsers from './MostUsers'
import Searched from './Searched'
import CreateServer from './CreateServer'
import './Explore.scss'
import { TextField, Typography } from '@material-ui/core'

function Explore() {
  const [search, setSearch] = useState('')
  const [searches, setSearches] = useState([])
  const [most, setMost] = useState([])

  useEffect(() => {
    axios.get('/api/most')
    .then(res => setMost(res.data))
    .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    axios.post('/api/search', {search})
    .then(res => setSearches(res.data))
    .catch(err => console.log(err))
  }, [search])

  const searchedServers = searches.map(search => {
    return (
      <Searched key={search.server_id} search={search}/>
    )
  })

  const mostUserServers = most.map(server => {
    return (
      <MostUsers key={server.server_id} server={server}/>
    )
  })

  return (
    <section className='explore'>
      <section className='explore-search'>
        <Typography className='explore-results-header'variant='h3' >
          Explore Popular Servers
        </Typography>
        <TextField
          fullWidth
          variant='outlined' 
          type='search'
          label='Search...'
          size='large'
          onChange={event => setSearch(event.target.value)}
        />
      </section>
      <section className='explore-results-container'>
        <div className='explore-results'>
        {!search ? (
          <React.Fragment>
            {mostUserServers}
          </React.Fragment>
        ) : (
          !searches[0] ? (
            <React.Fragment>
              <CreateServer />
            </React.Fragment>
          ) : (
          <React.Fragment>
            {searchedServers}
          </React.Fragment>
          )
        )}
        </div>
      </section>
    </section>
  )
}

export default Explore