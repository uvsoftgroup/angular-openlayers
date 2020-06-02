export class GeometryGisData {
  public adRefId: number;
  public adType: string;
  public adCity: string;
  public adRoad: string;
  public adRoadType: string;
  public adHouseNumber: string;
  public adPostCode: string;
  public adCountry: string;
  public geoType: string;
  public wktToGeometry: string;

  public constructor(json: any) {
  this.adRefId = json.adRefId;
  this.adType = json.adType;
  this.adCity = json.adCity;
  this.adRoad = json.adRoad;
  this.adRoadType = json.adRoadType;
  this.adHouseNumber = json.adHouseNumber;
  this.adPostCode = json.adPostCode;
  this.adCountry = json.adCountry;
  this.geoType = json.geoType;
  this.wktToGeometry = json.wktToGeometry;
  }
}
