import axios from 'axios';

const apiKey = 'ea931761dda5f33c5bfb3fb7229bd111'; // thanks to the people that don't hide their key on codepen
const restApi = 'https://api.flickr.com/services/rest/';

const fetchSize = (apiKey, photoId) =>
  axios
    .get(restApi, {
      params: {
        method: 'flickr.photos.getSizes',
        api_key: apiKey,
        photo_id: photoId,
        format: 'json',
        nojsoncallback: 1
      }
    })
    .then(resp => resp.data);

const fetchInfo = (apiKey, photoId) =>
  axios
    .get(restApi, {
      params: {
        method: 'flickr.photos.getInfo',
        api_key: apiKey,
        photo_id: photoId,
        format: 'json',
        nojsoncallback: 1
      }
    })
    .then(resp => resp.data);

const firstMatch = matches => matches[1];

// I refer to: https://www.flickr.com/services/api/misc.urls.html
const urlToId = url =>
  firstMatch(/https:\/\/www.flickr.com\/photos\/.*?\/(.*?)\//.exec(url));

// Transform raw flickr json to our info
const infoToBookmarkInfo = json => {
  const {
    photo: {
      owner: {username: authorName},
      dates: {posted: addedDate},
      title: {_content: title}
    }
  } = json;
  return {
    authorName,
    addedDate,
    title
  };
};

// Transform raw flickr size to our sizes
const sizeToBookmarkSize = json => {
  const {sizes: {size}} = json;
  const {width, height} = size.find(({label}) => label === 'Original');
  return {
    width,
    height
  };
};

export const get = url => {
  const photoId = urlToId(url);
  return Promise.all([
    fetchInfo(apiKey, photoId),
    fetchSize(apiKey, photoId)
  ]).then(([rawInfo, rawSizes]) => {
    return {
      url,
      ...sizeToBookmarkSize(rawSizes),
      ...infoToBookmarkInfo(rawInfo)
    };
  });
};
