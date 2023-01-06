import useAsync from '../useAsync';
import useToken from '../useToken';

import * as localizationApi from '../../services/localizationApi';

export default function useLocalizations() {
  const token = useToken();

  const {
    data: localizations,
    loading: localizationsLoading,
    error: localizationsError,
    act: getLocalizations,
  } = useAsync(() => localizationApi.getLocalizations(token));

  return {
    localizations,
    localizationsLoading,
    localizationsError,
    getLocalizations,
  };
}
