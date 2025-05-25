import Array "mo:base/Array";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

persistent actor User {
    
    // Variable Declaration
    stable var first_name: Text = "N/A";
    stable var last_name: Text = "N/A";
    stable var email: Text = "N/A";
    stable var phone: Text = "N/A";
    stable var events: [(Text,Bool)] = []; //Bool 1 indicates Event Canister ID. Bool 2 indicates if its an upcomming or finished
    stable var affiliation: [Text] = [];
    
    // Getters and Setters
    public query func getFirstName() : async Text {
        return first_name;
    };
    public func setFirstName(name: Text) : async () {
        first_name := name;
    };
    public query func getLastName() : async Text {
        return last_name;
    };
    public func setLastName(name: Text) : async () {
        last_name := name;
    };
    public query func getEmail() : async Text {
        return email;
    };
    public func setEmail(email_res: Text) : async () {
        email := email_res;
    };
    public query func getPhone() : async Text {
        return phone;
    };
    public func setPhone(phone_res: Text) : async () {
        phone := phone_res;
    };
    public query func getEvents() : async [(Text,Bool)] {
        return events;
    };
    public func setEvents(event: (Text,Bool)) : async () {
        events := Array.append(events, [event]);
    };  
    public query func getAffiliation() : async [Text] {
        return affiliation;
    };
    public func setAffiliation(aff: Text) : async () {
        affiliation := Array.append(affiliation, [aff]);
    };

    // Methods
    public query (message) func whoami() : async Principal {
        return message.caller;
    };

    //TODO: Delete this method
    public func greet(name: Text) : async Text {
        return "Hello, " # name # "!";
    };
}