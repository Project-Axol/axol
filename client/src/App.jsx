import React, { Component } from 'react';
import './App.css';
import router from './router';
import {withRouter} from 'react-router-dom'
import {auth, createUserProfile} from './firebase/firebase.utils'

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
        <div>
          {this.state.currentUser? <p onClick={()=>auth.signOut().then(()=>this.props.history.push('/'))}>Logout</p> : <p>go ahead and login</p>}
        </div>
        {router}
        {/* <ServerNav />
        <ChannelNav /> */}
      </div>
    );
  }
}

export default withRouter(App);
