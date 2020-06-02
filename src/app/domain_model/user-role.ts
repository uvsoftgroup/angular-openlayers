export class UserRole {
  public userRoleId: number;
  public userRefNrId: number;
  public userRoleName: string;
  public userRoleType: string;
  public userRoleDate: Date;
  public userRoleMDate: Date;
  public userRemark: string;

 public constructor(json: any) {
    this.userRoleId = json.userRoleId;
    this.userRefNrId = json.userRefNrId;
    this.userRoleName = json.userRoleName;
    this.userRoleType = json.userRoleType;
    this.userRoleDate = json.userRoleDate;
    this.userRoleMDate = json.userRoleMDate;
    this.userRemark = json.userRemark;
}


}
