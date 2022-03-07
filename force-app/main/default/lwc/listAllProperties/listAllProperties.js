import { LightningElement,wire,track } from 'lwc';
import getProperty from '@salesforce/apex/PropertyDetails.getProperty';
import getSearch from '@salesforce/apex/PropertyDetails.getSearch';
import Lab from '@salesforce/resourceUrl/Lab';
export default class ListAllProperties extends LightningElement
{

    snag=Lab;
    propertyList=[];

    @track searchTerm;


    connectedCallback()
    {
        getProperty().then(response=> {this.propertyList=response}).catch(error => {console.log(error.body.message)});
    }

    changeSearch(event)
    {
        this.searchTerm=event.target.value;

    }

    get isEmpty()
    {
        if(this.propertyList.length ==0)
        {
            return false;
        }
        else
        {
            return true;
        }

    }


    todo()
    {
        console.log(this.searchTerm);
        getSearch({City:this.searchTerm})
        .then(response=>{
            console.log('OK');
            this.propertyList=response;
            comnsole.log(response);
            
        }).catch(error =>{
            console.log(error.body.message);
        });

    }




}