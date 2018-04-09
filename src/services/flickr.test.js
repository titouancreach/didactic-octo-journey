import {get} from './flickr';

it('Flickr Info should be retrieve', done => {
  get(
    'https://www.flickr.com/photos/39157211@N02/4793453184/in/photolist-8izGCy-pKDWYD-wW4G5-a6S9vC-a6Ph9T-6zdjmx-9eddjn-4bVcbQ-EDtcsB-93xS7c-6jroih-ds53j1-drcNoH-a6S94d-YmUNdU-aErXBh-aLrSn8-brME7V-a6S8rd-3bcEgb-drcFpy-egMFFZ-e3xKR4-21UFYnf-egTb4L-cifDwu-a6S8Eh-kYGZqZ-6DXMct-ReUNNL-25w9KSj-ds4TU6-8gNb8a-8fHd1j-24H2tyT-Yv9tWA-egTeqo-VJNLo6-T4DmX5-a8fBWL-RzWexA-RPrcVe-9FxneA-hB4gNH-RCC8qT-8gr1QD-egMuPr-9kPisX-WPRuyS-9QKgXm'
  ).fold(
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
