import { takeEvery, call, put, all } from 'redux-saga/effects'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions'

import ShopActionTypes from './shop.types'

export function* fetchCollectionsAsync() {
	yield console.log('I am fired')

	try {
		const collectionRef = firestore.collection('collections')
		const snapshot = yield collectionRef.get()
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
		yield put(fetchCollectionsSuccess(collectionsMap))
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message))
	}
	
	/*
	// firebase using promeses
	collectionRef.get().then(snapshot => {
		const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
		dispatch(fetchCollectionsSuccess(collectionsMap))
	}).catch(error => dispatch(fetchCollectionsFailure(error)))
	*/

	/* firebase subscription snapshot
	collectionRef.onSnapshot(async snapshot => {
		const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
		updateCollections(collectionsMap)
		this.setState({loading: false})
	}) 
	*/

	/* fetching 
	fetch('https://firestore.googleapis.com/v1/projects/not-an-ecommerce-site-db/databases/(default)/documents/collections')
	.then(response => response.json())
	.then(collections => console.log(collections))
	*/

}

// generator function
export function* fetchCollectionStart() {
	yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, 
		fetchCollectionsAsync
		)
}

export function* shopSagas() {
	yield all([
		call(fetchCollectionStart)
	])
}