import React, { useState, Component } from 'react'
import {signInWithGoogle, auth, createUserProfile} from '../../firebase/firebase.utils'
import { Button } from '@material-ui/core';


import './auth.styles.scss'

class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            email: '',
            password: '',
            confirmPassword:'',
            signUpToggle: false
        }
    }
    
    handleSignUpToggle = () =>{
        this.setState({
            signUpToggle: !this.state.signUpToggle
        })
    }
    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignInSubmit = async (e) => {
        e.preventDefault();
    }

    handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const { userName, email, password, confirmPassword} = this.state
        if(password !== confirmPassword){
            alert("Password do not match")
            return
        }
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfile(user, userName)
            this.setState({
                userName:'',
                email: '',
                password: '',
                confirmPassword:''
            })
        }catch(err){
            alert(err)
        }
    }

    render(){
        return (
            <div className='auth-container'>
                {!this.state.signUpToggle ? 
                    <div className='auth-sign-in'>
                        <form>
                            <input name='userName' type='text' onChange={e=>this.handleOnchange(e)}/>
                            <input name='password' type='password' onChange={e=>this.handleOnchange(e)}/>
                        </form>
                        <p>Don't have an account? <strong onClick={this.handleSignUpToggle}>SIGN UP</strong></p>
                        
                        <Button variant="outlined" color="primary" onClick={signInWithGoogle}>
                            SignIn With GOOGLE
                        </Button>
                    </div>
                    :
                    <div className='auth-sign-up'>
                        <form action="post" onSubmit={this.handleSignUpSubmit}>
                            username
                            <input name='userName' type='text' onChange={e=>this.handleOnchange(e)}/>
                            email
                            <input name='email' type='email' onChange={e=>this.handleOnchange(e)}/>
                            password
                            <input name='password' type='password' onChange={e=>this.handleOnchange(e)}/>
                            confirmPassword
                            <input name='confirmPassword' type='password' onChange={e=>this.handleOnchange(e)}/>
                        </form>
                        <p>Already have an account? <strong onClick={this.handleSignUpToggle}>SIGN IN</strong></p>
                        <Button type='submit' variant="outlined" color='primary' onClick={this.handleSignUpSubmit}> sign Up</Button>
                        <Button variant="outlined" color="primary" onClick={signInWithGoogle}>
                            SignUp With GOOGLE
                        </Button>
                    </div>
                }
    
            </div>
        )
    }
}

export default Auth