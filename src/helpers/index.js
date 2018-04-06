// @flow

// credit to this guys: https://gist.github.com/gordonbrander/2230317
// it should be safe enough for this app
export const getUniqId = () =>
  '_' +
  Math.random()
    .toString(36)
    .substr(2, 9);


// Simple Error/Success monad
export const Success = (value) => {
  return {
    map(f) {
      return Success(f(value))
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
      return value
    },
    fold(f/*, g*/) {
      return f(value)
    }
  }
};

export const Error = error => {
  return {
    map() {
      return Error(error)
    },
    flatMap() {
      return Error(error);
    },
    isSuccess() {
      return false;
    },
    isError() {
      return !this.isSuccess()
    },
    getError() {
      return error;
    },
    fold(f, g) {
      return g(error)
    }
  }
};


export type Either = Error | Success;
