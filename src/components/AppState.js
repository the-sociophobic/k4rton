import React from 'react'

const defaultState = {
  article: {},
  subscribingProcess: {
    selected: {
      tags: [],
      publishers: []
    },
    periodType: 1
  }
}
const appState = React.createContext(defaultState)


class globalStateProvider extends React.Component {
  constructor(props) {
    super(props)
    // this.state = Object.assign({}, defaultState)
    // window.setGlobalState = this.setState
    window.setGlobalState = (newState) => {
      if (typeof newState === 'function') {
        this.setState(newState(Object.assign({}, this.state)))
      } else {
        // console.log(JSON.stringify(this.state, null, 2))
        // console.log(JSON.stringify(newState, null, 2))
        this.setState(newState)
      }
    }
    window.getGlobalState = () => Object.assign({}, this.state)
    // this.changeListeners = []
    // onChange = (func) => this.changeListeners.push(func)
  }
  componentDidMount() {
    this.setState(defaultState)
  }
  render() {
    // console.log(JSON.stringify(this.state, null, 4))
    // debugger
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
