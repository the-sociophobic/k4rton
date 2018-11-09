import React from 'react'

const defaultState = {
  article: {},
  subscribingProcess: {}
}
const appState = React.createContext(defaultState)


class globalStateProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, defaultState)
    window.setGlobalState = (newState) => this.setState(newState)
    window.getGlobalState = (newState) => this.setState(newState)
    // this.changeListeners = []
    // onChange = (func) => this.changeListeners.push(func)
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
