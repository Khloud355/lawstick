import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis } from 'ng-apexcharts';
@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.scss',
})
export class AreaChartComponent {
  stats = [
    { title: 'إجمالي المستأجرين', value: 120 },
    { title: 'نشط', value: 95 },
    { title: 'غير نشط', value: 25 },
  ];

  series: ApexAxisChartSeries = [
    {
      name: 'عدد المستأجرين',
      data: [20, 40, 35, 50, 49, 60],
    },
  ];

  chart: ApexChart = {
    type: 'area',
    height: 300,
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
  };

  xaxis: ApexXAxis = {
    categories: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    labels: {
      style: {
        fontFamily: 'Cairo',
      },
    },
  };

  yaxis: ApexYAxis = {
    labels: {
      formatter: (val: number) => val.toLocaleString('ar-EG'),
    },
  };

  tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => val.toLocaleString('ar-EG') + ' مستأجر',
    },
  };

  dataLabels: ApexDataLabels = {
    enabled: false,
  };
}
