import React from 'react'
import {connect} from 'react-redux'
import { selectServer } from '../../ducks/serverReducer'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Card'
import serverImg from '../../assets/blue-circle-icon.svg'
import Grid from '@material-ui/core/Grid'

function Searched(props) {
  const {server_name, server_img} = props.search

  return (
    <div>
    <Link to='/dashboard'>
    <Paper
      variant='outlined'
      square
      elevation={3}
      className='server-tile'
      onClick={() => {
        props.selectServer(props.search)
      }}
    >
      <Grid container spacing={2} justify='center' alignItems='center' className='tile-grid-container'>
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

export default connect(mapStateToProps, {selectServer})(Searched)