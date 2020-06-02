export class BuildingInfo {
  public buId: number;
  public buAddressId: number;
  public buPlId: number;
  public userRefNrId: number;
  public buCode: string;
  public buName: string;
  public buUseType: string;
  public buNumberOfFloor: number;
  public buTotalHeight: number;
  public buNumberOfFloorUnit: number;
  public buTotalGroundArea: number;
  public buTotalFloorArea: number;
  public buSetBackFront: number;
  public buSetBackBack: number;
  public buSetBackRight: number;
  public buSetBackLeft: number;
  public buCenterLongitude: number;
  public buCenterLatitude: number;
  public buLayoutPicture: Uint8Array;
  public buUtilityPicture: Uint8Array;
  public buRemark: string;

  public constructor(json: any) {
    this.buId = json.buId;
    this.buAddressId = json.buAddressId;
    this.buPlId = json. buPlId;
    this.userRefNrId = json.userRefNrId;
    this.buCode = json.buCode;
    this.buName = json.buName;
    this.buUseType = json.buUseType;
    this.buRemark = json.buRemark;
    this.buNumberOfFloor = json.buNumberOfFloor;
    this.userRefNrId = json.userRefNrId;
    this.buTotalHeight = json.buTotalHeight;
    this.buNumberOfFloorUnit = json.buNumberOfFloorUnit;
    this.buTotalGroundArea = json.buTotalGroundArea;
    this.buTotalFloorArea = json.buTotalFloorArea;
    this.buSetBackFront = json.buSetBackFront;
    this.buSetBackBack = json.buSetBackBack;
    this.buSetBackLeft = json.buSetBackLeft;
    this.buCenterLongitude = json.buCenterLongitude;
    this.buCenterLatitude = json.buCenterLatitude;
    this.buLayoutPicture = json.buLayoutPicture;
    this.buUtilityPicture = json.buUtilityPicture;
  }

}
