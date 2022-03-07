import { LightningElement,track,wire } from 'lwc';
import { registerListener  } from 'c/pubsub';
import { unregisterAllListeners } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';


export default class GeoMap extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    @track geoMap=[];

    @track title;

    @track latitude;

    @track longitude;

    disconnectedCallback()
   {
    unregisterAllListeners(this);
    };

    connectedCallback()
    {
    registerListener('pubsubtileclick',this.onSelectedInfo,this);
    }
    
    onSelectedInfo(payload)
    {
        this.latitude=payload.Geo_Map__Latitude__s;
        this.longitude=payload.Geo_Map__Longitude__s;
        this.title=payload.Name;
        console.log(this.latitude);
        console.log(this.longitude);

        this.mapMarkers = [
                    {
                        location: {
                            Latitude:this.latitude,
                            Longitude:this.longitude
                                 },
                        
                        title: 'The Landmark Building',
                        icon: 'standard:home'
                    }
                ];
        


       

        // geoMap.push(this.latitude,this.longitude);

        // this.mapMarkers = payload.map(loc => {
        //     const Latitude = loc.Geo_Map__Latitude__s;
        //     const Longitude = loc.Location__Longitude__s;
        //     return {
        //       location: { Latitude, Longitude },
        //       title: loc.Name,
        //       description: `Coords: ${Latitude}, ${Longitude}`,
        //       icon: 'utility:home'
        //     }
        // });



        
       

    }
 
}