import { GeometryGisInfo } from './geometry-gis-info';
import { BuildingInfo } from './building-info';

export class PlotInfo {
  public plId: number;
  public plAddressId: number;
  public userRefNrId: number;
  public plCode: string;
  public plName: string;
  public plType: string;
  public plNumber: string;
  public plMonzaNumber: string;
  public plCSNumber: string;
  public plMSNumber: string;
  public plRemark: string;
  public plTotalArea: number;
  public plTotalBuildingCoverArea: number;
  public plNumberOfBuilding: number;
  public plHeightFromMSL: number;
  public plCenterLongitude: number;
  public plCenterLatitude: number;
  public plLayoutPicture: Uint8Array;
  public utilityLocationMap: Uint8Array;

  public constructor(json: any) {
   this.plId = json.plId;
   this.plAddressId = json.plAddressId;
   this.plCode = json.plCode;
   this.userRefNrId = json.userRefNrId;
   this.plName = json.plName;
   this.plType = json.plType;
   this.plNumber = json.plNumber;
   this.plMSNumber = json.plMSNumber;
   this.plRemark = json.plRemark;
   this.plRemark = json.plRemark;
   this.plTotalArea = json.plTotalArea;
   this.plTotalBuildingCoverArea = json.plTotalBuildingCoverArea;
   this.plNumberOfBuilding = json.plNumberOfBuilding;
   this.plHeightFromMSL = json.plHeightFromMSL;
   this.plNumberOfBuilding = json.plNumberOfBuilding;
   this.plCenterLongitude = json.plCenterLongitude;
   this.plCenterLatitude = json.plCenterLatitude;
   this.utilityLocationMap = json.utilityLocationMap;

  }

}
