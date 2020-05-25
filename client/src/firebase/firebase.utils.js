import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

const firebaseConfig = {
    apiKey: "AIzaSyCaHgT6GgZ4STJQ3m98l7dLTb-mOgAfIIM",
    authDomain: "axol-6e5be.firebaseapp.com",
    databaseURL: "https://axol-6e5be.firebaseio.com",
    projectId: "axol-6e5be",
    storageBucket: "axol-6e5be.appspot.com",
    messagingSenderId: "276741218831",
    appId: "1:276741218831:web:0fe8817fa1ded6a22bf97a",
    measurementId: "G-Q9Y1K85Z2N"
};

export const createUserProfile = async(userAuth, additionalData) => {
    if (!userAuth) return
    let { uid, displayName, email, photoURL } = userAuth
    if (additionalData !== null) displayName = additionalData
    axios.post('/api/users', { uid, displayName, email, photoURL }).then(res => {
        return res.data
    }).catch(() => alert('Unable to verify/add user'))
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase