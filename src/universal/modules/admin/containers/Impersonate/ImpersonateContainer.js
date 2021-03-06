import PropTypes from 'prop-types'
import React, {Component} from 'react'
import LoadingView from 'universal/components/LoadingView/LoadingView'
import Helmet from 'react-helmet'
import requireAuthAndRole from 'universal/decorators/requireAuthAndRole/requireAuthAndRole'
import withAtmosphere from 'universal/decorators/withAtmosphere/withAtmosphere'
import CreateImposterTokenMutation from 'universal/mutations/CreateImposterTokenMutation'

const showDucks = () => {
  return (
    <div>
      <Helmet title='Impersonating' />
      <LoadingView />
    </div>
  )
}

class Impersonate extends Component {
  static propTypes = {
    atmosphere: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    newUserId: PropTypes.string,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {
      atmosphere,
      dispatch,
      match: {
        params: {newUserId}
      },
      history,
      location
    } = this.props
    if (newUserId) {
      CreateImposterTokenMutation(atmosphere, newUserId, {
        dispatch,
        history,
        location
      })
    }
  }

  render () {
    const {
      match: {
        params: {newUserId}
      }
    } = this.props
    if (!__CLIENT__) {
      return showDucks()
    }
    if (!newUserId) {
      return <div>No newUserId provided!</div>
    }
    return showDucks()
  }
}

export default withAtmosphere(requireAuthAndRole({role: 'su', silent: true})(Impersonate))
