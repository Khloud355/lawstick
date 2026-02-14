import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Tenant } from '../models/tenant.model';
import { Observable } from 'rxjs';
import { CreateTenantDto } from '../models/creatTanent.model';
import { CreateCaseTypeDto } from '../models/createNewCase.modal';
import { caseType } from '../models/caseType.modal';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllTanents(page: number, size: number, filter?: any) {
    let params: any = {
      page,
      size,
    };

    if (filter) {
      if (filter.active !== '' && filter.active !== undefined) {
        params.active = filter.active;
      }

      if (filter.tenantName) {
        params.tenantName = filter.tenantName;
      }

      if (filter.administrationName) {
        params.administrationName = filter.administrationName;
      }

      if (filter.deactivateDateFrom) {
        params.deactivateDateFrom = filter.deactivateDateFrom;
      }

      if (filter.deactivateDateTo) {
        params.deactivateDateTo = filter.deactivateDateTo;
      }
    }

    return this.http.get<any>(`${this.baseUrl}/tenant`, { params });
  }

  createNewTanent(data: CreateTenantDto) {
    return this.http.post<Tenant>(`${this.baseUrl}/tenant`, data);
  }

  updateTenant(id: number, data: CreateTenantDto) {
    return this.http.patch<Tenant>(`${this.baseUrl}/tenant/${id}`, data);
  }

  getAllCases(page: number, size: number, filter?: any) {
    let params: any = {
      page,
      size,
    };
    return this.http.get<any>(`${this.baseUrl}/case-type`, { params });
  }

  createNewCaseType(data: CreateCaseTypeDto) {
    return this.http.post<caseType>(`${this.baseUrl}/case-type`, data);
  }

  updateCaseType(id: number, data: CreateCaseTypeDto) {
    return this.http.patch<caseType>(`${this.baseUrl}/case-type/${id}`, data);
  }
  deleteCaseType(id: number) {
    return this.http.delete<caseType>(`${this.baseUrl}/case-type/${id}`);
  }
}
