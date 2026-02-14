import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexTooltip,
  ApexDataLabels,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive?: ApexResponsive[];
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
};
@Component({
  selector: 'app-pie-charts',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './pie-charts.component.html',
  styleUrl: './pie-charts.component.scss',
})
export class PieChartsComponent {
  public chartOptions: ChartOptions = {
    series: [44, 55, 13, 33],

    chart: {
      type: 'pie',
      width: 380,
      defaultLocale: 'ar',
      locales: [
        {
          name: 'ar',
          options: {
            toolbar: {
              download: 'تحميل',
              selection: 'تحديد',
              zoomIn: 'تكبير',
              zoomOut: 'تصغير',
              pan: 'تحريك',
              reset: 'إعادة ضبط',
            },
          },
        },
      ],
    },

    labels: ['قضايا رابحة', 'قضايا خاسرة', 'قيد الانتظار', 'قيد التنفيذ'],

    legend: {
      position: 'right',
      horizontalAlign: 'right',
      fontFamily: 'Cairo',
    },

    tooltip: {
      y: {
        formatter: (val: number) => {
          return val.toLocaleString('ar-EG') + ' قضية';
        },
      },
    },

    dataLabels: {
      formatter: (val: number) => {
        return val.toLocaleString('ar-EG') + '%';
      },
    },

    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 300,
    //       },
    //       legend: {
    //         position: 'bottom',
    //       },
    //     },
    //   },
    // ],
  };
}
