// @flow

export const identity = x => x;

// credit to this guys: https://gist.github.com/gordonbrander/2230317
// it should be safe enough for this app
export const getUniqId = () =>
  '_' +
  Math.random()
    .toString(36)
    .substr(2, 9);

// Simple Error/Success monad
export const Success = value => {
  return {
    map(f) {
      return Success(f(value));
    },
    flatMap(f) {
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
    // if we concat 2 success, we return Success([a, b]) else we return the Error(b)
    concat(m) {
      return m.fold(
        x => {
          if (Array.isArray(value)) {
            return Success(value.concat(x));
          }
          return Success([value, x]);
        },
        err => Error(err)
      );
    }
  };
};

export const Error = error => {
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
    // if we concat 2 Error, we return Error([a, b]) else, we return Error(a)
    concat(m) {
      return m.fold(
        () => Error(error),
        err => {
          if (Array.isArray(error)) {
            return Error(error.concat(err));
          }
          return Error([error, err]);
        }
      );
    }
  };
};

export type Either = Error | Success;
