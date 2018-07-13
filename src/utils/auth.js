import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getRight() {
  const right = Cookies.get('right');
  const now = (new Date().getTime());
  if (right && now < right) {
    Cookies.set('right', now + 600000);
    return true;
  } else {
    return false;
  }
}
