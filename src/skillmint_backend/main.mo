// import Array "mo:base/Array";
// import Text "mo:base/Text";
// import Principal "mo:base/Principal";
// import User "user";
import Principal "mo:base/Principal";
import UserTypes "types/UserTypes";
import HashMap "mo:base/HashMap";
import Buffer "mo:base/Buffer";
import EventTypes "types/EventTypes";
import Iter "mo:base/Iter";


actor Main {
    type UserListType = [(Principal, UserTypes.UserInfo)];
    
    // class Users(user: UserListType){
    //     private let UserMap = HashMap.HashMap<Principal, UserTypes.UserInfo>(
    //     10,
    //     Principal.equal,
    //     Principal.hash
    //     );
    //     for ((p, info) in user.vals()) {
    //         UserMap.put(p, info);
    //     };
    // };

    // stable var UserList: Users = Users([]);
    
    // public shared(msg) func addUser(info:UserTypes.UserInfo): async (){
    //     UserList.Users.put(msg.caller,info);
    // };

    // public query (msg) func getUser(): async ?UserTypes.UserInfo {
    //     return UserMap.get(msg.caller);
    // };


    // type EventListType = [EventTypes.EventInfo];
    // public func createEvent(event: EventTypes.EventInfo): async Text {
    //     EventBuffer.add(event);
    //     return "Event created successfully!";
    // };

    // public func getListEvent(start: Nat, end: Nat): async [EventTypes.EventInfo] {
    //     if (start >= end or end > EventBuffer.size()) {
    //         return [];
    //     };
    //     var eventSlice = Buffer.Buffer<EventTypes.EventInfo>(end - start);
    //     for (i in Iter.range(start,end)) {
    //         eventSlice.add(EventBuffer.get(i));
    //     };
    //     return eventSlice.toArray();
    // };

    // public func getEventByIndex(index: Nat): async ?EventTypes.EventInfo {
    //     return EventBuffer.getOpt(index);
    // };
    // var EventBuffer = Buffer.Buffer<EventTypes.EventInfo>(event.size());
    

    // AUTOMATICALLY SAVE AND LOAD USER EACH UPGRADE
    // system func preupgrade(){
    //     UserList := Iter.toArray(UserMap.entries());
    //     EventList := [EventBuffer.toArray()];
    // };

    // system func postupgrade() {
    //     for ((p, info) in UserList.vals()) {
    //         UserMap.put(p, info);
    //     };
    //     UserList := [];
    // };

    // User Management Functions


    public query (msg) func WhoAmI(): async Principal {
        return msg.caller;
    };

    public func greet(name: Text) : async Text {
        return "Hello, " # name # "!";
    };
}