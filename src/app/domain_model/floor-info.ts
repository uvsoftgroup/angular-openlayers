import { GeometryGisData } from './geometry-gis-data';

export class FloorInfo {
  public flId: number;
  public flBuId: number;
  public userRefNrId: number;
  public flCode: string;
  public flName: string;
  public flUseType: string;
  public flNumberOfFloorUnit: number;
  public flTotalFloorArea: number;
  public flTotalFloorHeight: number;
  public flCenterLongitude: number;
  public flCenterLatitude: number;
  public flLayoutPicture: Uint8Array;
  public flUtilityPicture: Uint8Array;
  public flRemark: string;

  public constructor(json: any) {
    this.flId = json.flId;
    this.flBuId = json.flBuId;
    this.userRefNrId = json.userRefNrId;
    this.flCode = json.flCode;
    this.flName = json.flName;
    this.flUseType = json.flUseType;
    this.flNumberOfFloorUnit = json.flNumberOfFloorUnit;
    this.flTotalFloorArea = json.flTotalFloorArea;
    this.flTotalFloorHeight = json.flTotalFloorHeight;
    this.flCenterLongitude = json.flCenterLongitude;
    this.flCenterLatitude = json.flCenterLatitude;
    this.flLayoutPicture = json.flLayoutPicture;
    this.flUtilityPicture = json.flUtilityPicture;
    this.flRemark = json.flRemark;
  }

}
