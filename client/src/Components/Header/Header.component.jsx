import React from 'react'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/userReducer'
import {withRouter, useLocation, Link} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'

import logo from '../../assets/icons8-axolotl.png'
import addPeople from '../../assets/icons8-user-account-96.png'
import hashtag from '../../assets/icons8-hashtag-100.png'

import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './header.styels.scss'

const Header = (props) => {
    let location = useLocation()
    const logout = () =>{
        auth.signOut().then(()=>{
            props.logoutUser()
            props.history.push('/')
        })
    }

    const inputProps = {

    }

    return(
        <div className='header-container'>
            <div className='header-home-icon'>
                <Link to='/dashboard/messages'>
                    <IconButton 
                    className='header-logo'
                    >
                        <img className='header-logo' src={logo} alt="logo"/>
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
                            <Typography variant='h6'>Da Boiz</Typography>
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
                        <img className='header-hashtag' src={hashtag} alt='hashtag' />
                        <Typography variant='h6'>Da Boiz</Typography>
                        <img className='add-people-button' src={addPeople} alt="add users"/>
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
        userReducer: state.userReducer,
        serverReducer: state.serverReducer
    }
}

export default connect(MapStateToProps, {logoutUser})(withRouter(Header))