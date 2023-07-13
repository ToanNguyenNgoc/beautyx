import { IOrganization } from "interface/organization";

export interface OrganizationApprove {
  id: number;
  type: string;
  approvable_type: string;
  approvable_id: number;
  organization_id: number;
  created_at: string;
  updated_at: string;
  organization: IOrganization
}