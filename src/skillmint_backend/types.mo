import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

module {
    public type UserInfo = {
        first_name: Text;
        last_name: Text;
        email: Text;
        phone: Text;
        bio: ?Text;
        skills: [Text];
        social_links: [(Text, Text)];
        profile_image: ?Text;
        events_created: [Principal];
        events_attending: [Principal];
        affiliation: [Text];
        created_at: Int;
        updated_at: Int;
    };
    public type EventInfo = {
        event_name: Text;
        event_description: Text;
        event_date: Int;
        event_end_date: ?Int;
        event_mode: {#Physical; #Virtual; #Hybrid};
        event_location: ?Text;
        virtual_link: ?Text;
        registration_start: Int;
        registration_end: Int;
        max_attendees: ?Nat;
        tags: [Text];
        // requirements: ?Text;
        // image_url: ?Text;
        created_at: Int;
        updated_at: Int;
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
        status: EventStatus;
        event_organizers: [User];
        attendees: ?[User];
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
        created_at = 0;
        updated_at = 0;
    };
}