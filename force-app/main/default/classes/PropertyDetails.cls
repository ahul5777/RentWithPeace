public class PropertyDetails {

    
    
    @Auraenabled
    public static list<Property__c> getProperty()
    {
        
        list<Property__c> PropertyList=new List<Property__c> ();
        PropertyList=[SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, Additional_Room__c, Area__c, Carpet_Area_sqft__c, Covered_Area__c, Electricity_Status__c, Facing__c, Floor__c, For_Bacheleros__c, For_Family__c, Furnished_Type__c,Geo_Map__Latitude__s, Geo_Map__Longitude__s , LandMark__c, Maintainance__c, Rent__c, Video_Tour__c, Property_Images__c, Property_Owner__c FROM Property__c];
        return PropertyList;

   

    }

    @Auraenabled
    public static Property_Owner__c getOwner(string ownerIdInupt)
    {
        
       
        Property_Owner__c owner=[SELECT OwnerId, Name, Owner_Photo__c,Owner_Phone__c,Owner_Name__c,Owner_Address__c,Email__c FROM Property_Owner__c where Id =:ownerIdInupt ];
        return owner;

   

    }
    
    
       
    @Auraenabled
    public static Property__c getDetails( string PropId)
    {
        
        
        Property__c prop=[SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, Additional_Room__c, Area__c, Carpet_Area_sqft__c, Covered_Area__c, Electricity_Status__c, Facing__c, Floor__c, For_Bacheleros__c, For_Family__c, Furnished_Type__c, Geo_Map__Latitude__s, Geo_Map__Longitude__s, Geo_Map__c, LandMark__c, Maintainance__c, Rent__c, Video_Tour__c, Property_Images__c, Property_Owner__c FROM Property__c WHERE Id=:PropId ];
        return prop;
    }


    @Auraenabled
    public static string askQuestion(string PropId,string question)
    {
        
           List<FAQ__c> faqList=new List<FAQ__c>();
            FAQ__c faq=new FAQ__c(Question__c=String.ValueOf(question),Property__c =String.ValueOf(PropId));
            faqList.add(faq);
            insert faqList;

            return 'Success';
       
       
    }

    @Auraenabled
    public static string giverating(string living ,string neighbour,string area,string society,string prop)
    {

        Integer l=Integer.valueOf(living);
        Integer n=Integer.valueOf(neighbour);
        Integer a=Integer.valueOf(area);
        Integer s=Integer.valueOf(society);

        String propId=prop;


        try {
            List<Property_Rating__c>ratingList=new List<Property_Rating__c>();

            Property_Rating__c propratingforLiving=new Property_Rating__c(type__c='Living', rating__c =l, Property__c=propId);
            ratingList.add(propratingforLiving);
    
            Property_Rating__c propratingforA=new Property_Rating__c(type__c='Area',rating__c=a,Property__c=propId);
            ratingList.add(propratingforA);
    
            Property_Rating__c propratingforN=new Property_Rating__c(type__c='Neighbourhood',rating__c=n,Property__c=propId);
            ratingList.add(propratingforN);
    
            Property_Rating__c propratingforS=new Property_Rating__c(type__c='Society',rating__c=s,Property__c=propId);
            ratingList.add(propratingforS);
    
            insert ratingList;

            return 'SUCCESS';
            
        } catch (Exception e) {

            return 'ERROR';
            
        }
       








       
       
    }



        
    @Auraenabled
    public static ratingwrapper  getRating (string PropId)
    {
        
        List<AggregateResult>resultList1=[Select Avg(rating__c) living from Property_Rating__c WHERE Property__c=:PropId AND type__c='Living' ];
        Integer livingScore=Integer.valueOf(resultList1[0].get('living'));

        List<AggregateResult>resultList2=[Select Avg(rating__c) area from Property_Rating__c WHERE Property__c=:PropId AND type__c='Area' ];
        Integer areaScore=Integer.valueOf(resultList2[0].get('area'));


        List<AggregateResult>resultList3=[Select Avg(rating__c) Neighbourhood from Property_Rating__c WHERE Property__c=:PropId AND type__c='Neighbourhood' ];
        Integer neighbourScore=Integer.valueOf(resultList3[0].get('Neighbourhood'));

        List<AggregateResult>resultList4=[Select Avg(rating__c) Society from Property_Rating__c WHERE Property__c=:PropId AND type__c='Society' ];
        Integer societyScore=Integer.valueOf(resultList4[0].get('Society'));


        ratingwrapper wrapper=new ratingwrapper();

        if(livingScore!=null)
        {
            wrapper.living=livingScore;
        }
        else{
            wrapper.living=0;
        
        }

        if(areascore!=null)
        {
            wrapper.area=areascore;
        }
        else{
            wrapper.area=0;
        
        }

        if(neighbourScore!=null)
        {
            wrapper.neighbour=neighbourScore;
        }
        else{
            wrapper.neighbour=0;
        
        }

        if(societyScore!=null)
        {
            wrapper.society=societyScore;
        }
        else{
            wrapper.society=0;
        
        }

        return wrapper;


    }



   


    
      
    

    // public static List<faq> getAll(list<SObject> faqs)
    // {
    //     List<faq> faqList=new List<faq>();
    //     for(SObject s:faqs)
    //     {
    //         faq newfaq=new faq();
    //         newfaq.faqId=s.Id;
    //         newfaq.Answers=String.ValueOf(s.get('Answers__c'));
    //         newfaq.Questions=String.ValueOf(s.get('Question__c'));
    //         faqList.add(newfaq);
    //     }

    //     return faqList;

    // }

    @Auraenabled
    public static List<FAQ__c> getFAQ( string propertyId)
    {
        
        List<FAQ__c> faqList=[SELECT Id, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastViewedDate, LastReferencedDate, Question__c, Answers__c, Property__c FROM FAQ__c WHERE Property__c=: propertyId ORDER BY CreatedDate ] ;
       return faqList;
    }


    @Auraenabled
    public static list<Property__c> getSearch( string City)
    {
        
        if(!String.isBlank(City))
        {
            List<Property__c>prop=[SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, Additional_Room__c, Area__c, Carpet_Area_sqft__c, Covered_Area__c, Electricity_Status__c, Facing__c, Floor__c, For_Bacheleros__c, For_Family__c, Furnished_Type__c, Geo_Map__Latitude__s, Geo_Map__Longitude__s, Geo_Map__c, LandMark__c, Maintainance__c, Rent__c, Video_Tour__c, Property_Images__c, Property_Owner__c FROM Property__c WHERE Area__c =: City];
            return prop;
        }
        else
         {
            list<Property__c> PropertyList=new List<Property__c> ();
            PropertyList=[SELECT Id, OwnerId, IsDeleted, Name, CreatedDate, CreatedById, LastModifiedDate, LastModifiedById, SystemModstamp, LastActivityDate, LastViewedDate, LastReferencedDate, Additional_Room__c, Area__c, Carpet_Area_sqft__c, Covered_Area__c, Electricity_Status__c, Facing__c, Floor__c, For_Bacheleros__c, For_Family__c, Furnished_Type__c,Geo_Map__Latitude__s, Geo_Map__Longitude__s , LandMark__c, Maintainance__c, Rent__c, Video_Tour__c, Property_Images__c, Property_Owner__c FROM Property__c];
           return PropertyList;

            
        }
        
    }


    @Auraenabled
    public static string sendEmail( string subject,string body,string toAddress)
    {
        
        try {
          
        Messaging.SingleEmailMessage email=new Messaging.SingleEmailMessage();
        email.setSubject(subject);
        email.setHtmlBody(body);
        email.setSenderDisplayName('RentWithPeace');
        List<String>EmailList=new List<String>();
        EmailList.add(toAddress);
        email.setToAddresses(EmailList);
         Messaging.SingleEmailMessage[] EmailsTo=new List<Messaging.SingleEmailMessage>();
         EmailsTo.add(email);
         Messaging.sendEmail(EmailsTo,false);
         return 'SUCCESS';
            
        } catch (Exception e) {

            return 'Error';
        }


        
    }


    public class ratingwrapper
    {

        @AuraEnabled
        public Integer living;

        @AuraEnabled
        public Integer area;

        @AuraEnabled
        public Integer neighbour;

        @AuraEnabled
        public Integer society;


    }

   

    




}