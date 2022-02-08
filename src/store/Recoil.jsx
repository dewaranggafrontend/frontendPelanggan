import axios from 'axios';
import { atom, selector } from 'recoil';
import { smd_url } from '../variable/BaseUrl';

const authentication = atom({
  key: 'authentication',
  default: selector({
    key: 'default-authentication',
    get: async () => {
      let auth = false;
      let user = null;
      try {
        const { data } = await axios.get(smd_url + 'details', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        user = data.success;
        auth = data.success === null ? false : true;
      } catch {
        user = null;
        auth = false;
      }
      return {
        user,
        auth,
      };
    },
  }),
});

const menuAtom = atom({
  key: 'menu-atom',
  default: '0',
});

const openAtom = atom({
  key: 'open-atom',
  default: false,
});

const selectAtom = atom({
  key: 'select-atom',
  default: '',
});

export { authentication, menuAtom, openAtom, selectAtom };
