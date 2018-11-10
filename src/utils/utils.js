
export const getUrlData = () => {
  const urlData = {};

  if (window.location.hash.length > 0) {
    const hash = window.location.hash.substr(1);
    for (let hashPart of hash.split('&')) {
      if (hashPart.includes('='))
        urlData[hashPart.split('=')[0]] = hashPart.split('=')[1]
    }
  }

  return urlData;
}

export const setUrlData = (urlData) => {
  let newHash = ''
  for (let hashPart in urlData) {
    newHash += hashPart + '=' + urlData[hashPart] + '&'
  }
  console.log(newHash)
  window.location.hash = '#' + newHash.substring(0, newHash.length - 1)
}

export const changeDataInUrl = (dataDif) => {
  const newUrlData = Object.assign(getUrlData(), dataDif)
  setUrlData(newUrlData)
}
