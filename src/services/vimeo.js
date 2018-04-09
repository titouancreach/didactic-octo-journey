// @flow

// In the official site, they only expose the method where a user should create an app.
// In stackoverflow, we can find some info about the old api (v2), that doesn't require to create an app.
// This method doesn't require any api_key or client_secret
// This is enought for our requirement...

import axios from 'axios';
import {Error, Success} from '../helpers';

const fetchInfo = videoId => {
  return axios
    .get(`http://vimeo.com/api/v2/video/${videoId}.json`)
    .then(resp => Success(resp.data))
    .catch(error =>
      Error(
        'Network error, the request as failed, make sure your link is valid'
      )
    );
};

const urlToId = url => {
  const regex = /^https:\/\/vimeo.com\/(\d*)/;
  return Success(regex.exec(url)).flatMap(groups => {
    if (!groups || groups.length < 2) {
      // $FlowFixMe
      return Error('Cannot get video id');
    }
    return Success(groups[1]);
  });
};

// convert this format: 2018-04-04 08:03:41 to timestamp
// We will assume that vimeo send good date and doesn't change their format
// between requests...
const getTimeStamp = vimeoDate => {
  const d = new Date(vimeoDate);
  return d.getTime() / 1e3;
};

export const get = (url: string) => {
  return urlToId(url).map(id =>
    fetchInfo(id).then(rawInfo =>
      rawInfo
        .flatMap(rawInfo => {
          if (!Array.isArray(rawInfo) || rawInfo.length < 1) {
            return Error("Server response doesn't fit our requirement");
          }
          return Success(rawInfo[0]);
        })
        .flatMap(rawInfo => {
          const {
            duration,
            width,
            height,
            user_name: authorName,
            title,
            upload_date: addedDate
          } = rawInfo;
          if (duration && width && height && authorName && title && addedDate) {
            return Success({
              duration,
              width,
              height,
              authorName,
              title,
              addedDate: getTimeStamp(addedDate),
              url,
              type: 'vimeo'
            });
          }
          return Error('One the required field is not defined');
        })
    )
  );
};
