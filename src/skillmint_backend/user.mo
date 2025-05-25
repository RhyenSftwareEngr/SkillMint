import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Time "mo:base/Time";

actor User {
    
    // Types
    public type UserInfo = {
        first_name: Text;
        last_name: Text;
        email: Text;
        phone: Text;
        bio: ?Text; // Optional bio for portfolio
        skills: [Text]; // Skills/expertise
        social_links: [(Text, Text)]; // Platform name, URL pairs
        profile_image: ?Text; // URL or blob reference
        events_created: [Principal]; // Event IDs they created
        events_attending: [Principal]; // Event IDs they're attending
        affiliation: [Text];
        created_at: Int; // Timestamp
        updated_at: Int;
    };

    // Storage
    private stable var userEntries: [(Principal, UserInfo)] = [];
    private var users = HashMap.fromIter<Principal, UserInfo>(
        userEntries.vals(), 
        userEntries.size(), 
        Principal.equal, 
        Principal.hash
    );

    // Pre/Post upgrade hooks
    // system func preupgrade() {
    //     userEntries := users.toArray();
    // };

    system func postupgrade() {
        userEntries := [];
    };

    // Methods
    public shared(msg) func createProfile(userInfo: UserInfo) : async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case (?existing) { #err("Profile already exists") };
            case null {
                let newUser = {
                    userInfo with
                    created_at = Time.now();
                    updated_at = Time.now();
                };
                users.put(caller, newUser);
                #ok("Profile created successfully")
            };
        }
    };

    public shared(msg) func updateProfile(userInfo: UserInfo) : async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case null { #err("Profile not found") };
            case (?existing) {
                let updatedUser = {
                    userInfo with
                    created_at = existing.created_at;
                    updated_at = Time.now();
                };
                users.put(caller, updatedUser);
                #ok("Profile updated successfully")
            };
        }
    };

    public query(msg) func getProfile() : async Result.Result<UserInfo, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case null { #err("Profile not found") };
            case (?user) { #ok(user) };
        }
    };

    public query func getPublicProfile(userId: Principal) : async Result.Result<UserInfo, Text> {
        switch (users.get(userId)) {
            case null { #err("Profile not found") };
            case (?user) { #ok(user) }; // In production, you might want to filter sensitive info
        }
    };

    public shared(msg) func addEventToProfile(eventId: Principal, isCreator: Bool) : async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case null { #err("Profile not found") };
            case (?user) {
                let updatedUser = if (isCreator) {
                    {
                        user with
                        events_created = Array.append(user.events_created, [eventId]);
                        updated_at = Time.now();
                    }
                } else {
                    {
                        user with
                        events_attending = Array.append(user.events_attending, [eventId]);
                        updated_at = Time.now();
                    }
                };
                users.put(caller, updatedUser);
                #ok("Event added to profile")
            };
        }
    };

    public query(msg) func whoami() : async Principal {
        msg.caller
    };
}