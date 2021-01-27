import { getInstance } from "./index";

export const authGuard = (to, from, next) => {
  const authService = getInstance();

  const fn = () => {
    // If the user is authenticated, continue with the route
    authService.getUserInfo();
    if (authService.isAuthenticated && authService.user.email_verified && authService.user['https://stutor.com/phone_verified']) {
      return next();
    }
    else if(authService.isAuthenticated && to.name == "UserAccount"){ // allow users to access their account page without email or phone verification.
      return next();
    }
    else if (authService.isAuthenticated && (!authService.user.email_verified || !authService.user['https://stutor.com/phone_verification'])){
      return next({name: 'VerificationError'});
    }

    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch("loading", loading => {
    if (loading === false) {
      return fn();
    }
  });
};