import { handleActions } from 'redux-actions'
import * as constants from './home-constants'

const defaultState = {
	photos: {},
	filteredPhotos: {},
	isFiltered: false,
	activeFlag: false
}

export default handleActions({
	[constants.GET_PHOTOS]: (state, action) => ({...state, photos: action.payload, isFiltered: false}),
	[constants.SORT_DATE]: (state, action) => ({...state, filteredPhotos: action.payload, isFiltered: true, activeFlag: false}),
	[constants.SET_FILTERED]: (state, action) => ({...state, isFiltered: action.payload, activeFlag: false}),
	[constants.SORT_ACTIVE]: (state, action) => ({...state, filteredPhotos: action.payload, isFiltered: true, activeFlag: true})
}, defaultState)
