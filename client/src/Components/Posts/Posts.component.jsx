import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import './post.styles.scss'

const Posts = (props) => {
    const [posts, setPosts] = useState([])
    const {channelId} = useParams()
    useEffect(()=>{
        if(channelId){
            //axios request to get posts for the channel
        }
    },[])

    return (
        <div className='post-container'>
            {posts.length?
                <div>
                    <h1>Yaaayyy there are some posts in this channel</h1>
                </div>:
                <div className='post-no-posts'>
                    <img src="https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80" alt=""/>
                    <h1>NO POSTS...Select channel to see posts</h1>
                    
                </div>
            }
        </div>
    )
}
export default Posts