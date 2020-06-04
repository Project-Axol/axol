import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '../../assets/icons8-delete-96.png'

import './headerStyles.scss'

function ServerSettings(props) {
  const {server, userId} = props
  const [settings, setSettings] = useState({private: null})
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    axios.post('/api/admin', {userId: userId, serverId: server.server_id})
    .then(res => {
      setAdmin(res.data)
    })
    .catch(err => console.log(err))

    axios.get(`/api/server/${server.server_id}`)
    .then(res => {
      setSettings({...settings, ...res.data})
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <Card
    classes='server-settings-container'
    style={{ position: 'absolute',  top: '15%', left: '35%', zIndex: '1', height: '500px', width: '500px'}}
    >
      <div className='server-settings-header'>
        <Typography variant='h6'className='server-settings-typography'>
          Server Settings
        </Typography>
      </div>
      <div className='server-settings-content'>
        {admin ? (
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>
              Private
              <input
                checked={settings.private}
                type='checkbox'
                onClick={() => {
                  setSettings({...settings, private: !settings.private})
                }}
              ></input>
            </div>
            <Button
              onClick={() => {
                axios.post(`/api/server/${server.server_id}`, settings)
                .then(() => {
                  props.setServerSettings(false)
                })
                .catch(err => console.log(err))
              }}
            >Save</Button>
            <Button variant='outlined' color='primary'>Delete Server</Button>
          </div>
        ) : (
          <Button variant='outlined' color='primary'>Leave Server</Button>
        )}
          <img
            style={{height: '20px', width: '20px', position: 'absolute', top: '10px', right: '10px'}}
            src={CloseIcon}
            alt='exit'
            onClick={() => {props.setServerSettings(false)}}
          />
      </div>
    </Card>
  )
}

export default ServerSettings