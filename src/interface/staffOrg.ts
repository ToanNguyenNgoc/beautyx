export interface IStaffs {
  id: number;
  uid: number;
  staff_code: string;
  comment: string;
  deleted: number;
  booking_online: number;
  is_agency: number;
  uid_agency_id: string | null;
  is_active_agency: number;
  avatar: string | null | undefined;
  group_name: string[] | undefined;
  user: IStaffs_USER;
  bed: [];
}

export interface IStaffs_USER {
  id: number;
  fullname: string;
  sex: number;
  facebook: string;
  level_id: number | null;
  member_from: string | null;
  summary: string | number | null;
}