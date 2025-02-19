import { NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink],
  template: `
    <header class="bg-white dark:bg-black">
      <nav>
        <div class="flex flex-wrap justify-between items-center mx-auto">
          <a routerLink="/dashboard" class="text-gray-900 dark:text-white">Sharkbox</a>
          <div class="flex">
            <button *ngIf="!isAuthenticated" class="cursor-pointer text-black dark:text-white" (click)="login()">Login</button>
            <button *ngIf="isAuthenticated" class="cursor-pointer text-black dark:text-white" (click)="logout()">Logout</button>
          </div>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  isAuthenticated = false;

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        console.warn('authenticated: ', isAuthenticated);
      }
    );
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService
      .logoffAndRevokeTokens()
      .subscribe();
  }
}
