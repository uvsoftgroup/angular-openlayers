import { GeometryGisData } from './geometry-gis-data';

export class AddressInfo {

  public adId: number;
  public userRefNrId: number;
  public geometryGisData: GeometryGisData;

  public constructor(json: any) {
    this.adId = json.adId;
    this.userRefNrId = json.userRefNrId;
    this.geometryGisData = json.geometryGisData;
  }

}
