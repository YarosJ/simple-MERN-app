
/**
 * Get cookie by name from document cookies
 * @param name
 * @returns {string}
 */

export function getCookie(name) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : '';
}

/**
 * Set cookie by name for a specified amount of time
 * @param name
 * @param value
 * @param days
 */

export function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
}

export function deleteCookie(name) { setCookie(name, '', -1); }
