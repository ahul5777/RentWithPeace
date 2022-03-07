import { LightningElement,api,wire,track } from 'lwc';

import { fireEvent } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import getOwner from '@salesforce/apex/PropertyDetails.getOwner';
import getFAQ from '@salesforce/apex/PropertyDetails.getFAQ';
import { NavigationMixin } from 'lightning/navigation';



export default class PropertyTile extends  NavigationMixin(LightningElement) 
{
    @api property;

   
    @wire(CurrentPageReference) pageReference;

    @track showOwner=false;

    @track showF=false;

    @track owner;

    @track propId;

    @track faqList=[];

    connectedCallback()
    {

      this.propId=this.property.Id;

    }


    locateHandler()
    {
        
      fireEvent(this.pageReference,'pubsubtileclick',this.property);
       console.log("Event Fired!");
    }

    showOwnerInfo()
    {
        this.showOwner=true;

     getOwner({ownerIdInupt:this.property.Property_Owner__c  })
    .then(response=>
       {
          this.owner=response;
          
       })
    .catch(error=>console.log(error.body.message));
    console.log('recordId:', this.property.OwnerId);

    }

    closeOwnerInfo()
    {
        this.showOwner=false;
    }


    showFAQ()
    {
       this.showF=true;
       console.log(this.propId);
       this.getAllFaq();
      

    }


    getAllFaq()
    {
      getFAQ({propertyId:this.propId})
      .then(response=>{
         this.faqList=response;
         console.log('FAQ:', this.faqList.length);


      }).catch( error => {
         console.log(error.body.message);

      })
    }
    closeFAQ()
    {
       this.showF=false;
       
    }

    refreshQue(event)
    {
      console.log('The Proerty Id:'+event.detail);
       console.log('Event Received');
      const prop=event.detail;
      this.propId=prop;
  
      this.getAllFaq();

    }

    navigatetorecordpage()
    {

       var compDetails = {
         componentDef: "c:detail",
         attributes: {
             //Value you want to pass to the next lwc component
             videoTour:this.property.Video_Tour__c ,
             property:this.property
             
         }
     };
     // Base64 encode the compDefinition JS object
     var encodedCompDetails = btoa(JSON.stringify(compDetails));
     this[NavigationMixin.Navigate]({
         type: 'standard__webPage',
         attributes: {
             url: '/one/one.app#' + encodedCompDetails
         }
     });

    }


    




}