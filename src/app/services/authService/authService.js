import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import settingConfig from '../../fuse-configs/settingsConfig';

class authService extends FuseUtils.EventEmitter {

   init() {
      this.handleAuthentication();
   }

   handleAuthentication = () => {
      let access_token = this.getAccessToken();

      if (!access_token) {
         this.emit('onNoAccessToken');
         return;
      }

      this.setSession(access_token);
      this.emit('onAutoLogin', true);
   };

   signInWithEmailAndPassword = (username, password) => {
      return new Promise((resolve, reject) => {
         axios.post(`${settingConfig.apiServerURL}/api/auth-users/login/`, {
            username,
            password
         }).then(response => {
            if (response.data.success && (response.data.result.role === 5 || response.data.result.role === 6)) {
               this.setSession(response.data.result.token);
               this.setProfile(response.data.result);
               resolve();
            } else {
               var error = {
                  username: 'メールアドレスを確認してください。',
                  password: 'パスワードを確認してください。'
               }
               reject(error);
            }
         }).catch(error => {
            reject(error);
         });
      });
   };

   updateUserData = (user) => {
      return axios.post('/api/auth/user/update', {
         user: user
      });
   };

   setSession = access_token => {
      if (access_token) {
         localStorage.setItem('mealpaper_dashboard_access_token', access_token);
         axios.defaults.headers.common['Authorization'] = 'Token ' + access_token;
      } else {
         localStorage.removeItem('mealpaper_dashboard_access_token');
         localStorage.removeItem('mealpaper_dashboard_profile');
         delete axios.defaults.headers.common['Authorization'];
      }
   };
   
   setProfile = (profile) => {
      localStorage.setItem('mealpaper_dashboard_profile', JSON.stringify(profile));
   }

   logout = () => {
      this.setSession(null);
   };

   getAccessToken = () => {
      return window.localStorage.getItem('mealpaper_dashboard_access_token');
   };

   getProfile = () => {
      return JSON.parse(window.localStorage.getItem('mealpaper_dashboard_profile'));
   }
}

const instance = new authService();

export default instance;