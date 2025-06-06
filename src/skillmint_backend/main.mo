import Types "types";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Array "mo:base/Array";
import LLM "mo:llm";
import DateTime "mo:datetime/DateTime"; //TODO: IMPLEMENT DATE TIME
import DTComponents "mo:datetime/Components";
import Debug "mo:base/Debug";

actor Main {
  /***************************
    DEFAULT VALUES AND PRIVATE FUNCTIONS
    ****************************/
  stable var users = Types.users_fromArray([]);
  stable var events = Types.events_fromArray([]);
  stable var next_event_id : Nat = 1; //Lets start with 1. 0 being the error type

  func user_get(id : Principal) : ?Types.UserInfo = Trie.get(users, Types.user_key(id), Principal.equal);
  func user_put(id : Principal, info : Types.UserInfo) {
    users := Trie.put(users, Types.user_key(id), Principal.equal, info).0;
  };

  func event_get(id : Nat) : ?Types.EventInfo = Trie.get(events, Types.event_key(id), Nat.equal);
  func event_put(id : Nat, info : Types.EventInfo) {
    events := Trie.put(events, Types.event_key(id), Nat.equal, info).0;
  };

  func user_event_update(event_id : Nat, user_principal : Principal, method : { #leave; #join }) : [Nat] {
    let user = user_get(user_principal);
    switch (user) {
      case (?user_info) {
        // Update the user's events_attending list based on the method
        let updated_events = switch (method) {
          case (#join) {
            Array.append<Nat>(user_info.events_attending, [event_id]);
          };
          case (#leave) {
            Array.filter<Nat>(user_info.events_attending, func(e : Nat) : Bool = e != event_id);
          };
        };
        return updated_events;
      };
      case null {
        return []; // User not found, return an empty list
        // User not found, handle accordingly
      };
    };
  };

  /***************************
    USER METHODS
    ****************************/

  public query ({ caller }) func getUserInfo() : async Types.UserInfo {
    Option.get(user_get(caller), Types.blank_user_info);
  };

  public shared ({ caller }) func createUser(profile : Types.UserProfile) : async (Principal, Text) {
    let user_id = caller;
    // Check if the user already exists
    if (user_get(user_id) != null) {
      return (user_id, "Exist"); // User already exists, return the existing user ID
    };

    // Create a new user profile
    let current_time = Time.now();

    let user_info = {
      profile : Types.UserProfile = profile;
      badges : [{ badge : Types.Badge; event_id : Nat }] = []; // Initialize with an empty list of badges
      events_created : [Nat] = []; // Initialize with an empty list of created events
      events_attending : [Nat] = []; // Initialize with an empty list of events the user is attending
      created_at : Time.Time = current_time;
      updated_at : Time.Time = current_time;
    };

    user_put(user_id, user_info);

    return (user_id, "Created"); // Return the new user ID and a success message
  };

  public shared ({ caller }) func updateUserProfile(payload : Types.UserProfile) : async ?Types.UserProfile {
    switch (user_get(caller)) {
      case (?user_info) {
        let updated_user_info = {
          profile = payload;
          badges = user_info.badges; // Keep existing badges
          events_created = user_info.events_created; // Keep existing created events
          events_attending = user_info.events_attending; // Keep existing attending events
          created_at = user_info.created_at; // Keep the existing creation time
          updated_at = Time.now(); // Update the modification time
        };
        user_put(caller, updated_user_info);
        return ?updated_user_info.profile;
      };
      case null {
        return null; // User not found
      };
    };
  };

  public query func getUserInfoByPrincipal(principal : Principal) : async Types.UserInfo {
    Option.get(user_get(principal), Types.blank_user_info);
  };

  public query ({ caller }) func userExist() : async Bool {
    Option.isSome(user_get(caller));
  };

  /***************************
    EVENT METHODS
    ****************************/

  public query func getEventInfo(id : Nat) : async Types.EventInfo {
    Option.get(event_get(id), Types.blank_event_info);
  };

  public query func getLatestEventId() : async Nat {
    return next_event_id - 1;
  };

  //FRONTEND TODO: Make sure to check if the user is an organizer
  public func updateEventProfile(id : Nat, payload : Types.EventProfile) : async ?Types.EventProfile {
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

  public func updateEventProfileStatus(id : Nat) : async ?Types.EventInfo {
    switch (event_get(id)) {
      case (?event_info) {
        switch (event_info.status) {
          case (#Cancelled) {
            return null;
          };
          case (#Completed) {
            return null;
          };
          case (#Upcoming) {
            if (event_info.profile.event_date <= Time.now()) {
              let update_event : Types.EventInfo = {
                profile = event_info.profile;
                status = #Ongoing : Types.EventStatus;
                event_organizers = event_info.event_organizers;
                attendees = event_info.attendees;
                created_at = event_info.created_at;
                updated_at = Time.now();
              };
              event_put(id, update_event);
            };
            return event_get(id);
          };
          case (#Ongoing) {
            if (event_info.profile.event_end_date < Time.now()) {
              let update_event : Types.EventInfo = {
                profile = event_info.profile;
                status = #Completed : Types.EventStatus;
                event_organizers = event_info.event_organizers;
                attendees = event_info.attendees;
                created_at = event_info.created_at;
                updated_at = Time.now();
              };
              event_put(id, update_event);
            };
            return event_get(id);
          };
        };
      };
      case null {
        return null;
      };
    };
  };

  /***************************
    ATTENDEE METHODS
    ****************************/

  public shared ({ caller }) func joinEvent(id : Nat) : async ?Text {
    switch (event_get(id)) {
      case (?event_info) {
        // Check if the user is already an attendee
        if (Option.isSome(Array.find(event_info.attendees, func(u : Types.Attendee) : Bool = u.attendee_principal == caller))) {
          return ?("Already joined");
        };

        // Add the user to the attendees list
        // let caller_user:Types.User = {
        //     principal = caller;
        //     info = Option.get(user_get(caller), Types.blank_user_info);
        // };
        let updated_event_info = {
          profile = event_info.profile;
          status = event_info.status; // Keep the existing status
          event_organizers = event_info.event_organizers; // Keep existing organizers
          attendees = Array.append<Types.Attendee>(event_info.attendees, [{ attendee_principal = caller; attendee_registration_date = Time.now() }]); // Add the caller to attendees
          created_at = event_info.created_at; // Keep the existing creation time
          updated_at = event_info.updated_at; // Update the modification time
        };
        // Update the user's events_attending list
        let user_att = user_get(caller);
        switch (user_att) {
          case (?user_info) {
            let updated_events = user_event_update(id, caller, #join);
            // Update the user's events_attending list
            let updated_user_info = {
              profile = user_info.profile;
              badges = user_info.badges; // Keep existing badges
              events_created = user_info.events_created; // Keep existing created events
              events_attending = updated_events; // Update attending events
              created_at = user_info.created_at; // Keep the existing creation time
              updated_at = Time.now(); // Update the modification time
            };
            user_put(caller, updated_user_info);
          };
          case null {
            return null; // User not found
          };
        };
        event_put(id, updated_event_info);
        return ?("Joined successfully");
      };
      case null {
        return null; // Event not found
      };
    };
  };
  public shared ({ caller }) func leaveEvent(id : Nat) : async ?Text {
    switch (event_get(id)) {
      case (?event_info) {
        // Check if the user is an attendee
        if (Option.isSome(Array.find(event_info.attendees, func(u : Types.Attendee) : Bool = u.attendee_principal == caller))) {
          // Remove the user from the attendees list
          // let caller_user:Types.User = {
          //     principal = caller;
          //     info = Option.get(user_get(caller), Types.blank_user_info);
          // };
          let updated_attendees = Array.filter<Types.Attendee>(event_info.attendees, func(u : Types.Attendee) : Bool = u.attendee_principal != caller);
          let updated_event_info = {
            profile = event_info.profile;
            status = event_info.status; // Keep the existing status
            event_organizers = event_info.event_organizers; // Keep existing organizers
            attendees = updated_attendees; // Update attendees
            created_at = event_info.created_at; // Keep the existing creation time
            updated_at = event_info.updated_at; // Update the modification time
          };
          // Update the user's events_attending list
          let user_att = user_get(caller);
          switch (user_att) {
            case (?user_info) {
              let updated_events = user_event_update(id, caller, #leave);
              // Update the user's events_attending list
              // and remove the event from it
              if (Array.size(updated_events) == 0) {
                return ?("No events left to attend");
              };
              let updated_user_info = {
                profile = user_info.profile;
                badges = user_info.badges; // Keep existing badges
                events_created = user_info.events_created; // Keep existing created events
                events_attending = updated_events; // Update attending events
                created_at = user_info.created_at; // Keep the existing creation time
                updated_at = Time.now(); // Update the modification time
              };
              user_put(caller, updated_user_info);
            };
            case null {
              return null; // User not found
            };
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

  /***************************
    EVENT ORGANIZER METHODS
    ****************************/

  public shared ({ caller }) func submitEvent(payload : Types.EventProfile) : async Nat {
    let event_id = next_event_id;
    next_event_id += 1;

    let event_info = {
      // id = event_id;
      profile = payload : Types.EventProfile;
      status = #Upcoming : Types.EventStatus; // Default status
      event_organizers = [caller];
      attendees = [] : [Types.Attendee];
      created_at = Time.now();
      updated_at = Time.now();
    };

    event_put(event_id, event_info);
    // Update the user's events_created list
    let user_att = user_get(caller);
    switch (user_att) {
      case (?user_info) {
        let updated_events = Array.append<Nat>(user_info.events_created, [event_id]);
        // Update the user's events_created list
        let updated_user_info = {
          profile = user_info.profile;
          badges = user_info.badges; // Keep existing badges
          events_created = updated_events; // Update created events
          events_attending = user_info.events_attending; // Keep existing attending events
          created_at = user_info.created_at; // Keep the existing creation time
          updated_at = Time.now(); // Update the modification time
        };
        user_put(caller, updated_user_info);
      };
      case null {
        return 0; // User not found, return 0 as an error code
      };
    };
    // events := Trie.put(events, Types.event_key(event_id), Nat.equal, event_info).0;

    return event_id;
  };

  public func finalizeEvent(id : Nat, attended_attendees : [Principal]) : async ?Text {
    switch (event_get(id)) {
      case (?event_info) {
        // Update the event status to Completed
        let updated_event_info = {
          profile = event_info.profile;
          status = #Completed : Types.EventStatus; // Change status to Completed
          event_organizers = event_info.event_organizers; // Keep existing organizers
          attendees = event_info.attendees; // Keep existing attendees
          created_at = event_info.created_at; // Keep the existing creation time
          updated_at = Time.now(); // Update the modification time
        };

        // get list of attendees and send their badges
        let attendees_list = event_info.attendees;
        var list_of_failed_attendees = "Failed to update user info for: \n";
        label attendees_loop for (att in attendees_list.vals()) {
          // Here you would implement the logic to send badges to attendees

          // Check if the user is in the attended attendees list
          // and issue a badge if they are
          let attended_opt = Array.find(attended_attendees, func(u : Principal) : Bool = u == att.attendee_principal);
          if (Option.isSome(attended_opt)) {
            // Assuming you have a function to issue badges
            // issue_badge(att.principal, id, user_att);
            let user_att = user_get(att.attendee_principal);
            switch (user_att) {
              case (?user_info) {
                let updated_badges = Array.append<{ badge : Types.Badge; event_id : Nat }>(user_info.badges, [{ badge = event_info.profile.badge; event_id = id }]);
                let updated_events = user_event_update(id, att.attendee_principal, #leave);
                if (Array.size(updated_events) == 0) {
                  list_of_failed_attendees := list_of_failed_attendees # "- " # Principal.toText(att.attendee_principal) # " (No events left to attend)\n";
                  continue attendees_loop; // Skip to the next attendee
                };
                // Update the user's badges and events_attending list
                // and remove the event from it
                let updated_user_info = {
                  badges = updated_badges;
                  profile = user_info.profile;
                  events_attending = updated_events;
                  events_created = user_info.events_created;
                  created_at = user_info.created_at;
                  updated_at = Time.now();
                };
                user_put(att.attendee_principal, updated_user_info);
              };
              case null {
                list_of_failed_attendees := list_of_failed_attendees # "- " #Principal.toText(att.attendee_principal) # "\n";
              };
            };
          };
        };
        event_put(id, updated_event_info);
        return ?("Event finalized successfully\n" # list_of_failed_attendees);
      };
      case null {
        return null; // Event not found
      };
    };
  };

  public func cancelEvent(id : Nat) : async ?Text {
    switch (event_get(id)) {
      case (?event_info) {
        let updated_event_info = {
          profile = event_info.profile;
          status = #Cancelled : Types.EventStatus; // Change status to Completed
          event_organizers = event_info.event_organizers; // Keep existing organizers
          attendees = event_info.attendees; // Keep existing attendees
          created_at = event_info.created_at; // Keep the existing creation time
          updated_at = Time.now(); // Update the modification time
        };
        event_put(id, updated_event_info);
        return ?("Event ID " # Nat.toText(id) # " has successfuly cancelled.")

      };
      case null {
        return null;
      };
    };
  };

  /////////////////////////////////////////////////////////////

  public shared ({ caller }) func prompt(user_msg : Text) : async Text {
    let user_info = Option.get(user_get(caller), Types.blank_user_info);

    let response = await LLM.chat(#Llama3_1_8B).withMessages([
      #system_ {
        content = "
                You are an AI Agent for an application called SkillMint. You are a friendly and professional AI mentor integrated into the SkillMint platform. Your role is to assist users—primarily students, event organizers, beginners in tech, and professionals—with questions related to the platform and general educational guidance.

                Your main responsibilities:
                - Answer student questions about the SkillMint platform, features, and how to use them.
                - Act as a mentor by providing encouragement, tips, and general advice for learning, participating in events, and building a professional portfolio.
                - Help event organizers navigate event creation, promotion, and participant engagement within the platform.
                - Offer guidance on improving digital skills, discovering tech communities, and getting involved in learning opportunities (e.g., hackathons, bootcamps, bounties).

                Tone and style:
                - Be friendly, approachable, and professional.
                - Communicate clearly and supportively.
                - Use accessible language that welcomes both beginners and experienced users.

                Limitations:
                - Do **not** give legal advice.
                - Do **not** answer off-topic questions unrelated to education, events, or the SkillMint platform.
                - Do **not** give personal or financial advice.
                - Always remind users that you are an AI and that they should use their own judgment and consult human mentors or professionals for important decisions.

                Other notes:
                - You are embedded in the web app sidebar. Keep your responses concise and scannable when possible.
                - If a user asks something outside your scope, politely redirect them or suggest contacting support or a human mentor.
                - You are also given some general information of the user, including their name and their bio. Try to fit your answer accordingly
                ";
      },
      #user {
        content = "
                With the user's information:
                First name: " # user_info.profile.first_name # "
                Last Name: " # user_info.profile.last_name # "
                Bio: " # Option.get(user_info.profile.bio, "No Bio") # "

                Response to the User's Query:\n" # user_msg;
      },
    ]).send();
    return Option.get(response.message.content, "No response");
  };

  // public func addOrganizer(id: Nat, organizer: Principal):async ?[Types.User]{
  //     let user:[Types.User] = [{principal = organizer; info = Option.get(user_get(organizer),Types.blank_user_info)}];
  //     // if(Array.find<Types.User>(user,func x = x.info.created_at == 0)){
  //     //     return null;
  //     // };
  //     switch(event_get(id)){
  //         case(?event_info){
  //             let update_event_organizers = Array.append<Types.User>(event_info.event_organizers,user);
  //             let update_event = {
  //                 profile = event_info.profile;
  //                 status = event_info.status;
  //                 event_organizers = update_event_organizers;
  //                 attendees = event_info.attendees;
  //                 created_at = event_info.created_at;
  //                 updated_at = Time.now();
  //             };
  //             event_put(id,update_event);
  //             return ?(update_event_organizers);
  //         };
  //         case null{
  //             return null;
  //         };
  //     };
  // };

  // public func kickUserToEvent(principal:Principal, id: Nat): async Text{
  //     switch(user_get(principal)){
  //         case(user_info){
  //             let event = event_get(id);
  //             if (Option.isSome(event)){

  //             };
  //         };
  //     };
  // };

  // query func filter_cancelled_events(events: [Types.EventInfo]) : async [Types.EventInfo] {
  //     Array.filter<Types.EventInfo>(events, func(e: Types.EventInfo) : Bool = e.status != #Cancelled);
  // };

  //Random function to test the actor. Please remove it in production.
  public query func getTimeNow() : async DTComponents.Components {
    let date = DateTime.now().toComponents();
    return date;
  };

  public query (msg) func whoAmI() : async Principal {
    return msg.caller;
  };

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
