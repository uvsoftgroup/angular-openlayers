import { Component, OnInit, ViewChild } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, toLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import { Fill, Stroke, Text, Circle } from 'ol/style';
import GeometryType from 'ol/geom/GeometryType';
import Icon from 'ol/style/Icon';
import Vector from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj/Projection';
import { addCoordinateTransforms } from 'ol/proj';
import * as olProj from 'ol/proj';
import { transform } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import 'ol/ol.css';
import RenderFeature from 'ol/render/Feature';
import { PlotInfo } from 'src/app/domain_model/plot-info';


declare const $: any;
// Declare ol variable globally
declare const ol: any;


@Component({
  selector: 'app-floor-map',
  templateUrl: './floor-map.component.html',
  styleUrls: ['./floor-map.component.scss']
})
export class FloorMapComponent implements OnInit {
  // declare a map as a class member variable of type any
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  marker: Overlay;
  latitude = 23.825515115835344;
  longitude = 90.37126734852791;
  coordGPSSystem: any = 'EPSG:4326';
  coordOSMSystem: any = 'EPSG:3857';
  public plotInfo: any;

  public ngOnInit() {
    console.log('--------------ngOnInit()');
    const coord = [90.37126734852791, 23.825515115835344];
    const out = toStringHDMS(coord);
    console.log('--------------out:' + out);
    // this.osmTileMap();
    this.osmMapDynamicDataView();
  }

  /**
   * Load Map from OSM directly and features services
   */
  public osmMapDynamicDataView() {
    console.log('--------------osmMapDynamicDataView()');

    // Mouse Position Control from click event into Map
    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(8),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    // General and Standard Map loading
    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),

