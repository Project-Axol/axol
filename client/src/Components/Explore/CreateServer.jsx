import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import useMedia from '../../hooks/useMedia'

function CreateServer() {

  let mobile = useMedia('(max-width: 399px)')
  let tablet = useMedia('(max-width: 1025px)')
  let desktop = useMedia('(max-width: 5026px)')

  if(mobile) {
    return (
      <React.Fragment>
        <Paper 
        className='create-server-tile'
        variant='outlined'
        elevation={3}
  
        >
          <Grid
          container
          spacing={2}
          justify='center'
          alignItems='center'
          className='tile-grid-container'
          >
            <Grid item xs={12} >
              <Typography variant='h6'>
                No matching servers with that name. Create new server?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined'>Create</Button>
            </Grid>
          </Grid>
        </Paper>
  
        {/* <section>No server found. Create new server?</section>
        <button>Create</button> */}
      </React.Fragment>
    )
  } else if (tablet){
    return (
      <React.Fragment>
        <Paper 
        className='create-server-tile'
        variant='outlined'
        elevation={3}
  
        >
          <Grid
          container
          spacing={2}
          justify='center'
          alignItems='center'
          className='tile-grid-container'
          >
            <Grid item xs={12} >
              <Typography variant='h5'>
                No matching servers with that name. Create new server?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined'>Create</Button>
            </Grid>
          </Grid>
        </Paper>
  
        {/* <section>No server found. Create new server?</section>
        <button>Create</button> */}
      </React.Fragment>
    )
  } else if(desktop) {
    return (
      <React.Fragment>
        <Paper 
        className='create-server-tile'
        variant='outlined'
        elevation={3}
  
        >
          <Grid
          container
          spacing={2}
          justify='center'
          alignItems='center'
          className='tile-grid-container'
          >
            <Grid item xs={12} >
              <Typography variant='h5'>
                No matching servers with that name. Create new server?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='outlined'>Create</Button>
            </Grid>
          </Grid>
        </Paper>
  
        {/* <section>No server found. Create new server?</section>
        <button>Create</button> */}
      </React.Fragment>
    )
  }

}

export default CreateServer