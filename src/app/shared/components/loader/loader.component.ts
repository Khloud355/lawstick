import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  constructor(private loader: LoaderService) {}

  loading$ = this.loader.loading$;
}
