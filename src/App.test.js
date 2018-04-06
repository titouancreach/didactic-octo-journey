import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Error, Success} from './helpers';
import {get} from './services/flickr';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Info should be retrieve', done => {
  get(
    'https://www.flickr.com/photos/39157211@N02/4793453184/in/photolist-8izGCy-pKDWYD-wW4G5-a6S9vC-a6Ph9T-6zdjmx-9eddjn-4bVcbQ-EDtcsB-93xS7c-6jroih-ds53j1-drcNoH-a6S94d-YmUNdU-aErXBh-aLrSn8-brME7V-a6S8rd-3bcEgb-drcFpy-egMFFZ-e3xKR4-21UFYnf-egTb4L-cifDwu-a6S8Eh-kYGZqZ-6DXMct-ReUNNL-25w9KSj-ds4TU6-8gNb8a-8fHd1j-24H2tyT-Yv9tWA-egTeqo-VJNLo6-T4DmX5-a8fBWL-RzWexA-RPrcVe-9FxneA-hB4gNH-RCC8qT-8gr1QD-egMuPr-9kPisX-WPRuyS-9QKgXm'
  ).fold(
    x =>
      x
        .then(y => y.fold(y => y, y => y))
        .then(console.log)
        .then(done),
    err => {
      console.log(err);
      done();
    }
  );
});

it('Monad flatMap', () => {
  expect(
    Success(3)
      .flatMap(x => Success(x + 1))
      .isSuccess()
  ).toBe(true);
  expect(
    Success(3)
      .flatMap(x => Success(x + 1))
      .getValue()
  ).toBe(4);
  expect(
    Success(3)
      .flatMap(() => Error('Something went wrong'))
      .isSuccess()
  ).toBe(false);
  expect(
    Error('An error occurred')
      .flatMap(x => Success(x + 1))
      .flatMap(x => x + 1)
      .isSuccess()
  ).toBe(false);
  expect(
    Error('xxx')
      .flatMap(() => 1)
      .getError()
  ).toBe('xxx');
});

it('Monad fold', () => {
  const identity = x => x;
  expect(
    Success(3).fold(identity, () => {
      throw new Error('Error case');
    })
  ).toBe(3);
  expect(
    Error('Error').fold(() => {
      throw new Error('It has succeeded');
    }, identity)
  ).toBe('Error');
});

it('Monad map', () => {
  const identity = x => x;
  expect(
    Success(3)
      .map(x => x + 1)
      .map(x => x + 3)
      .getValue()
  ).toBe(7);
  expect(
    Error('Error')
      .map(x => x + 1)
      .map(x => x + 3)
      .isError()
  ).toEqual(true);
});

it('Monad concat', () => {
  expect(
    Success(3)
      .concat(Success(2))
      .map(([x, y]) => x + y)
      .getValue()
  ).toBe(5);
  expect(
    Error(1)
      .concat(Error(2))
      .map(([x, y]) => x + y)
      .getError()
  ).toEqual([1, 2]);
  expect(
    Error(1)
      .concat(Success(3))
      .map(([x, y]) => x + y)
      .getError()
  ).toEqual(Error(1).getError());
  expect(
    Success(1)
      .concat(Error(3))
      .map(([x, y]) => x + y)
      .getError()
  ).toEqual(Error(3).getError());
});
