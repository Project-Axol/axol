import React, {useState, useEffect} from 'react'
import Axios from 'axios'

const SearchUser = (props) => {
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
            <div key={i} onClick={()=>props.handleAddUser(user)}>
                <div className='search-user-img'>
                    <img src={user.profile_pic || `https://robohash.org/${user.user_id}`} alt="profile-img"/>
                    <p>{user.user_name}</p>
                </div>
            </div>
        )
    })
    return (
        <form onSubmit={props.handleAddUser}>
            <h1>Search Users</h1>
            <div className='add-user-to-channel'>
                <input placeholder='Username...' type="text" onChange={handleOnchange}/>
            </div>
            <div>
                {foundUsers}
            </div>
            <button onClick={()=>props.togglePopUp(!props.popUp)}>CANCEL</button>
            <button>DONE ADDING</button>
        </form>
    )
}

export default SearchUser