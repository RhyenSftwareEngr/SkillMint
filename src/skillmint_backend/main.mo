// import Array "mo:base/Array";
// import Text "mo:base/Text";
// import Principal "mo:base/Principal";
// import User "user";
import Principal "mo:base/Principal";
import UserTypes "types/UserTypes";
import HashMap "mo:base/HashMap";
// import EventTypes "types/EventTypes";
import Iter "mo:base/Iter";


actor Main {
    stable var UserList: [(Principal,UserTypes.UserInfo)] = [];
    
    private let UserMap = HashMap.HashMap<Principal, UserTypes.UserInfo>(
        10,
        Principal.equal,
        Principal.hash
        );

    // AUTOMATICALLY SAVE AND LOAD USER EACH UPGRADE
    system func preupgrade(){
        UserList := Iter.toArray(UserMap.entries());
    };

    system func postupgrade() {
        for ((p, info) in UserList.vals()) {
            UserMap.put(p, info);
        };
        UserList := [];
    };

    public shared(msg) func addUser(info:UserTypes.UserInfo): async (){
        UserMap.put(msg.caller,info);
    };

    public query (msg) func getUser(): async ?UserTypes.UserInfo {
        return UserMap.get(msg.caller);
    };

    public query (msg) func WhoAmI(): async Principal {
        return msg.caller;
    };


    public func greet(name: Text) : async Text {
        return "Hello, " # name # "!";
    };
}