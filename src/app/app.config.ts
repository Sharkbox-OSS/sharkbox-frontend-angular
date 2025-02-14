import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authConfig } from './auth/auth-http.config';
import { AbstractSecurityStorage, authInterceptor, provideAuth, withAppInitializerAuthCheck } from 'angular-auth-oidc-client';
import { AuthStorageService } from './auth/auth-storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideRouter(routes, withComponentInputBinding()),
    provideAuth(authConfig, withAppInitializerAuthCheck()),
    { provide: AbstractSecurityStorage, useClass: AuthStorageService }
  ]
};
