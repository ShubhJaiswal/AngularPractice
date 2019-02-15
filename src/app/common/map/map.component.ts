import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';
@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input() location: string;
  lat: number;// = 51.678418;
  lng: number;// = 7.809007;
  isPositionError: boolean = false;
  constructor(private MapService: MapService, private ref: ChangeDetectorRef) { }

  mapReadyHandler() {
    this.MapService.getGeoLocation(this.location).subscribe(
      (cordinates) => {
        this.lat = cordinates.lat;
        this.lng = cordinates.lng;
        this.ref.detectChanges();
      }, () => {
        this.isPositionError = true;
      });
  }


  //   this.MapService.geoCodeLocation(this.location).subscribe(
  //     (cordinates)=>{
  //       this.lat = cordinates.lat;
  //       this.lng = cordinates.lng;
  //     });
  //   }
}
