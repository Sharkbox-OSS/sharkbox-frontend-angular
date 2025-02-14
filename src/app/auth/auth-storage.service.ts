import { Injectable } from "@angular/core";
import { AbstractSecurityStorage } from "angular-auth-oidc-client";

/**
 * Using LocalStorage allows us to persist the user's authentication state even if the user
 * refreshes the page or closes the browser or opens a new tab.
 */
@Injectable()
export class AuthStorageService implements AbstractSecurityStorage {
  read(key: string): string | null {
    return localStorage.getItem(key);
  }

  write(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
