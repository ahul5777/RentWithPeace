import { LightningElement ,api,track} from 'lwc';
import getRating from '@salesforce/apex/PropertyDetails.getRating';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Detail extends LightningElement {

    @api videoTour;

    @api property;

    @track rateproperty=false;

   @track living;

   @track neighbour;

   @track area;

   @track society;

   @track buttondisabled=false;

    connectedCallback()
    {
        this.getAllRating();

    }

   getAllRating()
   {
    getRating({PropId:this.property.Id})
    .then(response=>
        {
            console.log(response);
            console.log('SUCCESS');
            this.living=(response.living*10).toString();
            this.area=(response.area*10).toString();
            this.neighbour=(response.neighbour*10).toString();
            this.society=(response.society*10).toString();

        })
        .catch(error=> 
            {
                console.log(error.body.message);
                console.log('ERROR');

            })


   }
  



    ratepropertyC()
    {
        this.rateproperty=true;
    }

    ratepropertyX()
    {
        this.rateproperty=false;
    }

    refreshrating()
    {
        this.getAllRating();
        this.rateproperty=false;
        this.showToast('Woohoo!','Your rating was successful!','Success');
        this.buttondisabled=true;


    }


    showToast(title,message,variant)
    {

    
         const event = new ShowToastEvent({
            title: title,
            message: message,
            variant:variant
      });
      this.dispatchEvent(event);
    }





}