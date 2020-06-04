import React, { useState, useEffect } from 'react'
import useMedia from '../../hooks/useMedia'
import { useTheme } from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/userReducer'
import {withRouter, useLocation, Link, useParams} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'

import menuBtn from '../../assets/icons8-menu-384.png'
import searchBtn from '../../assets/icons8-search-240.png'
import logo from '../../assets/home-icon.svg'
import addPeople from '../../assets/icons8-user-account-96.png'
import hashtag from '../../assets/icons8-hashtag-100.png'
import SettingsIcon from '../../assets/icons8-settings-192.png'

import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ServerNav from '../ServerNav/ServerNav'
import ChannelNav from '../ChannelNav/ChannelNav'
import Sidebar from '../Sidebar/Sidebar'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import './headerStyles.scss'
import PopUp from '../Popup/PopUp.component'
import SearchUser from '../SearchUser/Search.component'
import Axios from 'axios'
import { findByLabelText } from '@testing-library/react'

import ServerSettings from './ServerSettings'
import { ListItem } from '@material-ui/core'

const Header = (props) => {
    let location = useLocation()
    const [displaySettings, setDisplaySettings] = useState(false)
    const [serverSettings, setServerSettings] = useState(false)
    const [addCat, setAddCat] = useState(false)
    const [categoryName, setCategoryName] = useState('')

    const theme = useTheme()

    let mobile = useMedia('(max-width: 400px)')
    let tablet = useMedia('(max-width: 1025px)')
    let desktop = useMedia('(max-width: 5000px)')

    const [sideBarDrawerVisible, setSideBarDrawerVisible] = useState(false)

    const {id} = useParams()
    let {server_id} = props.serverReducer.server
    const [popUp, togglePopUp] = useState(false)
    const [dmName, setDmName] = useState('')

    // useEffect(()=>{
    //     console.log('triggered...', props.match)
    //     if(location.pathname.includes('messages')){
    //         Axios.get(`/api/dmNames/${id}`).then(res =>{
    //             console.log(res.data, " : dmName")
    //             setDmNam(res.data.dmg_name)
    //         })
    //     }
    // }, [location.pathname,id])
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
                        <Typography className='header-channel-name' variant='h6'>{props.serverReducer.server.server_name}</Typography>
                    </div>
                </div>
                <div className='header-mobile-right'>
                    <div className='header-search-mobile'>
                        <img src={searchBtn} alt='search-btn' />
                    </div>
                    <div className='header-signout-mobile logout'>
                        <Button size='small' onClick={logout}>Log Out</Button>
                    </div>
                </div>
                <SwipeableDrawer
                className='.swipeable-drawer'
                children={theme.overrides.MuiDrawer}
                anchor='left'
                open={sideBarDrawerVisible}
                onClose={() => setSideBarDrawerVisible(false)}
                onOpen={() => setSideBarDrawerVisible(true)}
                >
                    <Sidebar />
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
                    <Typography className='header-channel-name' variant='h6'>{props.serverReducer.server.server_name}</Typography>
                </div>
            </div>
            <div className='header-mobile-right'>
                <div className='header-search-mobile'>
                    <img src={searchBtn} alt='search-btn' />
                </div>
                <div className='header-signout-mobile logout'>
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
                <Sidebar />
            </SwipeableDrawer>
        </div>
        )
    } else if(desktop){
        return(
            <div className='header-container-desktop'>
                {popUp &&
                    <PopUp modalState={popUp}>
                        <SearchUser togglePopUp={togglePopUp} popUp={popUp} handleAddUser={handleAddUserToChannel}/>
                    </PopUp>
                }
                <div className='header-home-icon'>
                    <Link to='/messages'>
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
                            {props.history.location.pathname.includes('/dashboard') ? (
                              <IconButton className='settings-button'
                              onClick={() => {
                                setDisplaySettings(!displaySettings)
                              }}
                              >
                                <img src={SettingsIcon} alt='settings'/>
                              </IconButton>
                              ) : (
                                null
                              )}
                            {displaySettings ? (
                              <Card
                                style={{width: '180px', height: '150px', position: 'absolute', top: '30px', zIndex: '1'}}
                                onMouseLeave={() => setDisplaySettings(false)}
                              >
                                <List>
                                  <ListItem
                                  button
                                  onClick={() => {
                                    setServerSettings(true)
                                    setDisplaySettings(false)
                                  }}
                                  >Server Settings</ListItem>
                                  <ListItem
                                  button
                                  onClick={() => {
                                    setAddCat(true)
                                    setDisplaySettings(false)
                                  }}
                                  >Create Category</ListItem>
                                  {/* <p>Invite Users</p> */}
                                </List>
                              </Card>
                            ) : (
                              null
                            )}
                        </div>
                        <div className='header-server-channel'>
                            <div className='header-server-channel-left'>
                                <img className='header-hashtag' src={hashtag} alt='hashtag' />
                                <Typography className='header-channel-name' variant='h6'>{props.serverReducer.server.server_name}</Typography>
                            </div>
                            <div className='header-server-channel-right'>
                                <img className='add-people-button' src={addPeople} alt="add users" onClick={() => togglePopUp(!popUp)}/>
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
                            <div className='logout'>
                                <Button size='small' id='log-out-button'onClick={logout}>Log Out</Button>
                            </div>
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
                                <Typography className='header-channel-name' variant='h6'>{dmName}</Typography>
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
                            <div className='logout'>
                                <Button id='log-out-button' onClick={logout}>Log Out</Button>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    //not logged in
                    <React.Fragment>
                        
                    </React.Fragment>
                }
              {serverSettings ? (
                <ServerSettings
                  server={props.serverReducer.server}
                  setServerSettings={setServerSettings}
                  userId={props.userReducer.user.user_id}/>
              ) : null}
              {addCat ? (
                <Card
                  style={{height: '300px', width: '300px', position: 'absolute', top: '15%', left: '35%', zIndex: '1', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}
                >
                  <TextField label='Name' value={categoryName} onChange={event => setCategoryName(event.target.value)}/> <br /> <br />
                  <div className='categories-buttons'>
                    <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                        Axios.post(`/api/categories/${props.serverReducer.server.server_id}`, {categoryName})
                        .then(() => {
                            setAddCat(false)
                        })
                        .catch(err => console.log(err))
                        }}
                    >Create Category</Button>
                    <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                        setCategoryName('')
                        setAddCat(false)
                        }}
                    >Cancel</Button>
                  </div>
                </Card>
              ) : null}
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