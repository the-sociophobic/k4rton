import { changeDataInUrl, getUrlData } from './utils'

let subscribers = [], path = ['home'], initOpenAllowed = [], onInitRedirect = {}
const callSubscribers = () => {
  for (let subscriber of subscribers)
    subscriber(path)
}
const navigator = {
  subscribe: (func) => { subscribers.push(func) },
  go: (page) => {
    path.push(page)
    callSubscribers()
    changeDataInUrl({page: path.slice(-1)[0]})
  },
  back: () => {
    if (path.length > 1)
      path.splice(path.length - 1, 1)
    callSubscribers()
    changeDataInUrl({page: path.slice(-1)[0]})
  },
  init: (options) => {
    initOpenAllowed = options.initOpenAllowed
    onInitRedirect = options.onInitRedirect
    const urlData = getUrlData()
    if (urlData.page !== undefined) {
      if (initOpenAllowed.includes(urlData.page)) {
        path.push(urlData.page)
        callSubscribers()
      } else if (onInitRedirect[urlData.page] !== undefined) {
        path.push(onInitRedirect[urlData.page])
        callSubscribers()
      }
    }
  }
  // setRoot(root) => {
  //   path = [root]
  //   setTimeout(() => {
  //     for (let subscriber of subscribers)
  //       subscriber(path)
  //   }, 0)
  // }
}


export default navigator