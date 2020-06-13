import { Component, OnInit, ViewChild } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat, toLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate';
import Style from 'ol/style/Style';
import { Fill, Stroke, Text, Circle } from 'ol/style';
import Icon from 'ol/style/Icon';
import { transform } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import 'ol/ol.css';

declare const $: any;
// Declare ol variable globally
declare const ol: any;

export interface MapInfo {
  id: number;
  name: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
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
    * Load Map from OSM Tile
    */
  public osmTileMap() {
    console.log('--------------osmTileMap()');
    const COORD_SYSTEM_GPS = 'EPSG:4326'; // GPS (long/lat) coordinate system
    const COORD_SYSTEM_OSM = 'EPSG:3857'; // SphericalMercatorCoords - Google and
    // OSM's coordinate system
    // set map view center
    const centerCoordinate = [90.37126734852791, 23.825515115835344];

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat(centerCoordinate),
      zoom: 13
    });

    // add point style
    const pointStyle = new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg'
      })
    });

    // add point into the map
    const coordinate = [90.38675308227536, 23.708273785712564];
    const vectorPoint = new ol.Vector({
      source: new ol.layer.Vector({
        features: [new ol.Feature({
          geometry: new ol.Point(transform(coordinate, COORD_SYSTEM_GPS, COORD_SYSTEM_OSM)),
        })]
      }),
      style: pointStyle
    });
    this.map.addLayer(vectorPoint);
    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });

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
      target: document.getElementById('mouse-position')

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
    const styles = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgba(199, 207, 199 )' })
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinates = feature.getGeometry().getCoordinates()[0];
          return new ol.geom.MultiPoint(coordinates);
        }
      })
    ];

    /**
    * Polygon geometry for User Address, Plot, Building, Floor and Unit Registration
    *
    */

    const coordinates5 = [[
      [90.3717065602541, 23.82585617006994],
      [90.37177965044975, 23.82586782478512],
      [90.37179842591286, 23.82573256868382],
      [90.37172567099331, 23.82572306087998],
      [90.3717065602541, 23.82585617006994]
    ]];

    const featurePolygon5 = new ol.Feature({
      geometry: new ol.geom.Polygon(coordinates5),
      mapInfo: { id: 100, name: 'Test' }

    });

    featurePolygon5.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const vectorSource5 = new ol.source.Vector({
      features: [featurePolygon5]

    });
    const vectorLayer5 = new ol.layer.Vector({
      source: vectorSource5,
      style: styles

    });

   //  this.map.addLayer(vectorLayer5);

    const coordinates4 = [[
      [90.3717950731516, 23.82586659797306],
      [90.37188693881036, 23.825753117805803],
      [90.37181317806244, 23.82574268989356],
      [90.37186816334726, 23.82587733257833],
      [90.3717950731516, 23.82586659797306]
    ]];


    const featurePolygon4 = new ol.Feature({
      geometry: new ol.geom.Polygon(coordinates4),
      mapInfo: { id: 100, name: 'Test' }

    });
    featurePolygon4.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const vectorSource4 = new ol.source.Vector({
      features: [featurePolygon4]
    });
    const vectorLayer4 = new ol.layer.Vector({
      source: vectorSource4,
      style: styles
    });
    // this.map.addLayer(vectorLayer4);


    const coordinates3 = [[
      [90.37188895046708, 23.825883773341076],
      [90.37195265293118, 23.82589420124198],
      [90.37197209894654, 23.8257776540666],
      [90.37190839648244, 23.82576967978234],
      [90.37188895046708, 23.825883773341076]
    ]];

    const featurePolygon3 = new ol.Feature({
      geometry: new ol.geom.Polygon(coordinates3),
      mapInfo: { id: 100, name: 'Test' }
    });
    featurePolygon3.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const vectorSource3 = new ol.source.Vector({
      features: [featurePolygon3]
    });
    const vectorLayer3 = new ol.layer.Vector({
      source: vectorSource3,
      style: styles
    });
    // this.map.addLayer(vectorLayer3);


    const coordinates2 = [[
      [90.3712110221386, 23.825792989227224],
      [90.37131562829016, 23.825800963510048],
      [90.37132300436497, 23.825673681629667],
      [90.37121873348951, 23.82566724085649],
      [90.3712110221386, 23.825792989227224]
    ]];

    const featurePolygon2 = new ol.Feature({
      geometry: new ol.geom.Polygon(coordinates2),
      mapInfo: { id: 100, name: 'Test' }
    });

    featurePolygon2.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const vectorSource2 = new ol.source.Vector({
      features: [featurePolygon2]
    });
    const vectorLayer2 = new ol.layer.Vector({
      source: vectorSource2,
      style: styles
    });
     // this.map.addLayer(vectorLayer2);

    const coordinates1 = [[
      [90.37116475403307, 23.825633503467998],
      [90.37126835435627, 23.825649452052744],
      [90.37129517644641, 23.825505301311722],
      [90.37119258195159, 23.82548965941315],
      [90.37116475403307, 23.825633503467998]
    ]];

    const featurePolygon1 = new ol.Feature({
      geometry: new ol.geom.Polygon(coordinates1),
      mapInfo: { id: 100, name: 'Test' }
    });

    featurePolygon1.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const vectorSource1 = new ol.source.Vector({
      features: [featurePolygon1]
    });
    const vectorLayer1 = new ol.layer.Vector({
      source: vectorSource1,
      style: styles
    });
     // this.map.addLayer(vectorLayer1);

    // Polygon Geometry Coordinate Points
    const coordinates = [[
      [90.37201568484306, 23.825948180950903],
      [90.37225909531116, 23.82596780993039],
      [90.37229865789412, 23.82579728307188],
      [90.3720411658287, 23.825754344618957],
      [90.37201568484306, 23.825948180950903]
    ]];
    // Form the polygon feature geometry with respective properties.
    const featurePolygon = new ol.Feature({
      geometry: new ol.geom.Polygon(coordinates),
      plotInfo: {
        plId: 100000, plAddressId: '200001', userRefNrId: 300000, plCode: 'DHK-1001',
        plName: 'DHKPA 1001', plType: 'Commercial', plNumber: 'DHK700', plMonzaNumber: 'DHKM1001',
        plCSNumber: 'DHKCS2001', plMSNumber: 'DHKMS3001', plRemark: 'Govt. COM Usages', plTotalArea: 500,
        plTotalBuildingCoverArea: 250, plNumberOfBuilding: 1, plHeightFromMSL: 1.75
      }
    });
    // Transform Coordinates Points
    featurePolygon.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    // generate vector source with polygon feature
    const vectorSource = new ol.source.Vector({
      features: [featurePolygon]
    });

    // define a vector layer with the vector source
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: styles
    });
    // finally add the vector layer into the map
   // this.map.addLayer(vectorLayer);

    // Map click event popup
    function onClick(args) {
      console.log(args.coordinate);
      const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      const lon = lonlat[0];
      const lat = lonlat[1];
      const polyGeom = featurePolygon.getGeometry().getExtent();
      const center = ol.extent.getCenter(polyGeom);
      // we can get the closest feature from the source
      const feature = vectorLayer.getSource().getClosestFeatureToCoordinate(polyGeom);
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

      alert('Plot Id:' + feature.getProperties().plotInfo.plId + 'Geometry Type:' + type);
    }

    this.map.on('click', onClick);

    /* when the user moves the mouse, get the name property
     from each feature under the mouse and display it
     */

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

  }

  // dymanic map center definition
  public setCenter(longitude: number, latitude: number) {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([longitude, latitude]));
    view.setZoom(13);
  }

}

