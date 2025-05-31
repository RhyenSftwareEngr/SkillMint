import Types "types";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

shared actor class Main(init: Types.MainStorage) = Self {

    /***************************
    DEFAULT VALUES AND FUNCTIONS
    ****************************/
    stable var users = Types.users_fromArray(init.users);
    stable var events = Types.events_fromArray(init.events);
    stable var next_event_id: Nat = 0;

    func user_get(id: Principal) : ?Types.UserInfo = Trie.get(users, Types.user_key(id), Principal.equal);
    func user_put(id : Principal, info: Types.UserInfo){
        users := Trie.put(users, Types.user_key(id), Principal.equal, info).0;
    };

    func event_get(id: Nat) : ?Types.EventInfo = Trie.get(events, Types.event_key(id), Nat.equal);
    func event_put(id: Nat, info: Types.EventInfo){
        events := Trie.put(events, Types.event_key(id), Nat.equal, info).0;
    };

    /***************************
    USER METHODS
    ****************************/

    public query({caller}) func getUserProfile() : async Types.UserInfo{
        Option.get(user_get(caller), Types.blank_user_info)
    };

    public shared({caller}) func create_user(profile: Types.UserProfile) : async (Principal,Text) {
        let user_id = caller;
        // Check if the user already exists
        if (user_get(user_id) != null) {
            return (user_id,"Exist"); // User already exists, return the existing user ID
        };

        // Create a new user profile
        let current_time = Time.now();

        let user_info = {
            profile = profile;
            created_at = current_time;
            updated_at = current_time;
        };

        user_put(user_id, user_info);
        users := Trie.put(users, Types.user_key(user_id), Principal.equal, user_info).0;

        return (user_id, "Created"); // Return the new user ID and a success message
    };

    /***************************
    EVENT METHODS
    ****************************/

    public shared({caller}) func submit_event(payload: Types.EventProfile) : async Nat {
        let event_id = next_event_id;
        next_event_id += 1;
        let caller_user:Types.User = {
            principal = caller;
            info = Option.get(user_get(caller), Types.blank_user_info);
        };

        let event_info = {
            // id = event_id;
            profile = payload:Types.EventProfile;
            status = #Upcoming : Types.EventStatus; // Default status
            event_organizers = [caller_user];
            attendees = []:[Types.User];
            created_at = Time.now();
            updated_at = Time.now();
        };

        event_put(event_id, event_info);
        events := Trie.put(events, Types.event_key(event_id), Nat.equal, event_info).0;

        return event_id;
    };

    public query func get_event(id: Nat) : async Types.EventInfo {
        Option.get(event_get(id), Types.blank_event_info);
    };

    //FRONTEND TODO: Make sure to check if the user is an organizer
    public func update_event_profile(id: Nat, payload: Types.EventProfile) : async ?Types.EventProfile {
        switch (event_get(id)) {
            case (?event_info) {
                // Check if the caller is one of the event organizers
                let updated_event_info = {
                    profile = payload;
                    status = event_info.status; // Keep the existing status
                    event_organizers = event_info.event_organizers; // Keep existing organizers
                    attendees = event_info.attendees; // Keep existing attendees
                    created_at = event_info.created_at; // Keep the existing creation time
                    updated_at = Time.now(); // Update the modification time
                };
                event_put(id, updated_event_info);
                return ?updated_event_info.profile;
            };
            case null {
                return null; // Event not found
            };
        };
    };

    public shared({caller}) func join_event(id:Nat) : async ?Text {
        switch (event_get(id)) {
            case (?event_info) {
                // Check if the user is already an attendee
                if (Option.isSome(Array.find(event_info.attendees, func(u:Types.User) : Bool = u.principal == caller))){
                    return ?("Already joined");
                };

                // Add the user to the attendees list
                let caller_user:Types.User = {
                    principal = caller;
                    info = Option.get(user_get(caller), Types.blank_user_info);
                };
                let updated_event_info = {
                    profile = event_info.profile;
                    status = event_info.status; // Keep the existing status
                    event_organizers = event_info.event_organizers; // Keep existing organizers
                    attendees = Array.append<Types.User>(event_info.attendees, [caller_user]); // Add the caller to attendees
                    created_at = event_info.created_at; // Keep the existing creation time
                    updated_at = event_info.updated_at; // Update the modification time
                };
                event_put(id, updated_event_info);
                return ?("Joined successfully");
            };
            case null {
                return null; // Event not found
            };
        };
    };
    public shared({caller}) func leave_event(id:Nat) : async ?Text {
        switch (event_get(id)) {
            case (?event_info) {
                // Check if the user is an attendee
                if (Option.isSome(Array.find(event_info.attendees, func(u:Types.User) : Bool = u.principal == caller))){
                    // Remove the user from the attendees list
                    // let caller_user:Types.User = {
                    //     principal = caller;
                    //     info = Option.get(user_get(caller), Types.blank_user_info);
                    // };
                    let updated_attendees = Array.filter<Types.User>(event_info.attendees, func(u:Types.User) : Bool = u.principal != caller);
                    let updated_event_info = {
                        profile = event_info.profile;
                        status = event_info.status; // Keep the existing status
                        event_organizers = event_info.event_organizers; // Keep existing organizers
                        attendees = updated_attendees; // Update attendees
                        created_at = event_info.created_at; // Keep the existing creation time
                        updated_at = event_info.updated_at; // Update the modification time
                    };
                    event_put(id, updated_event_info);
                    return ?("Left successfully");
                };
                return ?("Not joined");
            };
            case null {
                return null; // Event not found
            };
        };
    };

    // query func filter_cancelled_events(events: [Types.EventInfo]) : async [Types.EventInfo] {
    //     Array.filter<Types.EventInfo>(events, func(e: Types.EventInfo) : Bool = e.status != #Cancelled);
    // };

    //Random function to test the actor. Please remove it in production.
    public query (msg) func WhoAmI(): async Principal {
        return msg.caller;
    };

    public func greet(name: Text) : async Text {
        return "Hello, " # name # "!";
    };
}