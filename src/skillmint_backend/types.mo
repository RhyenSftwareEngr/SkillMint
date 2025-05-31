import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

module {
    public type UserProfile = {
        first_name: Text;
        last_name: Text;
        email: Text;
        phone: Text;
        bio: ?Text;
        skills: [Text];
        social_links: [(Text, Text)]; // (platform, link)
        profile_image: ?Text; // URL to the profile image
        events_created: [Event];
        events_attending: [Event];
        affiliation: [Text];
    };
    public type UserInfo = {
        profile: UserProfile;
        created_at: Time.Time;
        updated_at: Time.Time;
    };
    public type EventProfile = {
        event_name: Text;
        event_description: Text;
        event_date: Time.Time;
        event_end_date: Time.Time;
        event_mode: EventMode;
        event_location: ?Text;
        virtual_link: ?Text;
        registration_start: Time.Time;
        registration_end: Time.Time;
        max_attendees: ?Nat;
        tags: [Text];
        // requirements: ?Text;
        // image_url: ?Text;
        // event_organizers: [User];
        // attendees: ?[User];
        // created_at: Int;
        // updated_at: Int;
    };
    public type EventInfo = {
        profile: EventProfile; 
        status: EventStatus;
        event_organizers: [User];
        attendees: [User];
        created_at: Time.Time;
        updated_at: Time.Time;
    };
    public type EventMode={
        #Physical;
        #Virtual;
        #Hybrid;
    };
    public type EventStatus = {
        #Upcoming;
        #Ongoing;
        #Completed;
        #Cancelled;
    };

    public type User = {
        principal: Principal;
        info: UserInfo;
    };

    public type Event = {
        id: Nat;
        info: EventInfo;
    };

    public type MainStorage = {
        users: [User];
        events: [Event];
    };

    public func user_key(t: Principal): Trie.Key<Principal> = { key = t; hash = Principal.hash t};
    public func event_key(t: Nat): Trie.Key<Nat> = { key = t; hash = Int.hash t};
    public func users_fromArray(arr: [User]): Trie.Trie<Principal,UserInfo>{
        var sample = Trie.empty<Principal,UserInfo>();
        for (user in arr.vals()){
            sample := Trie.put(sample, user_key(user.principal), Principal.equal, user.info).0;
        };
        return sample;
    };
    public func events_fromArray(arr: [Event]): Trie.Trie<Nat,EventInfo>{
        var sample = Trie.empty<Nat,EventInfo>();
        for (event in arr.vals()){
            sample := Trie.put(sample, event_key(event.id), Nat.equal,event.info).0;
        };
        return sample;
    };

    public let blank_user_info: UserInfo = {
        profile = {
            first_name = "";
            last_name = "";
            email = "";
            phone = "";
            bio = null;
            skills = [];
            social_links = [];
            profile_image = null;
            events_created = [];
            events_attending = [];
            affiliation = [];
        };
        created_at = 0;
        updated_at = 0;
    };
    public let blank_event_info: EventInfo = {
        profile = {
            event_name = "";
            event_description = "";
            event_date = 0;
            event_end_date = 0;
            event_mode = #Physical;
            event_location = null;
            virtual_link = null;
            registration_start = 0;
            registration_end = 0;
            max_attendees = null;
            tags = [];
        };
        status = #Cancelled;
        event_organizers = [];
        attendees = [];
        created_at = 0;
        updated_at = 0;
    };
}