import React, {useState, useEffect} from 'react'
import Channel from './Channel'
import axios from 'axios'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Category(props) {
  const {category_name, category_id} = props.category
  const [channels, setChannels] = useState([])

  useEffect(() => {
    axios.get(`/api/channels/${category_id}`)
    .then(res => {
      setChannels([...res.data])
    })
    .catch(err => console.log(err))
  }, [])

  const channelsDisplay = channels.map((channel,i) => {
    return (
      <Link to={`/dashboard/${channel.channel_id}`} key={i}>
      <Channel key={channel.channel_id} channel={channel}/>
      </Link>
    )
  })

  return (
    <section className='categories'>
      <section className='category-name'>{category_name}</section>
      <div>
        {channelsDisplay}
      </div>
    </section>
  )
}

export default Category