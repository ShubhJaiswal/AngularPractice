import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { CamelizePipe } from 'ngx-pipes';
@Injectable()

export class MapService {

    public geoCoder;
    private locationCache: any = {};
    constructor(private camelizePipe: CamelizePipe) { }

    private camelize(value: string): string {
        return this.camelizePipe.transform(value);
    }

    private cacheLocation(location: string, cordinates: any) {
        this.locationCache[this.camelize(location)] = cordinates;
    }

    public isLocationCached(location): boolean {
        return this.locationCache[this.camelize(location)];
    }

    public geocodeLocation(location: string): Observable<any> {
        return new Observable((observer) => {
            if (!this.geoCoder) {
                this.geoCoder = new (<any>window).google.maps.Geocoder();
            }
            this.geoCoder.geocode({ address: location }, (result, status) => {
                if (status == 'OK') {
                    const geometry = result[0].geometry.location;
                    const cordinates = { lat: geometry.lat(), lng: geometry.lng() };
                    this.cacheLocation(location, cordinates);
                    observer.next(cordinates);
                } else {
                    observer.error('Location could not be geoCoded');
                }
            });
        })
    }
    public getGeoLocation(location: string): Observable<any> {
        if (this.isLocationCached(location)) {
            return Observable.of(this.locationCache[this.camelize(location)]);
        } else {
            return this.geocodeLocation(location);
        }

    }
}


























// export class MapService {

//     public geoCoder;
//     private locationCache: any = {};
//     constructor(private camelizePipe : CamelizePipe){}

//     private camelize (value : string): string{
//         return this.camelizePipe.transform(value);
//     }

//     private cacheLocation(location: string, cordinates : any){ 
//         const camelizeLocation = this.camelize(location);

//         this.locationCache[camelizeLocation] = cordinates; 
//     }

//     public isLocationCached(location): boolean{
//         return this.locationCache[this.camelize(location)];
//     }
//     public geoCodeLocation(location : string) : Observable<any> {

//         this.geoCoder = new (<any>window).google.maps.Geocoder();

//         return new Observable((observer) => {
//             if(this.isLocationCached(location)){
//                 observer.next(this.locationCache[this.camelize(location)])
//             }else{
//                 this.geoCoder.geocode({address :location}, (result, status) => {    
//                     if(status == 'OK'){
//                         const geometry = result[0].geometry.location;
//                         const cordinates = {lat : geometry.lat(),lng : geometry.lng() }; 
//                         this.cacheLocation(location,cordinates);
//                         observer.next(cordinates);
//                     }else{
//                         observer.error('Location could not be geoCoded');
//                     }
//                 });
//             }

//         });
//     }
// }