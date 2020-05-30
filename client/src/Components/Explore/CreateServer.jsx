import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

function CreateServer() {
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

export default CreateServer