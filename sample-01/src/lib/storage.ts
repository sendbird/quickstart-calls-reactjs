import { isBrowser } from 'utils';

export default (function () {
  try {
    const st = localStorage || {};
    return {
      setItem: (key: string, object: any) => {
        st[key] = typeof object === 'string' ? object : JSON.stringify(object);
      },
      getItem: (key: string, parse = true) => {
        if (!st[key]) {
          return null;
        }
        const value = st[key];

        try {
          return parse ? JSON.parse(value) : value;
        } catch (e) {
          return value;
        }
      },
      removeItem: (key: string) => {
        if (localStorage) {
          return localStorage.removeItem(key);
        }
        return delete st[key];
      },
    };
  } catch (err) {
    if (isBrowser) {
      console.warn(err);
      setTimeout(() => alert('Cookie disabled'), 1000);
    }
    return {
      setItem: (key: string, object: any) => '',
      getItem: (key: string) => '',
      removeItem: (key: string) => '',
    };
  }
}());
