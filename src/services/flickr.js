import axios from 'axios';
import {Success, Error} from '../helpers';

// Errors:
// - axios fail
// - data are not json
// - stat !== ok in the the response
// - field not available (api changed ?)

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
    .then(resp => Success(resp.data))
    .catch(() => Error('Network error'));

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
    .then(resp => Success(resp.data))
    .catch(() => Error('Network error'));

const firstMatch = matches => {
  if (!matches || matches.length < 2) {
    return Error('Cannot get the photo id');
  }
  return Success(matches[1]);
};

// I refer to: https://www.flickr.com/services/api/misc.urls.html
const urlToId = url =>
  firstMatch(/https:\/\/www.flickr.com\/photos\/.*?\/(.*?)\//.exec(url));

// Transform raw flickr json to our info
const infoToBookmarkInfo = json => {
  if (json && json.stat === 'fail' && json.message) {
    return Error(json.message);
  }
  if (
    !json ||
    !json.photo ||
    !json.photo.owner ||
    !json.photo.dates ||
    !json.photo.title
  ) {
    return Error("The response doesn't fit our requirement");
  }
  const {
    photo: {
      owner: {username: authorName},
      dates: {posted: addedDate},
      title: {_content: title}
    }
  } = json;
  if (authorName && addedDate && title) {
    return Success({
      authorName,
      addedDate,
      title
    });
  }
  return Error(
    'One of authorName, addedDate or title cannot be found from flickr response'
  );
};

// Transform raw flickr size to our sizes
const sizeToBookmarkSize = json => {
  if (json && json.stat === 'fail' && json.message) {
    return Error(json.message);
  }
  if (!json || !json.sizes) {
    return Error("The response doesn't fit our requirement");
  }
  const {sizes: {size}} = json;
  if (!size) {
    return Error('Sizes cannot be found in the server response');
  }
  const {width, height} = size.find(({label}) => label === 'Original');
  if (width && height) {
    return Success({
      width,
      height
    });
  }
  return Error('Either Width or Height cannot be found');
};

/**
 * @return
 * Either:
 *   - An Error that contains the error
 *   - A Success that contains a Promise
 * In case of success, the promise is resolved with either:
 *   - An Error that contains the error
 *   - A Success that contains the target object
 */
export const get = url => {
  const photoId = urlToId(url);
  return photoId.map(id => {
    return Promise.all([fetchInfo(apiKey, id), fetchSize(apiKey, id)]).then(
      ([rawInfo, rawSizes]) => {
        return rawInfo
          .join(rawSizes, (info, size) => [info, size])
          .flatMap(([info, size]) =>
            Success(url)
              .join(infoToBookmarkInfo(info), (url, info) => ({url, ...info}))
              .join(sizeToBookmarkSize(size), (acc, size) => ({
                ...acc,
                ...size,
                type: 'flickr'
              }))
          );
      }
    );
  });
};
