import React, { useState, Component } from 'react'
import {signInWithGoogle, auth, createUserProfile} from '../../firebase/firebase.utils'
import { 
    Button,
    TextField,
    Grid,
    Card,
    Typography
} from '@material-ui/core'
import { GroupAdd, Person, ArrowBack } from '@material-ui/core'


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
            <div className='auth-wrapper'>
                {!this.state.signUpToggle ? 
                    <Grid container spacing={2} justify='center' alignItems='center'>
                        <Grid item xs={12} className='grid-textfield'>
                            <TextField
                                id='userName'
                                label='Username'
                                name='userName' 
                                margin='dense'
                                type='text' 
                                variant='outlined'
                                onChange={e=>this.handleOnchange(e)}/>

                        </Grid>
                        <Grid item xs={12} className='grid-textfield'>
                            <TextField
                            id='password'
                            label='Password'
                            margin='dense'
                            autoComplete='off'
                            variant='outlined'
                            name='password' 
                            type='password' 
                            onChange={e=>this.handleOnchange(e)}/>
                        </Grid>
                        <Grid item xs={12} className='grid-signup-link'>
                            <Typography color='primary' align='center'>Don't have an account? <strong onClick={this.handleSignUpToggle}>SIGN UP</strong></Typography>
                        </Grid>
                        <Grid item xs={12} className='grid-button'>
                            <Button 
                            className='modal-login-button'
                            variant="contained" 
                            color="primary" 
                            onClick={signInWithGoogle}>
                                Sign In With GOOGLE
                            </Button>
                        </Grid>
                    </Grid>
                    :
                    <Grid container spacing={2} justify='center' alignItems='center'>
                        <Grid item xs={12} className='grid-textfield'>
                        {/* <form action="post" onSubmit={this.handleSignUpSubmit}> */}
                            {/* Username */}
                            <TextField 
                            name='userName' 
                            label='Username'
                            margin='dense'
                            variant='outlined'
                            type='text' 
                            onChange={e=>this.handleOnchange(e)}/>

                        </Grid>
                        <Grid item xs={12} className='grid-textfield'>
                            <TextField
                            name='email'
                            type='email'
                            label='Email'
                            margin='dense'
                            variant='outlined'
                            onChange={e => this.handleOnchange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} className='grid-textfield'>
                            <TextField 
                            name='password'
                            type='password'
                            label='Password'
                            margin='dense'
                            variant='outlined'
                            onChange={e => this.handleOnchange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} className='grid-textfield'>
                            <TextField 
                            name='confirmPassword'
                            type='password'
                            label='Confirm Password'
                            margin='dense'
                            variant='outlined'
                            onChange={e => this.handleOnchange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} className='grid-toggle'>
                            <Typography color='primary' align='center'>Already have an account? <strong onClick={this.handleSignUpToggle}>SIGN IN</strong></Typography>
                        </Grid>
                        <Grid item xs={12} className='grid-submit'>
                            <Button type='submit' variant="contained" color='primary' onClick={this.handleSignUpSubmit}> Sign Up</Button>
                        </Grid>
                        <Grid item xs={12} className='grid-signup-with-google'>
                            <Button variant="contained" color="primary" onClick={signInWithGoogle}>
                                Sign Up With GOOGLE
                            </Button>
                        </Grid>
                                                      {/* Email
                                <input name='email' type='email' onChange={e=>this.handleOnchange(e)}/>
                                Password
                                <input name='password' type='password' onChange={e=>this.handleOnchange(e)}/>
                                Confirm Password
                                <input name='confirmPassword' type='password' onChange={e=>this.handleOnchange(e)}/> */}
                    </Grid>
                }
    
            </div>
        )
    }
}

export default Auth