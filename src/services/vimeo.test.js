import {get} from './vimeo';

it('Vimeo Info should be retrieve', done => {
  get('https://vimeo.com/263142576').fold(
    x =>
      x
        .then(y => y.fold(y => y, y => y))
        .then(console.log)
        .then(done),
    err => {
      console.error(err);
      done();
    }
  );
});
