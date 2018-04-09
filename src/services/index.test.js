import {getFetcher} from './index';
import {Error, Success} from '../helpers';

it('getFetcher', done => {
  getFetcher('https://www.flickr.com').fold(
    _ => done(),
    _ => {
      throw new Error();
    }
  );
  getFetcher('https://vimeo.com').fold(
    _ => done(),
    _ => {
      throw new Error();
    }
  );
  getFetcher('should error').fold(
    _ => {
      throw new Error();
    },
    _ => done()
  );
});
