import { LightningElement,api,track } from 'lwc';
import sendEmail from '@salesforce/apex/PropertyDetails.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class OwnerViewForm extends LightningElement
 {

    
   @track subject;
   @track message;

    @track sendEmail=false;


    @api prop;

    @track buttondisabled;



    sendemail()
    {
       if(this.subject && this.message)
       {
         sendEmail({subject:this.subject ,body:this.message,toAddress:this.prop.Email__c})
         .then(response=>{
            if(response="SUCCESS")
            {
  
               this.showToast('Woohoo!','The Email has been sent','Success');
               this.buttondisabled=true;
        

               this.template.querySelector('lightning-input[data-name="subject"]').value = null; 
               this.template.querySelector('lightning-input-rich-text[data-name="message"]').value = null; 

   
            }
         })
         .catch(error=>
            {
               this.showToast('Oops!','Something went wrong','Error');
            })

       }
       else
       {
         this.showToast('Ohho!','Add Subject/Body','Error');
       }
      
       
        
       
    }

   subjectC(event)
   {
      this.subject=event.target.value;
   }

   messageC(event)
   {
      this.message=event.target.value;
   }



    sendMessageClick()
    {
      this.sendEmail=true;

      
    }

    closeEmail()
    {
        this.sendEmail=false;
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