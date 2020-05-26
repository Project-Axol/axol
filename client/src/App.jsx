import React, { Component } from 'react';
import './App.css';
import router from './router';
import {withRouter} from 'react-router-dom'
import {auth, createUserProfile} from './firebase/firebase.utils'
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
      <div className="App">
        <div className='header'>
          <Header/>
        </div>
        <div className='main-content'>
          {router}
        <div>
          {this.props.userReducer.isLoggedIn? <p onClick={()=>auth.signOut().then(()=>this.props.history.push('/'))}>Logout</p> : <p>go ahead and login</p>}
        </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {userReducer:state.userReducer}
}
export default connect(mapStateToProps, {loginUser})(withRouter(App));
