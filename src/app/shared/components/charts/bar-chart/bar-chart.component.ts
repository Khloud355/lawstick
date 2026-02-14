import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis } from 'ng-apexcharts';
@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
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
    type: 'bar',
    height: 300,
    defaultLocale: 'ar',
    locales: [
      {
        name: 'ar',
        options: {
          months: [
            'يناير',
            'فبراير',
            'مارس',
            'أبريل',
            'مايو',
            'يونيو',
            'يوليو',
            'أغسطس',
            'سبتمبر',
            'أكتوبر',
            'نوفمبر',
            'ديسمبر',
          ],
          shortMonths: [
            'ينا',
            'فبر',
            'مار',
            'أبر',
            'ماي',
            'يون',
            'يول',
            'أغس',
            'سبت',
            'أكت',
            'نوف',
            'ديس',
          ],
          days: [
            'الأحد',
            'الاثنين',
            'الثلاثاء',
            'الأربعاء',
            'الخميس',
            'الجمعة',
            'السبت',
          ],
          shortDays: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
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
      formatter: (val: number) => {
        return val.toLocaleString('ar-EG');
      },
    },
  };

  tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => {
        return val.toLocaleString('ar-EG') + ' مستأجر';
      },
    },
  };

  plotOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 6,
      columnWidth: '45%',
    },
  };
}
