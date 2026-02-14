import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../models/tenant.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private tanentsService: AdminDashboardService,
  ) {}
  minDate!: string;
  isEditMode = false;
  selectedTenantId: number | null = null;
  selectedTenant!: Tenant;
  activationDate = '';
  plans = ['Basic', 'Pro', 'Enterprise'];
  tenants: Tenant[] = [];
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  showFilter = false;
  isNoData: boolean = false;

  ngOnInit(): void {
    this.getAllTanents();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  filterForm = this.fb.group({
    active: [''],
    tenantName: [''],
    administrationName: [''],
    deactivateDateFrom: [''],
    deactivateDateTo: [''],
  });

  applyFilters() {
    this.currentPage = 0;
    this.getAllTanents(this.filterForm.value);
  }

  resetFilters() {
    this.filterForm.reset();
    this.showFilter = false;
    this.getAllTanents();
  }
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    administrationFullName: ['', Validators.required],
    administratorEmail: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required],
    logoUrl: [''],
    deactivationDate: [''],
    plan: ['', Validators.required],
  });

  getAllTanents(filter?: any) {
    this.isNoData = false;
    this.tanentsService
      .getAllTanents(this.currentPage, this.pageSize, filter)
      .subscribe((res) => {
        if (res.content.length == 0) {
          this.isNoData = true;
        } else {
          this.tenants = res.content ?? res;
          this.totalPages = res.totalPages;
          this.totalElements = res.totalElements;
        }
      });
  }
  changePage(page: number) {
    this.currentPage = page;
    this.getAllTanents();
  }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ logoUrl: '' });
    }
  }

  submit() {
    const formData = this.form.getRawValue();

    if (this.isEditMode && this.selectedTenantId) {
      // 🔵 UPDATE
      this.tanentsService
        .updateTenant(this.selectedTenantId, formData)
        .subscribe({
          next: () => {
            this.getAllTanents();
            this.isEditMode = false;
            this.form.reset();
          },
        });
    } else {
      // 🟢 CREATE
      this.tanentsService.createNewTanent(formData).subscribe({
        next: () => {
          this.getAllTanents();
          this.form.reset();
        },
      });
    }
  }

  resetForm() {
    this.form.reset();
    this.isEditMode = false;
    this.selectedTenantId = null;
  }
  onToggleActivation(tenant: Tenant, event: any) {
    // لو كان Active وعايز deactivate
    if (tenant.active) {
      tenant.active = false;
      tenant.deactivationDate = undefined;
      tenant.showDateInput = false;
      return;
    }

    // لو كان Inactive وعايز Activate
    event.target.checked = false; // ما نفعّلوش دلوقتي
    tenant.showDateInput = true; // نطلع input
  }
  onDateSelected(tenant: Tenant, event: any) {
    const date = event.target.value;

    if (!date) return;

    tenant.deactivationDate = date;
    tenant.active = true;
    tenant.showDateInput = false;
  }
  editTenant(tenant: Tenant) {
    this.isEditMode = true;
    this.selectedTenantId = tenant.id;

    this.form.patchValue({
      name: tenant.name,
      administrationFullName: tenant.administrationFullName,
      administratorEmail: tenant.administratorEmail,
      mobileNumber: tenant.mobileNumber,
      logoUrl: tenant.logoUrl,
      deactivationDate: tenant.deactivationDate,
      plan: tenant.plan,
    });
  }
}
