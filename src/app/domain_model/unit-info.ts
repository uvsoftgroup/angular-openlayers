import { GeometryGisData } from './geometry-gis-data';

export class UnitInfo {

  public unId: number;
  public unflId: number;
  public userRefNrId: number;
  public unCode: string;
  public unName: string;
  public unUseType: string;
  public unNumberOfFloorUnit: number;
  public unTotalUnitArea: number;
  public unTotalHeight: number;
  public unCenterLongitude: number;
  public unCenterLatitude: number;
  public unLayoutPicture: Uint8Array;
  public unUtilityPicture: Uint8Array;
  public unRemark: string;

  public constructor(json: any) {
    this.unId = json.unId;
    this.unflId = json.unflId;
    this.userRefNrId = json.userRefNrId;
    this.unCode = json.unCode;
    this.unName = json.unName;
    this.unUseType = json.unUseType;
    this.unNumberOfFloorUnit = json.unNumberOfFloorUnit;
    this.unTotalUnitArea = json.unTotalUnitArea;
    this.unTotalHeight = json.unTotalHeight;
    this.unCenterLongitude = json.unCenterLongitude;
    this.unCenterLatitude = json.unCenterLatitude;
    this.unLayoutPicture = json.unLayoutPicture;
    this.unUtilityPicture = json.unUtilityPicture;
    this.unRemark = json.unRemark;
  }

}
