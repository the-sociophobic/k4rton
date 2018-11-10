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

export function clamp(a, min, max) {
  return Math.min(max, Math.max(a, min));
}

export function tagColor0(tag) {
  const k = 23;
  let string = "";

  for (let i = 0; i < 3; i++)
    string += tag.charAt((i * k) % tag.length);
  console.log(string);
  //Hash function
  return "#" + string.split('')
    .map((char, index) =>
      Math.floor(clamp((((string.charCodeAt(index) % k) / k) * 255), 70, 220)).toString(16)
    ).reduce((a, b) => a + b);
}

export function tagColor(tag) {
  const stylishColors = ["2770f1", "3fb0ac", "ba9077", "729f98", "6534ff", "62bcfa", "e05038", "dc3966", "026f52", "f36523", "e70247", "07a5a4", "4bae54", "c75696", "db3849"];
  const k = 17;
  let hash = 0;

  tag.split('').forEach((char, index) => {
    hash = hash * k + tag.charCodeAt(index)
    if (index % 4 == 3)
      hash = hash % stylishColors.length;
  });

  return "#" + stylishColors[hash % stylishColors.length];
}

export default getUrlData;
