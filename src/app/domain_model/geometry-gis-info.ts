import { GeometryGisData } from './geometry-gis-data';

export class GeometryGisInfo {
  public  geoId: number;
  public geometryGisData: GeometryGisData ;

  public constructor(json: any) {
    this.geoId = json.geoId;
    this.geometryGisData = json.geometryGisData;
  }
}
