const subscribers = [], path = ['home']
const navigator = {
  subscribe: (func) => { subscribers.push(func) },
  go: (page) => {
    path.push(page)
    for (let subscriber of subscribers)
      subscriber(path)
  },
  back: () => {
    if (path.length > 1)
      path.splice(path.length - 1, 1)
    setTimeout(() => {
      for (let subscriber of subscribers)
        subscriber(path)
    }, 0)
  },
  // setRoot(root) => {
  //   path = [root]
  //   setTimeout(() => {
  //     for (let subscriber of subscribers)
  //       subscriber(path)
  //   }, 0)
  // }
}


export default navigator