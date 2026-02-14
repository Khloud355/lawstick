import { Component } from '@angular/core';
import { LineChartComponent } from '../../../../shared/components/charts/line-chart/line-chart.component';
import { BarChartComponent } from '../../../../shared/components/charts/bar-chart/bar-chart.component';
import { PieChartsComponent } from '../../../../shared/components/charts/pie-charts/pie-charts.component';
import { AreaChartComponent } from '../../../../shared/components/charts/area-chart/area-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LineChartComponent,
    BarChartComponent,
    PieChartsComponent,
    AreaChartComponent,
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
