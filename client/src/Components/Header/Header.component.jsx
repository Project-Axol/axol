import React from 'react'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/userReducer'
import {withRouter, useLocation} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'

import logo from '../../assets/icons8-axolotl.png'
import addPeople from '../../assets/icons8-people.png'

import './header.styels.scss'

const Header = (props) => {
    let location = useLocation()
    const logout = () =>{
        auth.signOut().then(()=>{
            props.logoutUser()
            props.history.push('/')
        })
    }
    return(
        <div className='header-container'>
            <div className='header-logo'>
                <img src={logo} alt="logo"/>
                {/* <span>AXOL</span> */}
            </div>
            {
                props.userReducer.isLoggedIn?
                !location.pathname.includes('messages') ?
                <React.Fragment>
                    <div className='header-server-name'>
                        <h2>This is my server</h2>
                    </div>
                    <div className='header-server-channel'>
                        <h3># - Da Boiz</h3>
                        <img src={addPeople} alt="add users"/>
                    </div>
                    <div className='header-sign-out' >
                        <div className='header-search-friends'>
                            <input type="text" placeholder='Search Users'/>
                        </div>
                        <span onClick={logout}>LogOut</span>
                    </div>
                </React.Fragment> 
                :
                <React.Fragment>
                    <div className='header-server-name'>
                        <input type='text' placeholder='Search Conversations'/>
                    </div>
                    <div className='header-server-channel'>
                        <h3># - Da Boiz</h3>
                        <img src={addPeople} alt="add users"/>
                    </div>
                    <div className='header-sign-out' >
                        <div className='header-search-friends'>
                            <input type="text"/>
                        </div>
                        <span onClick={logout}>LogOut</span>
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