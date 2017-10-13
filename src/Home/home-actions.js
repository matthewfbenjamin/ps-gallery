import { createActions } from 'redux-actions'
import * as constants from './home-constants'

import _ from 'lodash'

export let { getPhotos, sortDate, sortActive, setFiltered } = createActions({
  [constants.GET_PHOTOS]: async () => {
		const response = await fetch('http://gsx2json.com/api?id=1wZa0Gx2yAFDyMVayzRn428SDXCOJHOL-0_IX9uLiWW0')
		return await response.json()
	},
	[constants.SORT_DATE]: (photos) => {
		// Sort by date
		const cloned = _.cloneDeep(photos)
		cloned.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
		return cloned
	},
	[constants.SET_FILTERED]: value => value,
	[constants.SORT_ACTIVE]: (photos) => {
		const cloned = _.cloneDeep(photos)
		return _.sortBy(cloned, (value) => value.active === 'no')
	}
})
