const subscribers = [], path = ['home']
const navigator = {
  subscribe: (func) => { subscribers.push(func) },
  go: (page) => {
    path.push(page)
    console.log(page)
    for (let subscriber of subscribers)
      subscriber(path)
  },
  back: () => {
    console.log('go back', path)
    if (path.length > 1)
      path.splice(path.length - 1, 1)
    console.log(path)
    setTimeout(() => {
      for (let subscriber of subscribers)
        subscriber(path)
    })
  }
}

export default navigator