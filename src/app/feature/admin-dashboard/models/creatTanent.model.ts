export interface CreateTenantDto {
  name: string;
  administrationFullName: string;
  administratorEmail: string;
  mobileNumber: string;
  logoUrl: string;
  deactivationDate: string;
  plan: string;
}
