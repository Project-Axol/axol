import React, { Component } from 'react';
import './App.css';
import router from './router';
import {withRouter} from 'react-router-dom'
import {auth, createUserProfile} from './firebase/firebase.utils'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        currentUser: null,
        signUpToggle: false
    }
  }

  handleSignUpToggle = () =>{
      this.setState({
          signUpToggle: !this.state.signUpToggle
      })
  }
  handleOnchange = (e) => {

  }

  //to prevent memory leak, we have unsubscribe from firebase. 
  unsubscribeFromAuth = null

  componentDidMount=() =>{
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
        if(userAuth){
          const userRef = await createUserProfile(userAuth)
          this.setState({
              currentUser: userAuth
          })
          console.log('hello')
          this.props.history.push('/dashboard')
          console.log(userAuth)
          
        }else{
          this.setState({currentUser: userAuth})
        }
      })
  }
  componentWillUnmount = () =>{
      this.unsubscribeFromAuth()
  }
  render(){
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <div>
            {this.state.currentUser? <p onClick={()=>auth.signOut()}>Logout</p> : <p>Please Login to Continue</p>}
          </div>
          {router}
          {/* <ServerNav />
          <ChannelNav /> */}
        </div>
      </ThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  overrides: {
    MuiToolTip: {
      tooltip: {
        fontSize: '14px',
        backgroundColor: 'black'
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#202225',
        color: 'white'
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#36393E',
        position: "absolute"
      }
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#7289da'
    },
    secondary: {
      main: '#3ca374'
    }
  }
})

export default withRouter(App);
