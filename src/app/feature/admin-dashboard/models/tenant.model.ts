export interface Tenant {
  id: number;
  name: string;
  administrationFullName?: string;
  administratorEmail?: string;
  mobileNumber?: string;
  logoUrl?: string;
  deactivationDate?: string;
  plan: string;
  active: boolean;
  showDateInput?: boolean;
}
