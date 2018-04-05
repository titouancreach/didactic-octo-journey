// credit to this guys: https://gist.github.com/gordonbrander/2230317
// it should be safe enough for this app
export const getUniqId = () => '_' + Math.random().toString(36).substr(2, 9);
