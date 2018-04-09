import {Error, Success, removeById, mapObject, identity} from './index';

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

it('Monad join', () => {
  expect(
    Success(3)
      .join(Success(2), (x, y) => x + y)
      .getValue()
  ).toBe(5);
  expect(
    Error(1)
      .join(Error(2), (x, y) => x + y)
      .getError()
  ).toEqual(1);
  expect(
    Error(1)
      .join(Success(3), (x, y) => x + y)
      .getError()
  ).toEqual(Error(1).getError());
  expect(
    Success(1)
      .join(Error(3), (x, y) => x + y)
      .getError()
  ).toEqual(Error(3).getError());
});

it('Remove by Id', () => {
  const x = {
    a: 1,
    b: 2,
    c: 3
  };
  expect(removeById(x, id => id !== 'b')).toEqual({a: 1, c: 3});
});

it('Map object', () => {
  const x = {
    a: 1,
    b: 2,
    c: 3
  };
  expect(mapObject(x, (k, v) => v + 1)).toEqual({a: 2, b: 3, c: 4});
});

it('identity', () => {
  expect(identity(3)).toBe(3);
});
