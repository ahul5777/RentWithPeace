import { api, LightningElement ,track} from 'lwc';
import askQuestion from '@salesforce/apex/PropertyDetails.askQuestion';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Faq extends LightningElement {
@api faqlist=[];

@track askQuestion=false;

@api prop;

@track btnask=true;

@track question;

connectedCallback()
{
    console.log('Propery Id '+this.prop);
}


questionI()
{
    askQuestion({PropId:this.prop,question:this.question})
    .then(response=>
        {
            console.log('SUCCESS');
            const evt=new CustomEvent('refreshque',{detail:this.prop});
            console.log(evt);
            this.dispatchEvent(evt);
            this.template.querySelector('lightning-input').value = null; 
        } )
        
    .catch(error => console.log(error.body.message));
    
}


// askQuestion()
// {
//     addquestion({questions:this.question,propId:this.prop})
//     .then(response=> 
//         {
//             console.log(response);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

get isEmpty()
{
    if(this.faqlist.length ==0)
    {
        return false;
    }
    else
    {
        return true;
    }
}

openQuestionPanel()
{
    this.askQuestion=true;
    this.btnask=false;
   

}

closeQuestionPanel()
{
    this.askQuestion=false;
}


questionC(event)
{
    this.question=event.target.value;
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