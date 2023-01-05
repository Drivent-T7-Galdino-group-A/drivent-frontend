import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignInWithFireBase() {
  const {
    loading: signInFirebaseLoading,
    error: signInFirebaseError,
    act: signInFirebase,
  } = useAsync(authApi.signInWithFirebase, false);

  return {
    signInFirebaseLoading,
    signInFirebaseError,
    signInFirebase,
  };
}
