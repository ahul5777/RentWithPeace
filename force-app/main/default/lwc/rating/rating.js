import { LightningElement,track ,api} from 'lwc';
import giverating from '@salesforce/apex/PropertyDetails.giverating';
export default class Rating extends LightningElement
 {

    @track livingScore=0;

    @track neighbourhoodScore=0;

    @track areaScore=0;
    
    @track societyScore=0;

    @api propId;


    connectedCallback()
    {
        console.log('Property Id is '+this.propId);

        
    }




    

    
    livingScoreC(event)
    { 
        this.livingScore=event.detail.value;
    }
    neighbourhoodScoreC(event)
    { 
        this.neighbourhoodScore=event.detail.value;
    }
     areaScoreC(event)
    { 
        this.areaScore=event.detail.value;
    }
      societyScoreC(event)
    { 
        this.societyScore=event.detail.value;
    }


    rateforthisproperty()
    {
        giverating({living:this.livingScore,neighbour:this.neighbourhoodScore,area:this.areaScore,society:this.societyScore,prop:this.propId})
        .then(response =>{
            console.log(response);
            const evt=new CustomEvent('ratingadded');
            this.dispatchEvent(evt);
        })
        .catch(error=> {
            console.log(error.body.message);
        })
    }







}