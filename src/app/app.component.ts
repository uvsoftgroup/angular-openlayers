import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MapComponent } from './components/map/map.component';

export type EditorType = 'useraddress' | 'mapaddresses' | 'mapplots' | 'mapbuildings' | 'mapfloors' | 'geomapportal' |
  'mapunits' | 'userrigistration' | 'userole' | 'plot' | 'building' | 'floor' | 'unit'
  | 'drawModifyVectorFeature' | 'geoservermap'  | 'draganddropfeature';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public editor: EditorType = 'geomapportal';
  title = 'Node.js+Angular+TypeScript+GeoServer';
  private showMap = true;

  public constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  get drawModifyVectorFeature() {
    return this.editor === 'drawModifyVectorFeature';
  }


  /*
   Load all respective features map as like Address, Plot, Building, Floor and Unit
  */
  get showGeoMapPortal() {
    return this.editor === 'geomapportal';
  }

  get showDraganddropfeature() {
    return this.editor === 'draganddropfeature';
  }

  get showUserMapAddresses() {
    return this.editor === 'mapaddresses';
  }

  get showUserMapPlots() {
    return this.editor === 'mapplots';
  }

  get showUserMapBuildings() {
    return this.editor === 'mapbuildings';
  }

  get showUserMapFloors() {
    return this.editor === 'mapfloors';
  }

  get showUserMapUnits() {
    return this.editor === 'mapunits';
  }

  get showGeoserverMapUnits() {
    return this.editor === 'geoservermap';
  }



  public editorTypeSelection(type: EditorType) {
    this.editor = type;
  }

  public useLanguage(language: string) {
    this.translate.use(language);
  }


}
