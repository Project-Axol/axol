import React, { useEffect, useState } from 'react'
import {useParams, withRouter} from 'react-router-dom'
import { animateScroll } from "react-scroll";
import Message from '../Message/Message.component'

import './post.styles.scss'

const Posts = (props) => {
    const [posts, setPosts] = useState([])
    const {id} = useParams()
    const scrollToBottom =()=> {
        animateScroll.scrollToBottom({
          containerId: "post-cont"
        });
    }
    useEffect(()=>{
        if(id){
            setPosts([{
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            },
            {
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            },
            {
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            },
            {
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            },
            {
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            },
            {
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            },
            {
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            },
            {
                profilePic: 'https://images.unsplash.com/photo-1499946981954-e7f4b234d7fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
            }])
            //axios request to get posts for the channel
            scrollToBottom()
        }else{
            setPosts([])
        }
    },[id])
    const channelPosts = posts.map((post, i) =>{
        return <Message post={post} key={i}/>
    })
    return (
        <div className='post-container'>
            {posts.length?
                <div className='posts-posts' id='post-cont'>
                    {channelPosts}
                </div>:
                <div className='post-no-posts'>
                    <img src="https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80" alt=""/>
                    <h1>NO POSTS...Select channel to see posts</h1>
                    
                </div>
            }
        </div>
    )
}
export default withRouter(Posts)