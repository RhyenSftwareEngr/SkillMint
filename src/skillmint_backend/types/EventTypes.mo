module {
  public type EventInfo = {
    event_name : Text;
    event_description : Text;
    event_date : Int;
    event_end_date : ?Int;
    event_mode : { #Physical; #Virtual; #Hybrid };
    event_location : ?Text;
    virtual_link : ?Text;
    registration_start : Int;
    registration_end : Int;
    max_attendees : ?Nat;
    attendees : [Principal];
    event_organizers : [Principal];
    tags : [Text];
    requirements : ?Text;
    image_url : ?Text;
    created_at : Int;
    updated_at : Int;
  };

  public type EventStatus = {
    #Upcoming;
    #Ongoing;
    #Completed;
    #Cancelled;
  };
};
