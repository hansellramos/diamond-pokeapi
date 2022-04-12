import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { MenuModule } from 'primeng/menu';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    MenuModule,
    DataViewModule,
    RatingModule,
    RippleModule
  ],
  declarations: [ShopComponent]
})
export class ShopModule { }
