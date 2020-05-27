import React, { useState } from 'react'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/userReducer'
import {withRouter, useLocation} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'

import logo from '../../assets/icons8-axolotl.png'
import addPeople from '../../assets/icons8-user-account-96.png'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './header.styels.scss'
import PopUp from '../Popup/PopUp.component'
import Axios from 'axios'

const Header = (props) => {
    let location = useLocation()
    const [popUp, togglePopUp] = useState(false)
    const [searchRes, setSearchRes]=useState([])
    const logout = () =>{
        auth.signOut().then(()=>{
            props.logoutUser()
            props.history.push('/')
        })
    }
    const handleAddUserToChannel =(user)=>{
        
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
    return(
        <div className='header-container'>
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
                <IconButton 
                className='header-logo'
                >
                    <img src={logo} alt="logo"/>
                    {/* <span>AXOL</span> */}
                </IconButton>

            </div>
            {
                props.userReducer.isLoggedIn?
                !location.pathname.includes('messages') ?
                <React.Fragment>
                    <div className='header-server-name'>
                        <Typography className='server-name-typography' variant='h6'>This is my server</Typography>
                    </div>
                    <div className='header-server-channel'>
                        <Typography variant='h6'># Da Boiz</Typography>
                        <img src={addPeople} alt="add users" onClick={()=>togglePopUp(!popUp)}/>
                    </div>
                    <div className='header-sign-out' >
                        <div className='header-search-friends'>
                        <TextField
                            id='outlined-search-small'
                            size='small'
                            label='Search Users'
                            type='search'
                            variant='outlined'
                            />
                        </div>
                        <Button onClick={logout}>Log Out</Button>
                    </div>
                </React.Fragment> 
                :
                <React.Fragment>
                    <div className='header-server-name'>
                        <TextField type='text' placeholder='Search Conversations'/>
                    </div>
                    <div className='header-server-channel'>
                        <Typography variant='h6'># Da Boiz</Typography>
                        <img src={addPeople} alt="add users"/>
                    </div>
                    <div className='header-sign-out' >
                        <div className='header-search-friends'>
                            <TextField
                            id='outlined-search-small'
                            size='small'
                            label='Search Users'
                            type='search'
                            variant='outlined'
                            />
                        </div>
                        <div>
                            <Button onClick={logout}>Log Out</Button>
                        </div>
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
        userReducer: state.userReducer
    }
}

export default connect(MapStateToProps, {logoutUser})(withRouter(Header))