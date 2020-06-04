import React, { Component } from 'react';
import './App.scss';
import router from './router';
import {withRouter} from 'react-router-dom'
import {auth, createUserProfile} from './firebase/firebase.utils'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import {connect} from 'react-redux'
import {loginUser} from './ducks/userReducer'
import Header from './Components/Header/Header.component'

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
          this.props.loginUser(userRef)
          this.props.history.push('/dashboard')
          
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
          {/* {this.props.userReducer.isLoggedIn?
            <Header />
           : null } */}
          <div className='main-content'>
            {router}
            {/* <div>
            {this.props.userReducer.isLoggedIn? <p onClick={()=>auth.signOut().then(()=>this.props.history.push('/'))}>Logout</p> : <p>Please log in to continue</p>}
            </div> */}
          </div>
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
    },
    MuiListItem: {
      button: {
        onClick: {
          colorPrimary: '#E2BFC3'
        },
        onMouseUp: {
          colorPrimary: '#e28489'
        }
      }
    },
    MuiDrawer: {
      root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
      }
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#A8D8E4'
    },
    secondary: {
      main: '#3ca374'
    }
  }
})

const mapStateToProps = state => {
  return {userReducer:state.userReducer}
}
export default connect(mapStateToProps, {loginUser})(withRouter(App));
