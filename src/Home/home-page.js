import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ReactPaginate from 'react-paginate'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton'

import { getPhotos, sortDate, sortActive, setFiltered } from './home-actions'
import './home.css'

const BAR_HEIGHT = 50
const BUTTON_HEIGHT = 40
class HomePage extends Component {
  static mapDispatchToProps (dispatch) {
    return {
			getPhotos: () => dispatch(getPhotos()),
			sortDate: (images) => dispatch(sortDate(images)),
			sortActive: (images) => dispatch(sortActive(images)),
			setFiltered: (value) => dispatch(setFiltered(value))
    }
  }

  static mapStateToProps (state) {
    return {
			photos: state.home.photos,
			filteredPhotos: state.home.filteredPhotos,
			isFiltered: state.home.isFiltered,
			activeFlag: state.home.activeFlag
    }
  }

  constructor (props) {
		super(props)
	  this.state = {
			page: 1,
			width: window.innerWidth,
			height: window.innerHeight - BAR_HEIGHT - BUTTON_HEIGHT
	  }
  }

  componentDidMount () {
		window.addEventListener('resize', this.updateDimensions)
		this.props.getPhotos()
  }

  handlePageClick = ({selected}) => {
		window.removeEventListener('resize', this.updateDimensions)
	  this.setState({
		  page: selected + 1
	  })
	}

	updateDimensions = () => {
		this.setState({width: window.innerWidth})
	}

  getGridSource = (photos) => {
		const idx = (this.state.page * 4)
		const sliced = _.slice(photos, idx-4, idx)
		return _.map(sliced, (value, key) => {
			return (
				<div key={key} style={styles(this.state).imageContainer}>
					<img src={value.image} alt='' style={styles(this.state).image}></img>
					<div style={styles(this.state).captionContainer}>
						<span style={styles(this.state).span}>Description: {value.description}</span>
						<span style={styles(this.state).span}>Tag: {value.tag}</span>
						<span style={styles(this.state).span}>Date: {value.date}</span>
						{this.props.activeFlag &&
							<span style={styles(this.state).span}>Active: {value.active}</span>
						}
					</div>
				</div>
			)
		})
  }

	sortDate = () => {
		if (this.props.isFiltered) {
			this.props.setFiltered(false)
		} else {
			this.props.sortDate(this.props.photos.rows)
		}
	}

	sortActive = () => {
		if (this.props.isFiltered) {
			this.props.setFiltered(false)
		} else {
			this.props.sortActive(this.props.photos.rows)
		}
	}

  render () {
		const photosToShow = this.props.isFiltered ? this.props.filteredPhotos : this.props.photos.rows
		const pages = Math.ceil(_.size(photosToShow) / 4)
		const gridSource = this.getGridSource(photosToShow)
			return (
				<div>
					<div style={styles(this.state).buttonContainer}>
						<RaisedButton onClick={this.sortDate} style={styles(this.state).button} label='Sort DATE' />
						<RaisedButton onClick={this.sortActive} style={styles(this.state).button} label='Sort ACTIVE' />
					</div>
					<div style={styles(this.state).gridContainer}>
						{gridSource}
					</div>
					<div style={styles(this.state).pageinateContainer}>
						<ReactPaginate
							previousLabel={'<'}
							nextLabel={'>'}
							breakLabel={<a href=''>...</a>}
							breakClassName={'break-me'}
							pageCount={pages}
							marginPagesDisplayed={2}
							pageRangeDisplayed={pages}
							onPageChange={this.handlePageClick}
							containerClassName={'pagination'}
							subContainerClassName={'pages pagination'}
							activeClassName={'active'}
						/>
					</div>
				</div>
			)
  }
}

const styles = (state) => {
	return {
		buttonContainer: {
			marginBottom: '5px'
		},
		gridContainer: {
			minHeight: '100%',
			display: 'flex',
			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'center'
		},
		pageinateContainer: {
			bottom: 0,
			width: '100%',
		},
		imageContainer: {
			background: 'lightgrey',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			flexBasis: '50%',
			maxWidth: state.width/2 - 10,
			justifyContent: 'space-between',
			border: '1px solid black'
		},
		image: {
			maxWidth: '95%',
			maxHeight: '75%'
		},
		captionContainer: {
			display: 'flex',
			flexDirection: 'column'
		},
		span: {
			width: state.width/2 - 10
		},
		button: {
			marginLeft: '10px'
		}
	}
}

export default withRouter(connect(HomePage.mapStateToProps, HomePage.mapDispatchToProps)(HomePage))
