import { Component, OnInit } from '@angular/core';
import { caseType } from '../../models/caseType.modal';
import { CommonModule } from '@angular/common';
import {
  Form,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { CreateCaseTypeDto } from '../../models/createNewCase.modal';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
})
export class SettingComponent implements OnInit {
  totalElements: any;
  isEditMode = false;
  selectedCaseTypeId: number | null = null;
  constructor(
    private fb: FormBuilder,
    private adminDashboardService: AdminDashboardService,
  ) {}
  currentPage = 0;
  pageSize = 9;
  totalPages = 0;
  caseTypeForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  typeOfCases: caseType[] = [];

  ngOnInit(): void {
    this.getAllCases();
  }
  AddNewCase() {}

  submit() {
    const formData = this.caseTypeForm.getRawValue();

    if (this.isEditMode && this.selectedCaseTypeId) {
      this.adminDashboardService
        .updateCaseType(this.selectedCaseTypeId, formData)
        .subscribe({
          next: () => {
            this.getAllCases();
            this.isEditMode = false;
            this.caseTypeForm.reset();
          },
        });
    } else {
      this.adminDashboardService
        .createNewCaseType(formData as CreateCaseTypeDto)
        .subscribe({
          next: () => {
            this.getAllCases();
            this.caseTypeForm.reset();
          },
        });
    }
  }
  resetForm() {}
  getAllCases(filter?: any) {
    this.adminDashboardService
      .getAllCases(this.currentPage, this.pageSize, filter)
      .subscribe((res) => {
        console.log(res, 'respo');
        this.typeOfCases = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
      });
  }
  changePage(page: number) {
    this.currentPage = page;
    this.getAllCases();
  }
  editcaseType(caseType: caseType) {
    this.isEditMode = true;
    this.selectedCaseTypeId = caseType.id;

    this.caseTypeForm.patchValue({
      name: caseType.name,
    });
  }
  deleteCaseType(id: number) {
    this.adminDashboardService.deleteCaseType(id).subscribe((res) => {
      this.getAllCases();
    });
  }
  toggleStatus(caseItem: any) {
    const newStatus = !caseItem.active;

    this.deleteCaseType(caseItem.id);
  }
}
