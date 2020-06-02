import { UserRole } from './user-role';

export class UserRegistration {
  public userRegistrationId: number;
  public userAddressId: number;
  public userRegistrationFName: string;
  public userRegistrationMName: string;
  public userRegistrationLName: string;
  public userRegistrationName: string;
  public userRegistrationPassword: string;
  public userRegistrationfullName: string;
  public userRegistrationCrDate: Date;
  public userRegistrationLDate: Date;
  public userMail: string;
  public userPhoneNr: string;
  public userMobileNr: string;
  public userWww: string;
  public userRoles: UserRole[] = [];

  public constructor(json: any) {
    this.userRegistrationId = json.userRegistrationId;
    this.userAddressId = json.userAddressId;
    this.userRegistrationFName = json.userRegistrationFName;
    this.userRegistrationMName = json.userRegistrationMName;
    this.userRegistrationLName = json.userRegistrationLName;
    this.userRegistrationName = json.userRegistrationName;
    this.userRegistrationPassword = json.userRegistrationPassword;
    this.userRegistrationfullName = json.userRegistrationfullName;
    this.userRegistrationCrDate = json.userRegistrationCrDate;
    this.userRegistrationLDate = json.userRegistrationLDate;
    this.userMail = json.userMail;
    this.userPhoneNr = json.userPhoneNr;
    this.userMobileNr = json.userMobileNr;
    this.userWww = json.userWww;
    this.userRoles = json.userRoles;

  }
}
