function saveAuthToCookie(value) {
  document.cookie = `token=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `user=${value}`;
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  //https://cusmaker.tistory.com/151 path 값을 주지 않아서 다른 path에서 쿠키가 삭제 안됐다
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
};
