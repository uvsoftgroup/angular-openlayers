import { Component, OnInit, Input } from '@angular/core';
import 'ol/ol.css';
import { defaults as defaultInteractions, Draw, Modify, Snap, Select } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import TileWMS from 'ol/source/TileWMS';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  defaults as defaultControls, ScaleLine, OverviewMap, LayerSwitcher,
  MousePosition, EditingToolbar, PanZoomBar, Navigation,
  KeyboardDefaults, SelectFeature, Control
} from 'ol/control';
import { ConfigserviceService } from 'src/app/services/geoserver/configservice.service';

declare const $: any;
// Declare ol variable globally
declare const ol: any;

@Component({
  selector: 'app-draw-modify-vector-feature',
  templateUrl: './draw-modify-vector-feature.component.html',
  styleUrls: ['./draw-modify-vector-feature.component.scss']
})
export class DrawModifyVectorFeatureComponent implements OnInit {

  coordGPSSystem: any = 'EPSG:4326';
  coordOSMSystem: any = 'EPSG:3857';
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  geometryTypes: any[];
  selectedValue: any;
  selectedValueForMap: any;
  form: FormGroup;
  baseurl: any;
  osmRoadsInBD: any;
  wmsRoadsLayer: any;
  osmBuildingsInBD: any;
  wmsBuildingLayer: any;
  mapScale: any;
  overviewMap: any ;
  overlayGroupOSM: any;
  private separator = '/';
  proxyConfigUrl: any;

  public constructor(private http: HttpClient, private configserviceService: ConfigserviceService) {
    this.baseurl = 'http://localhost:7777/geoserver/uvsoftgroupgeospatial/wms'; // geoservermapservice
    console.log('--------------this.baseurl:' + this.baseurl);
    console.log('--------------configserviceService.getGeoUrl():' + configserviceService.getGeoUrl());
  }

  public ngOnInit() {
    console.log('--------------ngOnInit()');
    this.geometryTypes = [
      { label: 'Point', value: 'Point' },
      { label: 'LineString', value: 'LineString' },
      { label: 'Polygon', value: 'Polygon' },
      { label: 'Circle', value: 'Circle' }
    ];
    this.drawModifyVectorFeature(90.37126734852791, 23.825515115835344);
  }

  public drawModifyVectorFeature(centerLocationLong: number, centerLocationLat: number) {
    console.log('--------------drawModifyVectorFeature()');
    // Mouse Position Control from click event into Map
    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(8),
      projection: this.coordGPSSystem,
    // comment the following two lines to have the mouse position be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    // base map from OSM
    const rasterOSM = new TileLayer({
      source: new OSM()
    });

    const source = new VectorSource({ wrapX: false });

    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'green'
        }),
        stroke: new Stroke({
          color: '#A52A2A',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#B8860B'
          })
        })
      })
    });

    const select = new Select({
      wrapX: false
    });

    const modify = new Modify({
      features: select.getFeatures(),
      source: source
    });

    /*
    Main Road network in Bangladesh from GeoFabrick/OSM datasets
    Dataset stored into PostGIS database and GeoServer configured and
    generate respective WMS  services.
    */
          // OSM Buildings in Bangladesh
          this.osmBuildingsInBD = new TileWMS({
            url: this.baseurl,
            params: { 'layers': 'uvsoftgroupgeospatial:osm_buildings_2', 'TILED': true },
            serverType: 'geoserver',
            transition: 0
          });

          this.wmsBuildingLayer = new TileLayer({
            source: this.osmBuildingsInBD
          });

 /*
    Complete Road network in Bangladesh from GeoFabrick/OSM datasets
    Dataset stored into PostGIS database and GeoServer configured and
    generate respective WMS  services.
    */
   this.osmRoadsInBD = new TileWMS({
    url: this.baseurl,
    params: { 'layers': 'uvsoftgroupgeospatial:roads', 'TILED': true },
    serverType: 'geoserver',
    transition: 0
  });
  this.wmsRoadsLayer = new TileLayer({
    source: this.osmRoadsInBD
  });

   // Create a group for overlays. Add the group to the map when it's created
    // but add the overlay layers later
    this.overlayGroupOSM = new ol.layer.Group({
      title: 'OSM',
      layers: [
         this.wmsRoadsLayer,
        this.wmsBuildingLayer
      ]
     });

     // add map scale line
   this.mapScale = new ScaleLine({units: 'metric'});
   // add overview map
   this.overviewMap = new OverviewMap();

    // General and Standard Map loading
    const map = new ol.Map({
      interactions: defaultInteractions().extend([select, modify]),
      target: 'map2',
      controls: ol.control.defaults({
        attributionOptions: {collapsible: false}
      }).extend([mousePositionControl, this.mapScale, this.overviewMap]),

      // OpenStreet Map Loading
      layers: [
         rasterOSM,
         vector,
         this.overlayGroupOSM
        ],
      // Map view, center location and zoom level
      view: new ol.View({
        center: ol.proj.fromLonLat([90.3717065602541, 23.82585617006994]),
        zoom: 13
      })
    });

    map.addInteraction(modify);

    modify.on('modifyend', function (e) {
      console.log('-----------------modifyend:' + e.features.getArray().length);
    });

    // global variable and also removable for selection
    let draw, snap, polygonString, typeSelect;

    typeSelect = document.getElementById('type');
    console.log('--------------Geometry Selection Type:' + typeSelect);

    function addInteractions() {
      draw = new Draw({
        source: source,
        type: typeSelect.value,
        minPoints: 3
      });
      map.addInteraction(draw);

      draw.on('drawend', function (e) {
        polygonString = e.feature.getGeometry().getCoordinates();
        console.log('--------------Draw Coordinate Points:' + polygonString);
      });

      snap = new Snap({ source: source });

      map.addInteraction(snap);
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function () {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      addInteractions();
    };
    addInteractions();
  }

}
