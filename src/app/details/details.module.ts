import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { DetailsComponent } from './details.component';
import { DetailsComponentRoutingModule } from './details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsComponentRoutingModule,
  ],
  declarations: [DetailsComponent],
})
export class HomePageModule {}
