import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Iter "mo:base/Iter";

actor Event {
    
    // Types
    public type EventInfo = {
        event_name: Text;
        event_description: Text;
        event_date: Int; // Single timestamp in nanoseconds
        event_end_date: ?Int; // Optional end date
        event_mode: {#Physical; #Virtual; #Hybrid}; // Better than Text
        event_location: Text;
        virtual_link: ?Text; // For virtual/hybrid events
        registration_start: Int;
        registration_end: Int;
        max_attendees: ?Nat; // Optional limit
        attendees: [Principal];
        event_organizers: [Principal]; // Multiple organizers
        tags: [Text]; // Event categories/tags
        requirements: ?Text; // Any special requirements
        image_url: ?Text; // Event image
        created_at: Int;
        updated_at: Int;
    };

    public type EventStatus = {
        #Upcoming;
        #Ongoing;
        #Completed;
        #Cancelled;
    };

    // Storage
    private stable var eventEntries: [(Principal, EventInfo)] = [];
    private var events = HashMap.fromIter<Principal, EventInfo>(
        eventEntries.vals(), 
        eventEntries.size(), 
        Principal.equal, 
        Principal.hash
    );
    
    private stable var eventIdCounter: Nat = 0;

    // Pre/Post upgrade hooks
    // system func preupgrade() {
    //     eventEntries := events.toArray();
    // };

    system func postupgrade() {
        eventEntries := [];
    };

    // Helper function to generate event ID
    // private func generateEventId() : Principal {
    //     // In a real implementation, you'd want a more robust ID generation
    //     // For now, using a simple counter approach
    //     eventIdCounter += 1;
    //     Principal.fromText("event_" # Nat.toText(eventIdCounter)) // This won't work directly
    //     // You might want to use a different approach for ID generation
    // };

    // Methods
    public shared(msg) func createEvent(eventInfo: EventInfo) : async Result.Result<Principal, Text> {
        let caller = msg.caller;
        let eventId = Principal.fromActor(Event); // Temporary - you'd generate unique IDs
        
        let newEvent = {
            eventInfo with
            event_organizers = Array.append(eventInfo.event_organizers, [caller]);
            created_at = Time.now();
            updated_at = Time.now();
        };
        
        events.put(eventId, newEvent);
        #ok(eventId)
    };

    public query func getEvent(eventId: Principal) : async Result.Result<EventInfo, Text> {
        switch (events.get(eventId)) {
            case null { #err("Event not found") };
            case (?event) { #ok(event) };
        }
    };

    public query func getUpcomingEvents() : async [EventInfo] {
        let now = Time.now();
        let upcomingEvents = Array.filter<EventInfo>(
            Iter.toArray(events.vals()),
            func(event: EventInfo) : Bool {
                event.event_date > now
            }
        );
        upcomingEvents
    };

    public shared(msg) func joinEvent(eventId: Principal) : async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        switch (events.get(eventId)) {
            case null { #err("Event not found") };
            case (?event) {
                // Check if already joined
                if (Array.find<Principal>(event.attendees, func(p) = p == caller) != null) {
                    return #err("Already registered for this event");
                };
                
                // Check capacity
                switch (event.max_attendees) {
                    case (?max) {
                        if (event.attendees.size() >= max) {
                            return #err("Event is full");
                        };
                    };
                    case null { /* No limit */ };
                };
                
                let updatedEvent = {
                    event with
                    attendees = Array.append(event.attendees, [caller]);
                    updated_at = Time.now();
                };
                
                events.put(eventId, updatedEvent);
                #ok("Successfully registered for event")
            };
        }
    };

    public shared(msg) func leaveEvent(eventId: Principal) : async Result.Result<Text, Text> {
        let caller = msg.caller;
        
        switch (events.get(eventId)) {
            case null { #err("Event not found") };
            case (?event) {
                let updatedAttendees = Array.filter<Principal>(
                    event.attendees,
                    func(p) = p != caller
                );
                
                let updatedEvent = {
                    event with
                    attendees = updatedAttendees;
                    updated_at = Time.now();
                };
                
                events.put(eventId, updatedEvent);
                #ok("Successfully left event")
            };
        }
    };

    public query(msg) func whoami() : async Principal {
        msg.caller
    };
}
