import React, { Component } from 'react';
import { FuseSplashScreen } from '@fuse';
import { connect } from 'react-redux';
import * as userActions from 'app/auth/store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from 'app/store/actions';
import authService from 'app/services/authService';

class Auth extends Component {

   state = {
      waitAuthCheck: true
   }

   componentDidMount() {
      return Promise.all([
         // Comment the lines which you do not use
         this.authCheck()
      ]).then(() => {
         this.setState({ waitAuthCheck: false });
      });
   }

   authCheck = () => new Promise(resolve => {

      authService.on('onAutoLogin', () => {
         resolve();
      });

      authService.on('onAutoLogout', (message) => {

         if (message) {
            this.props.showMessage({
               message,
               autoHideDuration: 2000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               },
               variant: 'warning'
            });
         }

         this.props.logout();

         resolve();
      });

      authService.on('onNoAccessToken', () => {
         resolve();
      });
      authService.init();

      return Promise.resolve();
   })

   render() {
      return this.state.waitAuthCheck ? <FuseSplashScreen /> : <React.Fragment children={this.props.children} />;
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({
      logout: userActions.logoutUser,
      showMessage: Actions.showMessage
   }, dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);