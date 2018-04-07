import {get as flickrGet} from './flickr';
import {get as vimeoGet} from './vimeo';
import {Error, Success} from '../helpers';


// Would be helpful to check for https and for domain extension
export const getFetcher = url => {
  if (url.startsWith('https://www.flickr.com')) {
    return Success(flickrGet);
  }
  if (url.startsWith('https://vimeo.com')) {
    return Success(vimeoGet)
  }
  return Error('Url should be either Vimeo or Flickr');
}
