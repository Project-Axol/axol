import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
    <section
      style={{height: '500px', width: '500px', backgroundColor: 'orange', position: 'absolute', top: '15%', left: '35%', zIndex: '1'}}
      onMouseLeave={() => props.setServerSettings(false)}
    >
      Server Settings
      <div>
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
            <button
              onClick={() => {
                axios.post(`/api/server/${server.server_id}`, settings)
                .then(() => {
                  props.setServerSettings(false)
                })
                .catch(err => console.log(err))
              }}
            >Save</button>
            <button>Delete Server</button>
          </div>
        ) : (
          <button>Leave Server</button>
        )}
        <img
          style={{height: '20px', width: '20px', position: 'absolute', top: '10px', right: '10px'}}
          src='https://cdn.iconscout.com/icon/free/png-256/x-51-433948.png'
          alt='exit'
          onClick={() => {props.setServerSettings(false)}}
        />
      </div>
    </section>
  )
}

export default ServerSettings