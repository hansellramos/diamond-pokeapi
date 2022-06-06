import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-blocks-ad',
  templateUrl: './app.blocks-ad.component.html',
})
export class BlocksAdComponent implements OnDestroy {

    visible: boolean = false;

    urls = ['productoverview', 'shop','checkout','editorder', 'pricing', 'about'];

    subscription: Subscription;

    constructor(private router: Router) {
        this.subscription = this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe(event => this.checkUrl(event.url))
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    checkUrl(url) {
        let length = this.urls.filter(u => url.includes(u)).length;
            
        if (length) {
            this.visible = true;
        } 
        else {
            this.visible = false;
        }
    }
}
