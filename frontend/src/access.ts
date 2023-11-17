import myLocalStorage from './utils/LocalStorage.js';
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const info = JSON.parse(localStorage.getItem('userInfo'));

  return {
    canAdmin: info && info.isAdmin === 1,
  };
}
