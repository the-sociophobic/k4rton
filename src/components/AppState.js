import React from 'react'

const defaultState = {
  article: {},
  subscribingProcess: {
    selected: {
      tags: [],
      publishers: []
    },
    periodType: 1
  },
  apiUrl: 'https://agentstvo-adv.ru:3000/api',
  previewFeedMode: false
}
const appState = React.createContext(defaultState)


class globalStateProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    window.setGlobalState = (newState) => {
      if (typeof newState === 'function') {
        this.setState(newState(Object.assign({}, this.state)))
      } else {
        this.setState(newState)
      }
    }
    window.getGlobalState = () => Object.assign({}, this.state)
  
  }
  componentDidMount() {
    this.setState(defaultState)
  }
  render() {
    return  <appState.Provider value={this.state}>
              {this.props.children}
            </appState.Provider>
  }
}
//              <appState.Consumer>((change) => this.changeListeners.forEach(func => func(change)))</appState.Consumer>

export default {
  Consumer: appState.Consumer,
  Provider: globalStateProvider,
}
