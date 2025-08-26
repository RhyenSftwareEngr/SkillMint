import Types "types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Array "mo:base/Array";
import DateTime "mo:datetime/DateTime";
import DTComponents "mo:datetime/Components";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import Order "mo:base/Order";
import Blob "mo:base/Blob";

actor Main {
  stable var users : [Types.User] = [];
  stable var events : [Types.Event] = [];
  stable var next_event_id : Nat = 1;
  stable var files : [Types.File] = [];
  stable var next_file_id : Nat = 0;

  // Add a demo badge definition
  let demoBadge : Types.Badge = {
    name = "SkillMint Pioneer";
    description = "Awarded for being an early user of SkillMint.";
    image_url = ?"https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
  };

  // Add a new event
  public func addEvent(profile : Types.EventProfile) : async Nat {
    let id = next_event_id;
    next_event_id += 1;
    let event : Types.Event = {
      id = id;
      info = {
        profile = profile;
        status = #Upcoming;
        event_organizers = [];
        attendees = [];
        created_at = Time.now();
        updated_at = Time.now();
      };
    };
    events := Array.append<Types.Event>(events, [event]);
    return id;
  };

  // Get all events
  public query func getEvents() : async [Types.Event] {
    return events;
  };

  // Get a single event by ID
  public query func getEvent(id : Nat) : async ?Types.Event {
    Array.find<Types.Event>(events, func(e) = e.id == id);
  };

  // Get 15 upcoming events, sorted by event_date
  public query func getUpcomingEvents() : async [Types.Event] {
    let sorted : [Types.Event] = Array.sort<Types.Event>(
      events,
      func(a : Types.Event, b : Types.Event) : Order.Order {
        Int.compare(a.info.profile.event_date, b.info.profile.event_date);
      },
    );
    return Array.take<Types.Event>(sorted, 15);
  };

  // Add a new user
  public func addUser(principal : Principal, profile : Types.UserProfile) : async () {
    let user : Types.User = {
      principal = principal;
      info = {
        profile = profile;
        badges = [{ badge = demoBadge; event_id = 0 }];
        events_created = [];
        events_attending = [];
        created_at = Time.now();
        updated_at = Time.now();
      };
    };
    users := Array.append<Types.User>(users, [user]);
  };

  // Get all users
  public query func getUsers() : async [Types.User] {
    return users;
  };

  // Get a single user by principal
  public query func getUser(principal : Principal) : async ?Types.User {
    Array.find<Types.User>(users, func(u) = u.principal == principal);
  };

  // Update a user's profile
  public func updateUserProfile(principal : Principal, profile : Types.UserProfile) : async Bool {
    var updated = false;
    users := Array.map<Types.User, Types.User>(
      users,
      func(u) {
        if (u.principal == principal) {
          updated := true;
          {
            principal = u.principal;
            info = {
              profile = profile;
              badges = u.info.badges;
              events_created = u.info.events_created;
              events_attending = u.info.events_attending;
              created_at = u.info.created_at;
              updated_at = Time.now();
              agent = Agent.initialize()
            };
          };
        } else {
          u;
        };
      },
    );
    return updated;
  };

  // Utility/test functions
  public query func getTimeNow() : async DTComponents.Components {
    DateTime.now().toComponents();
  };

  public query (msg) func whoAmI() : async Principal {
    msg.caller;
  };

  public func greet(name : Text) : async Text {
    "Hello, " # name # "!";
  };

  // Add demo events for testing
  public func addDemoEvents() : async () {
    let now = Time.now();
    let day = 86400_000_000_000;
    let demoEvents : [Types.EventProfile] = [
      {
        event_name = "Hackathon – Philippine Blockchain Week 2025";
        event_description = "The premier blockchain hackathon in the Philippines.";
        event_detail = "Compete with the best minds in blockchain and win amazing prizes.";
        event_date = now + 1 * day;
        event_end_date = now + 2 * day;
        event_mode = #Hybrid;
        event_location = ?{
          establishment = ?"SMX Convention Center";
          bldg = ?"Halls 1-3";
          street = ?"Seaside Blvd";
          brgy = null;
          zipcode = ?"1300";
          city = "Pasay";
          country = "Philippines";
        };
        virtual_link = ?"https://blockchainweek.ph/hackathon";
        registration_start = now;
        registration_end = now + 12 * 60 * 60 * 1_000_000_000;
        max_attendees = ?200;
        tags = ["hackathon", "blockchain", "philippines"];
        badge = {
          name = "Blockchain Champion";
          description = "Awarded to the top team.";
          image_url = ?"https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        };
        banner_image = ?"https://images.unsplash.com/photo-1461749280684-dccba630e2f6";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "Web3 Bootcamp Manila";
        event_description = "Learn to build on Web3 in Manila.";
        event_detail = "A week-long bootcamp for aspiring Web3 developers.";
        event_date = now + 5 * day;
        event_end_date = now + 6 * day;
        event_mode = #Virtual;
        event_location = null;
        virtual_link = ?"https://web3manila.com/bootcamp";
        registration_start = now;
        registration_end = now + 4 * day;
        max_attendees = ?150;
        tags = ["web3", "bootcamp", "manila"];
        badge = {
          name = "Web3 Graduate";
          description = "Completed the Web3 Bootcamp.";
          image_url = ?"https://images.unsplash.com/photo-1519389950473-47ba0277781c";
        };
        banner_image = ?"https://images.unsplash.com/photo-1519389950473-47ba0277781c";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },

      {
        event_name = "AI for Good Summit";
        event_description = "AI for social impact and innovation.";
        event_detail = "Talks and workshops on using AI for positive change.";
        event_date = now + 10 * day;
        event_end_date = now + 11 * day;
        event_mode = #Physical;
        event_location = ?{
          establishment = ?"Ateneo de Manila";
          bldg = ?"Science Building";
          street = ?"Katipunan Ave";
          brgy = null;
          zipcode = ?"1108";
          city = "Quezon City";
          country = "Philippines";
        };
        virtual_link = null;
        registration_start = now;
        registration_end = now + 9 * day;
        max_attendees = ?300;
        tags = ["AI", "summit", "social good"];
        badge = {
          name = "AI Advocate";
          description = "Participated in the AI for Good Summit.";
          image_url = ?"https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        };
        banner_image = ?"https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "NFT Art Expo";
        event_description = "Explore the world of NFT art.";
        event_detail = "Showcase and discover digital art and collectibles.";
        event_date = now + 7 * day;
        event_end_date = now + 7 * day + 8 * 60 * 60 * 1_000_000_000;
        event_mode = #Hybrid;
        event_location = ?{
          establishment = ?"SM Aura";
          bldg = null;
          street = ?"McKinley Pkwy";
          brgy = null;
          zipcode = ?"1630";
          city = "Taguig";
          country = "Philippines";
        };
        virtual_link = ?"https://expo.nft.com/live";
        registration_start = now;
        registration_end = now + 6 * day;
        max_attendees = ?150;
        tags = ["NFT", "art", "expo"];
        badge = {
          name = "NFT Explorer";
          description = "Visited the NFT Art Expo.";
          image_url = ?"https://images.unsplash.com/photo-1507842217343-583bb7270b66";
        };
        banner_image = ?"https://images.unsplash.com/photo-1507842217343-583bb7270b66";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "DeFi Builders Meetup";
        event_description = "Meet DeFi developers and builders.";
        event_detail = "Network and share ideas on decentralized finance.";
        event_date = now + 3 * day;
        event_end_date = now + 3 * day + 6 * 60 * 60 * 1_000_000_000;
        event_mode = #Physical;
        event_location = ?{
          establishment = ?"Makati Shangri-La";
          bldg = null;
          street = ?"Ayala Ave";
          brgy = null;
          zipcode = ?"1226";
          city = "Makati";
          country = "Philippines";
        };
        virtual_link = null;
        registration_start = now;
        registration_end = now + 2 * day;
        max_attendees = ?80;
        tags = ["DeFi", "meetup", "networking"];
        badge = {
          name = "DeFi Networker";
          description = "Attended the DeFi Builders Meetup.";
          image_url = ?"https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
        };
        banner_image = ?"https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "Solidity Crash Course";
        event_description = "Intensive course on Solidity smart contracts.";
        event_detail = "Hands-on sessions for beginners and intermediates.";
        event_date = now + 12 * day;
        event_end_date = now + 13 * day;
        event_mode = #Virtual;
        event_location = null;
        virtual_link = ?"https://soliditycourse.com/join";
        registration_start = now;
        registration_end = now + 11 * day;
        max_attendees = ?120;
        tags = ["Solidity", "course", "blockchain"];
        badge = {
          name = "Solidity Starter";
          description = "Completed the Solidity Crash Course.";
          image_url = ?"https://images.unsplash.com/photo-1507358522600-9f71e620c44e";
        };
        banner_image = ?"https://images.unsplash.com/photo-1507358522600-9f71e620c44e";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "Women in Tech Forum";
        event_description = "Forum for women in technology and innovation.";
        event_detail = "Panel discussions and networking opportunities.";
        event_date = now + 15 * day;
        event_end_date = now + 15 * day + 4 * 60 * 60 * 1_000_000_000;
        event_mode = #Physical;
        event_location = ?{
          establishment = ?"UP Town Center";
          bldg = null;
          street = ?"Katipunan Ave";
          brgy = null;
          zipcode = ?"1108";
          city = "Quezon City";
          country = "Philippines";
        };
        virtual_link = null;
        registration_start = now;
        registration_end = now + 14 * day;
        max_attendees = ?200;
        tags = ["women", "tech", "forum"];
        badge = {
          name = "Tech Advocate";
          description = "Participated in the Women in Tech Forum.";
          image_url = ?"https://images.unsplash.com/photo-1506744038136-46273834b3fb";
        };
        banner_image = ?"https://images.unsplash.com/photo-1506744038136-46273834b3fb";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "Polkadot Builders Day";
        event_description = "A day for Polkadot ecosystem builders.";
        event_detail = "Workshops and networking for Polkadot devs.";
        event_date = now + 18 * day;
        event_end_date = now + 18 * day + 6 * 60 * 60 * 1_000_000_000;
        event_mode = #Hybrid;
        event_location = ?{
          establishment = ?"The Globe Tower";
          bldg = null;
          street = ?"32nd St";
          brgy = null;
          zipcode = ?"1634";
          city = "Taguig";
          country = "Philippines";
        };
        virtual_link = ?"https://polkadot.builders/live";
        registration_start = now;
        registration_end = now + 17 * day;
        max_attendees = ?90;
        tags = ["Polkadot", "builders", "workshop"];
        badge = {
          name = "Polkadot Builder";
          description = "Joined the Polkadot Builders Day.";
          image_url = ?"https://images.unsplash.com/photo-1519125323398-675f0ddb6308";
        };
        banner_image = ?"https://images.unsplash.com/photo-1519125323398-675f0ddb6308";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "Startup Pitch Night";
        event_description = "Pitch your startup to investors and mentors.";
        event_detail = "Get feedback and funding opportunities.";
        event_date = now + 20 * day;
        event_end_date = now + 20 * day + 3 * 60 * 60 * 1_000_000_000;
        event_mode = #Physical;
        event_location = ?{
          establishment = ?"DLSU Manila";
          bldg = ?"Henry Sy Sr. Hall";
          street = ?"Taft Ave";
          brgy = null;
          zipcode = ?"1004";
          city = "Manila";
          country = "Philippines";
        };
        virtual_link = null;
        registration_start = now;
        registration_end = now + 19 * day;
        max_attendees = ?60;
        tags = ["startup", "pitch", "investors"];
        badge = {
          name = "Startup Star";
          description = "Pitched at Startup Pitch Night.";
          image_url = ?"https://images.unsplash.com/photo-1519389950473-47ba0277781c";
        };
        banner_image = ?"https://images.unsplash.com/photo-1519389950473-47ba0277781c";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
      {
        event_name = "Blockchain for Social Impact";
        event_description = "Conference on blockchain for social good.";
        event_detail = "Talks and panels on blockchain impact.";
        event_date = now + 25 * day;
        event_end_date = now + 26 * day;
        event_mode = #Virtual;
        event_location = null;
        virtual_link = ?"https://blockchainimpact.com/live";
        registration_start = now;
        registration_end = now + 24 * day;
        max_attendees = ?500;
        tags = ["blockchain", "social", "conference"];
        badge = {
          name = "Impact Maker";
          description = "Attended Blockchain for Social Impact.";
          image_url = ?"https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        };
        banner_image = ?"https://images.unsplash.com/photo-1465101046530-73398c7f28ca";
        attachments = [
          {
            name = "Hackathon_Rules.pdf";
            url = ?"https://example.com/Hackathon_Rules.pdf";
            file_type = "pdf";
          },
          {
            name = "Schedule.xlsx";
            url = ?"https://example.com/Schedule.xlsx";
            file_type = "xlsx";
          },
        ];
      },
    ];
    for (profile in demoEvents.vals()) {
      ignore addEvent(profile);
    };
  };

  // Upload a file and return its ID
  public func uploadFile(name : Text, content : [Nat8], filefile_type : Text) : async Nat {
    let id = next_file_id;
    next_file_id += 1;
    let file : Types.File = {
      id = id;
      name = name;
      content = content;
      filefile_type = filefile_type;
      uploaded_at = Time.now();
    };
    files := Array.append<Types.File>(files, [file]);
    return id;
  };

  // Retrieve a file by ID
  public query func getFile(id : Nat) : async ?Types.File {
    Array.find<Types.File>(files, func(f) = f.id == id);
  };
};
