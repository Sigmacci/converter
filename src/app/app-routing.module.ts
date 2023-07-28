import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: '', component: ConverterComponent},
  {
    path: '',
    children: [
      { path: 'charts', component: ChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
