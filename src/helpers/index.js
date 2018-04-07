// @flow

export function identity<T>(x: T) {
  return x;
}

// credit to this guys: https://gist.github.com/gordonbrander/2230317
// it should be safe enough for this app
export const getUniqId = () =>
  '_' +
  Math.random()
    .toString(36)
    .substr(2, 9);

export type Either<T, U> = SuccessType<T, U> | ErrorType<T, U>;

export type SuccessType<T, U> = {
  map: (<X>(T) => X) => SuccessType<T, U>,
  flatMap: <X>((T) => Either<X, U>) => Either<X, U>,
  isSuccess: () => boolean,
  isError: () => boolean,
  getValue: () => T,
  fold: ((T) => any, (U) => any) => any,
  join: (Either<T, U>, Function) => Either<T, U>
};

export type ErrorType<T, U> = {
  map: (<X>(T) => X) => ErrorType<T, U>,
  flatMap: Function => ErrorType<T, U>,
  isSuccess: () => boolean,
  isError: () => boolean,
  getError: () => U,
  fold: ((T) => any, (U) => any) => any,
  join: (Either<T, U>, Function) => ErrorType<T, U>
};

// Simple Error/Success monad
export const Success = <T, U>(value: T): SuccessType<T, U> => {
  return {
    map(f) {
      return Success(f(value));
    },
    flatMap(f: Function) {
      return f(value);
    },
    isSuccess() {
      return true;
    },
    isError() {
      return !this.isSuccess();
    },
    getValue() {
      return value;
    },
    fold(f /*, g*/) {
      return f(value);
    },
    join(m: Either<T, any>, f: (T, any) => any) {
      return m.fold(x => Success(f(value, x)), err => Error(err));
    }
  };
};

export const Error = <T, U>(error: U): Error<T, U> => {
  return {
    map() {
      return Error(error);
    },
    flatMap() {
      return Error(error);
    },
    isSuccess() {
      return false;
    },
    isError() {
      return !this.isSuccess();
    },
    getError() {
      return error;
    },
    fold(f, g) {
      return g(error);
    },
    join() {
      return Error(error);
    }
  };
};

export function removeById(obj: Object, predicate: any => boolean): Object {
  return Object.entries(obj)
    .filter(([id]) => predicate(id))
    .reduce((acc, [id, item]) => ({...acc, [id]: item}), {});
}

export function mapObject(obj: Object, predicate: (string, any) => Object) {
  return Object.entries(obj)
    .map(([k, v]) => [k, predicate(k, v)])
    .reduce((acc, [id, item]) => ({...acc, [id]: item}), {});
}
