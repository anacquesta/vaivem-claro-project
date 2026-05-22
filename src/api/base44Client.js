import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

const isAppIdValid = appId && appId !== 'null' && appId !== 'undefined';

//Create a client with authentication required
export const base44 = isAppIdValid
  ? createClient({
      appId,
      token,
      functionsVersion,
      serverUrl: '',
      requiresAuth: false,
      appBaseUrl
    })
  : {
      auth: {
        me: async () => { throw new Error('Base44 not configured'); },
        logout: () => {},
        redirectToLogin: () => {}
      }
    };
