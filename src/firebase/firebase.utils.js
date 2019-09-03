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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// if user is logged out, then do nothing
	if (!userAuth) return

	const userRef = firestore.doc(`users/${userAuth.uid}`)

	const snapShot = await userRef.get();

	if(!snapShot.exists) {
		const {displayName, email} = userAuth
		const createdAt = new Date()
		
		try {
			await userRef.set({
				displayName, 
				email, 
				createdAt, 
				...additionalData
			})
		}
		catch (error) {
			console.log('error creating user', error.message)
		}
	}

	return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	// create collection with colleciton key
	const collecitonRef = firestore.collection(collectionKey)

	const batch = firestore.batch()
	objectsToAdd.forEach(obj => {
		const newDocRef = collecitonRef.doc(obj.title)
		batch.set(newDocRef, obj)
	})
	return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const {title, items} = doc.data()

		return {
			routeName: encodeURI(title.toLowerCase()), 
			id: doc.id, 
			title, 
			items
		}
	})

	return transformedCollection.reduce((accumulator, collection)=> {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator
	}, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

