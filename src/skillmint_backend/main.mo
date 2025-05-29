import Types "types";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

shared actor class Main(init: Types.MainStorage) = Self {
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

    public query({caller}) func getUserInfo() : async Types.UserInfo{
        Option.get(user_get(caller), Types.blank_user_info)
    };

    //TODO: Fix this first
    public shared({caller}) func submit_event(payload: Types.EventInfo) : async Nat {
        let event_id = next_event_id;
        next_event_id += 1;

        let event_info = {
            id = event_id;
            info = payload;
            status = #Upcoming; // Default status
            event_organizers = user_get(caller);
            attendees = null; // Initially no attendees
        };

        event_put(event_id, event_info.info);
        events := Trie.put(events, Types.event_key(event_id), Nat.equal, event_info.info).0;

        return event_id;
    };

    //Random function to test the actor. Please remove it in production.
    public query (msg) func WhoAmI(): async Principal {
        return msg.caller;
    };

    public func greet(name: Text) : async Text {
        return "Hello, " # name # "!";
    };
}