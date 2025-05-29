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

    public type User = {
        principal: Principal;
        info: UserInfo;
    };

    public type UserStorage = {
        users: [User];
    }
}