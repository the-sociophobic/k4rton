
export function getUrlData() {
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

export default getUrlData;