import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './panelsdemo.component.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
            margin-left: .25em;
        }

        :host ::ng-deep .ui-splitbutton button {
            margin-right: 0;
        }`
    ]
})
export class PanelsDemoComponent implements OnInit {

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
            { label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming'] }
        ];
    }
}
