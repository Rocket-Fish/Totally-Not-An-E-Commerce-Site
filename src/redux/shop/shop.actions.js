import ShopActionTypes from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'


export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START, 
})

export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS, 
	payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAIURE, 
	payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		const collectionRef = firestore.collection('collections')
		dispatch(fetchCollectionsStart())

		// firebase using promeses
		collectionRef.get().then(snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
			dispatch(fetchCollectionsSuccess(collectionsMap))
		}).catch(error => dispatch(fetchCollectionsFailure(error)))

		/* firebase subscription snapshot
		collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
			updateCollections(collectionsMap)
			this.setState({loading: false})
		}) 
		*/

	}
}