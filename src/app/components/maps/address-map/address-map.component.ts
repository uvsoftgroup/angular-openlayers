import { Component, OnInit } from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate';
import Style from 'ol/style/Style';
import { Fill, Stroke, Text, Circle } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import 'ol/ol.css';

declare const $: any;
// Declare ol variable globally
declare const ol: any;


@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.scss']
})
export class AddressMapComponent implements OnInit {
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
  public AddressInfo: any;



  public ngOnInit() {
    console.log('--------------ngOnInit()');
    const coord = [90.37126734852791, 23.825515115835344];
    const out = toStringHDMS(coord);
    console.log('--------------out:' + out);
    this.drawModifyVectorFeature();
  }

  /**
   * Load Map from OSM directly and features services
   */
  public drawModifyVectorFeature() {
    console.log('--------------osmMapDynamicDataView()');

    let content, coordinate, hdms, overlay, container, closer, mousePositionControl;

    // Mouse Position Control from click event into Map
    mousePositionControl = new ol.control.MousePosition({
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

    container = document.getElementById('popup');
    content = document.getElementById('popup-content');
    closer = document.getElementById('popup-closer');

    /**
 * Create an overlay to anchor the popup to the map.
 */
    overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map.addOverlay(overlay);

    /**
      * Defining the Polygon Layer style
      *
      */
    const styleAddress = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgba(0, 255,0,0.2 )' })
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinateMouse = feature.getGeometry().getCoordinates()[0];
          return new ol.geom.MultiPoint(coordinateMouse);
        }
      })
    ];


    /**
     * Registered Address info from REST APIs call
     *
     */
    // Polygon Geometry Coordinate Points
    let i, rv, featurePolygonAddress, coordinatesAddress, vectorSourceAddress, vectorLayerAddress;
    for (i = 0; i <= 10; i++) {
      rv = Math.random();
      console.log('--------------randomValuePerIteration:' + rv);
      coordinatesAddress = [[
        [90.36596433 - 0.001 * rv, 23.82865066 - 0.001 * rv],
        [90.36605754 - 0.001 * rv, 23.82865741 - 0.001 * rv],
        [90.36607095 - 0.001 * rv, 23.82852185 - 0.001 * rv],
        [90.36597506 - 0.001 * rv, 23.828551265 - 0.001 * rv],
        [90.36596433 - 0.001 * rv, 23.82865066 - 0.001 * rv]
      ]];
      // Form the polygon feature geometry with respective properties.
      featurePolygonAddress = new ol.Feature({
        type: 'click',
        geometry: new ol.geom.Polygon(coordinatesAddress),
        addressInfo: { adId: 100000, userRefNrId: 20000 }
      });

      // Transform Coordinates Points
      featurePolygonAddress.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      // generate vector source with polygon feature
      vectorSourceAddress = new ol.source.Vector({
        features: [featurePolygonAddress]
      });

      // define a vector layer with the vector source
      vectorLayerAddress = new ol.layer.Vector({
        source: vectorSourceAddress,
        style: styleAddress
      });
      // finally add the vector layer into the map
      this.map.addLayer(vectorLayerAddress);
    }


    // Map click event popup
    function onClick(args) {
      console.log(args.coordinate);
      const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      const lon = lonlat[0];
      const lat = lonlat[1];
      const polyGeom = featurePolygonAddress.getGeometry().getExtent();
      const center = toStringHDMS(ol.extent.getCenter(polyGeom));
      // we can get the closest feature from the source
      const feature = vectorLayerAddress.getSource().getClosestFeatureToCoordinate(polyGeom);
      // to compute the area of a feature, we need to get it's geometry and do
      // something a little different depeneding on the geometry type.
      const geometry = feature.getGeometry();
      const type = geometry.getType();
      const area = geometry.getArea();
      const objectInfo = 'Address Id:' + feature.getProperties().addressInfo.adId + 'Address Id:'
        + feature.getProperties().addressInfo.userRefNrId;
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
      const text = '';
      document.getElementById('objectInfo').innerHTML = text;
      alert('Address Id:' + feature.getProperties().addressInfo.adId + 'Address Reference Number:'
        + feature.getProperties().addressInfo.userRefNrId);
      //  overlay.show(feature.getProperties().addressInfo.adId);
    }

    this.map.on('click', onClick);

    /*
    this.map.on('click', function (evt) {
      let f = this.map.forEachFeatureAtPixel(
        evt.pixel,
        function (ft, layer) { return ft; }
      );
      if (f && f.get('type') === 'click') {
        let geometry = f.getGeometry();
        let coord = geometry.getCoordinates();

        let content = '<p>' + f.get('addressInfo') + '</p>';

        overlay.show(coord, content);

      } else { overlay.hide(); }

    });
    this.map.on('pointermove', function (e) {
      if (e.dragging) { overlay.hide(); return; }

      let pixel = this.map.getEventPixel(e.originalEvent);
      let hit = this.map.hasFeatureAtPixel(pixel);

      this.map.getTarget().style.cursor = hit ? 'pointer' : '';
    });
*/

  }

}