      // OpenStreet Map Loading
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      // Map view, center location and zoom level
      view: new ol.View({
        center: ol.proj.fromLonLat([90.3717065602541, 23.82585617006994]),
        zoom: 13
      })
    });

    const style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3
        })
      })
    });

    const highlightStyle = new Style({
      stroke: new Stroke({
        color: '#f00',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.1)'
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#f00',
          width: 3
        })
      })
    });

    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: this.map,
      style: function (feature) {
        highlightStyle.getText().setText(feature.get('id'));
        return highlightStyle;
      }
    });

    /**
      * Defining the Polygon Layer style
      *
      */
    const styleFloor = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgba(0, 207, 0, 0.1 )' })
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinate = feature.getGeometry().getCoordinates()[0];
          return new ol.geom.MultiPoint(coordinate);
        }
      })
    ];


    /**
    * Polygon geometry for User Address, Plot, Building, Floor and Unit Registration
    *
    */
    // Polygon Geometry Coordinate Points
    let i, rv, featurePolygonFloor, coordinatesFloor, vectorSourceFloor, vectorLayerFloor;
    for (i = 1; i <= 10; i++) {
      rv = Math.random();
      coordinatesFloor = [[
        [90.36640086 + 0.001 * rv, 23.82761702 + 0.001 * rv],
        [90.36649858 + 0.001 * rv, 23.82763242 + 0.001 * rv],
        [90.36651601 + 0.001 * rv, 23.82749901 + 0.001 * rv],
        [90.36641059 + 0.001 * rv, 23.82748422 + 0.001 * rv],
        [90.36640086 + 0.001 * rv, 23.82761702 + 0.001 * rv]
      ]];
      // Form the polygon feature geometry with respective properties.
      featurePolygonFloor = new ol.Feature({
        geometry: new ol.geom.Polygon(coordinatesFloor),
        floorInfo: {
          flId: 500000, flBuId: 500001, userRefNrId: 500000, flCode: 'DHK-5001',
          flName: 'DHKPA-5001', flUseType: 'Commercial', flNumberOfFloorUnit: 7, flTotalFloorArea: 15,
          flTotalFloorHeight: 20, flCenterLongitude: 90.567, flCenterLatitude: 23.56 ,
          flLayoutPicture: 'image', flUtilityPicture: 'image',plRemark: 'Govt. COM Usages'
        }
      });
      // Transform Coordinates Points
      featurePolygonFloor.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      // generate vector source with polygon feature
      vectorSourceFloor = new ol.source.Vector({
        features: [featurePolygonFloor]
      });

      // define a vector layer with the vector source
      vectorLayerFloor = new ol.layer.Vector({
        source: vectorSourceFloor,
        style: styleFloor
      });
      // finally add the vector layer into the map
      this.map.addLayer(vectorLayerFloor);
    }
    // Map click event popup
    function onClick(args) {
      console.log(args.coordinate);
      const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      const lon = lonlat[0];
      const lat = lonlat[1];
      const polyGeom = featurePolygonFloor.getGeometry().getExtent();
      const center = ol.extent.getCenter(polyGeom);
      // we can get the closest feature from the source
      const feature = vectorLayerFloor.getSource().getClosestFeatureToCoordinate(polyGeom);
      // to compute the area of a feature, we need to get it's geometry and do
      // something a little different depeneding on the geometry type.
      const geometry = feature.getGeometry();
      const type = geometry.getType();
      const area = geometry.getArea();
      const objectInfo = 'Plot Id:' + feature.getProperties().plotInfo.plId + 'Address Id:'
        + feature.getProperties().plotInfo.plAddressId
        + 'User Reference Id:' + feature.getProperties().plotInfo.userRefNrId + 'Area:' + area;
      console.log(objectInfo);

      switch (type) {
        case 'MultiPolygon':
          // for multi-polygons, we need to add the area of each polygon
          this.area = geometry.getPolygons().reduce(function (left, right) {
            return left + right.area;
          }, 0);
          break;
        case 'Polygon':
          // for polygons, we just get the area
          this.area = area;
          break;
        default:
          // no other geometry types have area as far as we are concerned
          this.area = 0;
      }
      this.area = area / 1000000;
      // display the country name and area now
      const text = '<h5>Registered Plot Info:</h5> <table  width="350"> <tr> <th>Content</th><th>Value</th></tr>'
        + '<tr><td>Plot Id</td>'
        + '<td>' + feature.getProperties().plotInfo.plId + '</td></tr>'

        + '<tr><td>Address Id</td>'
        + '<td>' + feature.getProperties().plotInfo.plAddressId + '</td></tr>'

        + '<tr><td>User Reference Id</td>'
        + '<td>' + feature.getProperties().plotInfo.userRefNrId + '</td></tr>'

        + '<tr><td>Plot Code</td>'
        + '<td>' + feature.getProperties().plotInfo.plCode + '</td></tr>'

        + '<tr><td>Name</td>'
        + '<td>' + feature.getProperties().plotInfo.plName + '</td></tr>'

        + '<tr><td>Type</td>'
        + '<td>' + feature.getProperties().plotInfo.plType + '</td></tr>'

        + '<tr><td>Number</td>'
        + '<td>' + feature.getProperties().plotInfo.plNumber + '</td></tr>'

        + '<tr><td>Monza Number</td>'
        + '<td>' + feature.getProperties().plotInfo.plMonzaNumber + '</td></tr>'

        + '<tr><td>CS Number</td>'
        + '<td>' + feature.getProperties().plotInfo.plCSNumber + '</td></tr>'

        + '<tr><td>MS Number</td>'
        + '<td>' + feature.getProperties().plotInfo.plMSNumber + '</td></tr>'

        + '<tr><td>Remark</td>'
        + '<td>' + feature.getProperties().plotInfo.plRemark + '</td></tr>'

        + '<tr><td>Total Plot Area[Sq.M]</td>'
        + '<td>' + feature.getProperties().plotInfo.plTotalArea + '</td></tr>'

        + '<tr><td>Building Cover Area[Sq.M]:</td>'
        + '<td>' + feature.getProperties().plotInfo.plTotalBuildingCoverArea + '</td></tr>'

        + '<tr><td>Number Of Building</td>'
        + '<td>' + feature.getProperties().plotInfo.plNumberOfBuilding + '</td></tr>'

        + '<tr><td>Height From MSL [M]</td>'
        + '<td>' + feature.getProperties().plotInfo.plHeightFromMSL + '</td></tr>'

        + '<tr><td><strong>Center Longitude </strong></td>'
        + '<td>' + lonlat[0] + '</td></tr>'

        + '<tr><td><strong>Center Latitude</strong></td>'
        + '<td>' + lonlat[1] + '</td></tr>'

        + '<tr><td>Layout or Plan</td>'
        + '<td><img src="assets/resources/layout.png" width="130" height="50"></td></tr>'

        + '<tr><td>Utility Location Map</td>'
        + '<td><img src="assets/resources/layout.png" width="130" height="50"></td></tr>'

        + '</table>';

      document.getElementById('objectInfo').innerHTML = text;

      //alert('Plot Id:' + feature.getProperties().plotInfo.plId + 'Geometry Type:' + type);
    }

    this.map.on('click', onClick);

    /* when the user moves the mouse, get the name property
     from each feature under the mouse and display it
     */
    /*
    function onMouseMove(browserEvent) {
      const coordinate = browserEvent.coordinate;
      const pixel = this.map.getPixelFromCoordinate(coordinate);
      console.log(browserEvent.coordinate);
      const el = document.getElementById('id');
      el.innerHTML = '';
      this.map.forEachFeatureAtPixel(pixel, function(feature) {
        el.innerHTML += feature.get('id') + '<br>';
      });
      console.log(el.innerHTML);
    }
    this.map.on('pointermove', onMouseMove);

    const highlight: any = '';
    const displayFeatureInfo = function(pixel) {
      const feature = pixel.map.forEachFeatureAtPixel(pixel, function(feature) {
        console.log('feature:' + feature);
        return feature;
      });
      const info = document.getElementById('info');
      console.log('Info:' + info);
      if (feature) {
        info.innerHTML = feature.getId() + ': ' + feature.get('name');
      } else {
        info.innerHTML = '&nbsp;';
      }
      if (feature !== highlight) {
        if (highlight) {
          featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
          featureOverlay.getSource().addFeature(feature);
        }
        this.highlight = feature;
      }
    };

    this.map.on('pointermove', function(evt) {
      if (evt.dragging) {
        return;
      }
      const pixel = evt.map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });

    this.map.on('click', function(evt) {
      displayFeatureInfo(evt.pixel);
    });
   */

  }

  // dymanic map center definition
  public setCenter(longitude: number, latitude: number) {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([longitude, latitude]));
    view.setZoom(13);
  }

}
