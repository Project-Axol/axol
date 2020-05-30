import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectServer} from '../../ducks/serverReducer'
import { Paper, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'


function MostUsers(props) {
const {server_name, server_img} = props.server

  return (
    <div>
        <Link to='/dashboard'>
        <Paper
          variant='outlined'
          // square
          elevation={3}
          className='server-tile'
          onClick={() => {
            props.selectServer(props.server)
          }}
        >
          <Grid container spacing={2} justify='center' alignItems='center' className='tile-grid-container' >
            <Grid item xs={12} className='grid-server-img'>
              <img src={server_img} alt='server-img'/>
            </Grid>
            <Grid item xs={12} className='grid-server-name'>
              {server_name}
            </Grid>
          </Grid>  
        </Paper>
        </Link>

    </div>
  )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {selectServer})(MostUsers)