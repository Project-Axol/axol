import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './search.styles.scss'

import useMedia from '../../hooks/useMedia'

const SearchUser = (props) => {

    let mobile = useMedia('(max-width: 399px)')
    let tablet = useMedia('(max-width: 1025px)')
    let desktop = useMedia('(max-width: 5000px)')

    const [searchRes, setSearchRes]=useState([])
    const [searchStr, setSearchStr]=useState('')
    useEffect(()=>{
        Axios.get(`/api/users?username=${encodeURI(searchStr)}`).then(res => {
            setSearchRes(res.data)
        })

    }, [searchStr])
    const handleOnchange = (e) =>{
        setSearchStr(e.target.value)
    }
    const foundUsers = searchRes.map((user, i) => {
        return (
            <div className='found-user' key={i} onClick={()=>props.handleAddUser(user)}>
                <div className='search-user-img'>
                    <img src={user.profile_pic || `https://robohash.org/${user.user_id}`} alt="profile-img"/>
                    <p>{user.user_name}</p>
                </div>
            </div>
        )
    })
    if (mobile){
        return (
            <form onSubmit={props.handleAddUser} className='search-users-container-mobile'>
                <Typography variant='h6' color='textPrimary' className='search-users-header'>Search Users</Typography>
                <div className='add-user-to-channel'>
                    <TextField size='small' variant='outlined' type='search' label='Username...' fullWidth onChange={handleOnchange}/>
                </div>
                <div className='search-users-buttons'>
                    <Button variant='outlined' color='primary' size='small' onClick={()=>props.togglePopUp(!props.popUp)}>CANCEL</Button>
                    <Button variant='contained' color='primary' size='small'>DONE</Button>
                </div>
                <div className='found-users-container'>
                    {foundUsers}
                </div>
            </form>
        )
    } else if (tablet){
        return (
            <form onSubmit={props.handleAddUser} className='search-users-container-tablet'>
                <Typography variant='h4' color='textPrimary' className='search-users-header'>Search Users</Typography>
                <div className='add-user-to-channel'>
                    <TextField size='small' variant='outlined' type='search' label='Username...' fullWidth onChange={handleOnchange}/>
                </div>
                <div className='search-users-buttons'>
                    <Button variant='outlined' color='primary' size='small' onClick={()=>props.togglePopUp(!props.popUp)}>CANCEL</Button>
                    <Button variant='contained' color='primary' size='small'>DONE</Button>
                </div>
                <div className='found-users-container'>
                    {foundUsers}
                </div>
            </form>
        )
    } else if (desktop) {
        return (
            <form onSubmit={props.handleAddUser} className='search-users-container-desktop'>
                <Typography variant='h4' color='textPrimary' className='search-users-header'>Search Users</Typography>
                <div className='add-user-to-channel'>
                    <TextField size='small' variant='outlined' type='search' label='Username...' fullWidth onChange={handleOnchange}/>
                </div>
                <div className='search-users-buttons'>
                    <Button variant='outlined' color='primary' size='small' onClick={()=>props.togglePopUp(!props.popUp)}>CANCEL</Button>
                    <Button variant='contained' color='primary' size='small'>DONE ADDING</Button>
                </div>
                <div className='found-users-container'>
                    {foundUsers}
                </div>
            </form>
        )
    }
}

export default SearchUser