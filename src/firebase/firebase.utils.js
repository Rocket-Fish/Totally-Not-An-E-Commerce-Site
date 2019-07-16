import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: "AIzaSyCfiTd_0r_gcuJ_FKuLi1W1P22zgblwDHM",
	authDomain: "not-an-ecommerce-site-db.firebaseapp.com",
	databaseURL: "https://not-an-ecommerce-site-db.firebaseio.com",
	projectId: "not-an-ecommerce-site-db",
	storageBucket: "",
	messagingSenderId: "725716795837",
	appId: "1:725716795837:web:136970e698ea26e8"
};

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

