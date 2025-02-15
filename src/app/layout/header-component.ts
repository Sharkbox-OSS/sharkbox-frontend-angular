import { NgIf } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { MenubarModule } from "primeng/menubar";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink, MenubarModule, ButtonModule],
  template: `
    <header>
      <p-menubar>
        <ng-template #start>
          <p-button routerLink="/dashboard" label="Sharkbox" text plain />
        </ng-template>

        <ng-template #end>
          <p-button *ngIf="!isAuthenticated" (click)="login()" label="Login" size="small" severity="contrast" />
          <p-button *ngIf="isAuthenticated" (click)="logout()" label="Logout" size="small" severity="contrast" />
        </ng-template>
      </p-menubar>
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
