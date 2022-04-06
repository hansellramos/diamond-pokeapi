import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import {BreadcrumbService} from 'src/app/service/app.breadcrumb.service';

@Component({
    selector: 'app-wizard',
    templateUrl: './app.wizard.component.html',
    styles: [`
      :host ::ng-deep .p-steps-number {
        padding: 2rem 1.75rem;
        font-weight: 700;
        border:1px solid var(--surface-border) !important;
        background: var(--surface-card) !important;

      }

      :host ::ng-deep .p-menuitem-link-active .p-steps-number {
          background-color: var(--primary-color) !important;
          color: var(--surface-0) !important;
      }

      :host ::ng-deep .p-menuitem-link .p-steps-title {
          font-weight:700;
          color: var(--surface-600) !important;
      }

      :host ::ng-deep .p-menuitem-link-active .p-steps-title {
        color: var(--surface-900) !important;
        font-weight: 700 !important;
      }
    `]
})
export class AppWizardComponent implements OnInit {

    items: MenuItem[];

    activeIndex: number;

    constructor(private breadcrumbService: BreadcrumbService, private router: Router) {
      this.breadcrumbService.setItems([
          {label: 'Wizard'}
      ]);
  }

    ngOnInit(): void {
      this.items = [
        {label: 'Select', routerLink: 'select'},
        {label: 'Configure', routerLink: 'configure'},
        {label: 'Start', routerLink: 'start'}
      ];
      this.activeIndex = 0;
    }

    navigate(direction) {
      if (direction === 'next') {
        this.activeIndex = this.activeIndex + 1;
      } else {
        this.activeIndex = this.activeIndex - 1;
      }
      
      switch(this.activeIndex) {
        case 0:
          this.router.navigate(['pages/wizard/select']);
        break;
        case 1:
          this.router.navigate(['pages/wizard/configure']);
        break;
        case 2:
          this.router.navigate(['pages/wizard/start']);
        break;
      }
    }

}
