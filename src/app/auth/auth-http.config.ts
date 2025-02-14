import { HttpClient } from '@angular/common/http';
import { LogLevel, PassedInitialConfig, StsConfigHttpLoader, StsConfigLoader } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';

export const httpLoaderFactory = (httpClient: HttpClient) => {
  const config$ = httpClient
    .get<any>(`/api/v1/auth/config`)
    .pipe(
      map((customConfig: any) => {
        return {
          authority: customConfig.stsServer,
          clientId: customConfig.clientId,
          redirectUrl: window.location.origin,
          autoUserInfo: true,
          ngswBypass: true,
          responseType: 'code',
          scope: 'openid email profile',
          postLogoutRedirectUri: window.location.origin,
          startCheckSession: true,
          silentRenew: true,
          useRefreshToken: true,
          ignoreNonceAfterRefresh: true,
          silentRenewUrl: `${window.location.origin}/silent-renew.html`,
          postLoginRoute: '/dashboard',
          forbiddenRoute: '/home',
          unauthorizedRoute: '/home',
          logLevel: LogLevel.Warn,
          maxIdTokenIatOffsetAllowedInSeconds: 3600,
          historyCleanupOff: true,
          secureRoutes: [ '/api' ]
        };
      })
    );

  return new StsConfigHttpLoader(config$);
};

export const authConfig: PassedInitialConfig = {
  loader: {
    provide: StsConfigLoader,
    useFactory: httpLoaderFactory,
    deps: [HttpClient],
  }
}
