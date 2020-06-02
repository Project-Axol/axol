import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/userReducer'
import {withRouter, useLocation, Link, useParams} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'

import logo from '../../assets/home-icon.svg'
import addPeople from '../../assets/icons8-user-account-96.png'
import hashtag from '../../assets/icons8-hashtag-100.png'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PopUp from '../Popup/PopUp.component'
import SearchUser from '../SeachUser/Search.component'

import './header.styels.scss'
import Axios from 'axios'

const Header = (props) => {
    let location = useLocation()
    const {id} = useParams()
    let {server_id} = props.serverReducer.server
    const [popUp, togglePopUp] = useState(false)
    const [dmName, setDmNam] = useState('')

    useEffect(()=>{
        console.log('triggered...', props.match)
        if(location.pathname.includes('messages')){
            Axios.get(`/api/dmNames/${id}`).then(res =>{
                console.log(res.data, " : dmName")
                setDmNam(res.data.dmg_name)
            })
        }
    }, [location.pathname,id])
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

    return(
        <div className='header-container'>
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
                    </div>
                    <div className='header-server-channel'>
                        <div className='header-server-channel-left'>
                            <img className='header-hashtag' src={hashtag} alt='hashtag' />
                            <Typography className='header-channel-name' variant='h6'>{props.serverReducer.server.server_name}</Typography>
                        </div>
                        <div className='header-server-channel-right'>
                            <img className='add-people-button' src={addPeople} alt="add users" onClick={()=>togglePopUp(!popUp)}/>

                        </div>
                    </div>
                    <div className='header-sign-out' >
                        <div className='header-search-friends'>
                        <TextField
                            id='outlined-search-header'
                            size='small'
                            placeholder='Search Users'
                            type='search'
                            variant='outlined'
                            />
                        </div>
                        <Button size='small' onClick={logout}>Log Out</Button>
                    </div>
                </React.Fragment> 
                :
                <React.Fragment>
                    <div className='header-server-name'>
                        <TextField id='outlined-conversations-header' type='search' variant='outlined' size='small' placeholder='Conversations'
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
                            placeholder='Search Users'
                            type='search'
                            variant='outlined'
                            />
                        </div>
                        <Button onClick={logout}>Log Out</Button>
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

const MapStateToProps = state =>{
    return {
        userReducer: state.userReducer,
        serverReducer: state.serverReducer
    }
}

export default connect(MapStateToProps, {logoutUser})(withRouter(Header))