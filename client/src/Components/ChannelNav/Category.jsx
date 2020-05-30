import React, {useState, useEffect} from 'react'
import Channel from './Channel'
import axios from 'axios'

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

  const channelsDisplay = channels.map(channel => {
    return (
      <Channel key={channel.channel_id} channel={channel}/>
    )
  })

  return (
    <section className='categories'>
        <section className='category-name'>{category_name}</section>
        <div className='channels-list'>
          {channelsDisplay}
        </div>
    </section>
  )
}

export default Category