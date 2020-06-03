import React, { useState } from 'react'
import useMedia from '../../hooks/useMedia'
import { useTheme } from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/userReducer'
import {withRouter, useLocation, Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'

import menuBtn from '../../assets/icons8-menu-384.png'
import searchBtn from '../../assets/icons8-search-240.png'
import logo from '../../assets/home-icon.svg'
import addPeople from '../../assets/icons8-user-account-96.png'
import hashtag from '../../assets/icons8-hashtag-100.png'

import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ServerNav from '../ServerNav/ServerNav'
import ChannelNav from '../ChannelNav/ChannelNav'

import './headerStyles.scss'
import PopUp from '../Popup/PopUp.component'
import Axios from 'axios'
import { findByLabelText } from '@testing-library/react'

const Header = (props) => {
    let location = useLocation()

    const theme = useTheme()

    let mobile = useMedia('(max-width: 399px)')
    let tablet = useMedia('(max-width: 1025px)')
    let desktop = useMedia('(max-width: 5000px)')

    const [sideBarDrawerVisible, setSideBarDrawerVisible] = useState(false)

    let {server_id} = props.serverReducer.server
    const [popUp, togglePopUp] = useState(false)
    const [searchRes, setSearchRes]=useState([])
    const logout = () =>{
        auth.signOut().then(()=>{
            props.logoutUser()
            props.history.push('/')
        })
    }
    const handleAddUserToChannel =(user)=>{
        let data = {
            userId: user.user_id,
            serverId: server_id
        }
        Axios.post('/api/servers', data).then(res =>{

        })
    }
    const handleOnchange = (e) =>{
        Axios.get(`/api/users?username=${e.target.value}`).then(res => {
            setSearchRes(res.data)
        }).catch(()=>alert('Something went wrong searching for user'))
    }
    const foundUsers = searchRes.map((user, i) => {
        return (
            <div key={i} onClick={()=>handleAddUserToChannel({user})}>
                <div className='search-user-img'>
                    <img src={user.profile_pic || `https://robohash.org/${user.user_id}`} alt="profile Picture"/>
                </div>
            </div>
        )
    })

    if(mobile){
        return(
            <div className='header-container-mobile'>
                <div className='header-mobile-left'>
                    <div className='header-mobile-menu-btn'>
                            <img 
                            src={menuBtn} 
                            alt='menu-btn' 
                            onClick={() => setSideBarDrawerVisible(true)}
                            />
                    </div>
                    <div className='header-channel-mobile'>
                        <img src={hashtag} alt='hashtag' />
                        <Typography className='header-channel-name' variant='h6'>Da Boiz</Typography>
                    </div>
                </div>
                <div className='header-mobile-right'>
                    <div className='header-search-mobile'>
                        <img src={searchBtn} alt='search-btn' />
                    </div>
                    <div className='header-signout-mobile'>
                        <Button size='small' onClick={logout}>Log Out</Button>
                    </div>
                </div>
                <SwipeableDrawer
                children={theme.overrides.MuiDrawer}
                anchor='left'
                open={sideBarDrawerVisible}
                onClose={() => setSideBarDrawerVisible(false)}
                onOpen={() => setSideBarDrawerVisible(true)}
                >
                    <ServerNav />
                    <ChannelNav />
                </SwipeableDrawer>
            </div>
        )
    } else if(tablet){
        return(
            <div className='header-container-tablet'>
            <div className='header-mobile-left'>
                <div className='header-mobile-menu-btn'>
                        <img 
                        src={menuBtn} 
                        alt='menu-btn' 
                        onClick={() => setSideBarDrawerVisible(true)}
                        />
                </div>
                <div className='header-channel-mobile'>
                    <img src={hashtag} alt='hashtag' />
                    <Typography className='header-channel-name' variant='h6'>Da Boiz</Typography>
                </div>
            </div>
            <div className='header-mobile-right'>
                <div className='header-search-mobile'>
                    <img src={searchBtn} alt='search-btn' />
                </div>
                <div className='header-signout-mobile'>
                    <Button size='small' onClick={logout}>Log Out</Button>
                </div>
            </div>
            <SwipeableDrawer
            children={theme.overrides.MuiDrawer}
            anchor='left'
            open={sideBarDrawerVisible}
            onClose={() => setSideBarDrawerVisible(false)}
            onOpen={() => setSideBarDrawerVisible(true)}
            >
                <ServerNav />
                <ChannelNav />
            </SwipeableDrawer>
        </div>
        )
    } else if(desktop){
        return(
            <div className='header-container-desktop'>
                {popUp &&
                    <PopUp>
                        <form onSubmit={handleAddUserToChannel}>
                            <h1>Search Users</h1>
                            <div className='crate-playlist-input-container'>
                                <input placeholder='Username...' type="text" onChange={handleOnchange}/>
                            </div>
                            <div>
                                {foundUsers}
                            </div>
                            <button onClick={()=>togglePopUp(!popUp)}>CANCEL</button>
                            <button>CREATE PLAYLIST</button>
                        </form>
                    </PopUp>
                }
                <div className='header-home-icon'>
                    <Link to='/dashboard/messages'>
                        <IconButton className='header-logo'>
                            <img src={logo} alt="logo"/>
                        </IconButton>
                    </Link>
                </div>
                {
                    props.userReducer.isLoggedIn?
                    !location.pathname.includes('messages') ?
                    <React.Fragment>
                        <div className='header-server-name'>
                            <Typography className='server-name-typography' variant='h6'>{props.serverReducer.server.server_name}</Typography>
                        </div>
                        <div className='header-server-channel'>
                            <div className='header-server-channel-left'>
                                <img className='header-hashtag' src={hashtag} alt='hashtag' />
                                <Typography className='header-channel-name' variant='h6'>Da Boiz</Typography>
                            </div>
                            <div className='header-server-channel-right'>
                                <img className='add-people-button' src={addPeople} alt="add users"/>
    
                            </div>
                        </div>
                        <div className='header-sign-out' >
                            <div className='header-search-friends'>
                                <TextField
                                    id='outlined-search-header'
                                    size='small'
                                    placeholder='Search Users...'
                                    type='search'
                                    // variant='outlined'
                                    />
                            </div>
                            <Button size='small' id='log-out-button'onClick={logout}>Log Out</Button>
                        </div>
                    </React.Fragment> 
                    :
                    <React.Fragment>
                        <div className='header-server-name'>
                            <TextField id='outlined-conversations-header' type='search' size='small' placeholder='Conversations...'
                            />
                        </div>
                        <div className='header-server-channel'>
                            <div className='header-server-channel-left'>
                                <img className='header-hashtag' src={hashtag} alt='hashtag' />
                                <Typography className='header-channel-name' variant='h6'>Da Boiz</Typography>
                            </div>
                            <div className='header-server-channel-right'>
                                <img className='add-people-button' src={addPeople} alt="add users"/>
                            </div>
                        </div>
                        <div className='header-sign-out' >
                            <div className='header-search-friends'>
                                <TextField
                                id='outlined-search-header'
                                size='small'
                                placeholder='Search Users...'
                                type='search'
                                // variant='outlined'
                                />
                            </div>
                            <Button id='log-out-button' onClick={logout}>Log Out</Button>
                        </div>
                    </React.Fragment>
                    :
                    //not logged in
                    <React.Fragment>
                        
                    </React.Fragment>
                }
            </div>
        )

    }
}

const MapStateToProps = state =>{
    return {
        userReducer: state.userReducer,
        serverReducer: state.serverReducer
    }
}

export default connect(MapStateToProps, {logoutUser})(withRouter(Header))