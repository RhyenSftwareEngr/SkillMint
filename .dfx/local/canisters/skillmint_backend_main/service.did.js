export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Location = IDL.Record({
    'street' : IDL.Opt(IDL.Text),
    'country' : IDL.Text,
    'bldg' : IDL.Opt(IDL.Text),
    'brgy' : IDL.Opt(IDL.Text),
    'city' : IDL.Text,
    'establishment' : IDL.Opt(IDL.Text),
    'zipcode' : IDL.Opt(IDL.Text),
  });
  const Badge = IDL.Record({
    'image_url' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const EventMode = IDL.Variant({
    'Physical' : IDL.Null,
    'Hybrid' : IDL.Null,
    'Virtual' : IDL.Null,
  });
  const Attachment = IDL.Record({
    'url' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'file_type' : IDL.Text,
  });
  const EventProfile = IDL.Record({
    'max_attendees' : IDL.Opt(IDL.Nat),
    'event_end_date' : Time,
    'banner_image' : IDL.Opt(IDL.Text),
    'registration_start' : Time,
    'event_description' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'virtual_link' : IDL.Opt(IDL.Text),
    'event_location' : IDL.Opt(Location),
    'event_detail' : IDL.Text,
    'badge' : Badge,
    'registration_end' : Time,
    'event_date' : Time,
    'event_mode' : EventMode,
    'event_name' : IDL.Text,
    'attachments' : IDL.Vec(Attachment),
  });
  const UserProfile = IDL.Record({
    'bio' : IDL.Opt(IDL.Text),
    'profile_image' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'affiliation' : IDL.Vec(IDL.Text),
    'first_name' : IDL.Text,
    'last_name' : IDL.Text,
    'phone' : IDL.Text,
    'skills' : IDL.Vec(IDL.Text),
    'location' : IDL.Opt(Location),
    'social_links' : IDL.Vec(
      IDL.Record({ 'url' : IDL.Text, 'platform' : IDL.Text })
    ),
  });
  const EventStatus = IDL.Variant({
    'Ongoing' : IDL.Null,
    'Cancelled' : IDL.Null,
    'Completed' : IDL.Null,
    'Upcoming' : IDL.Null,
  });
  const Attendee = IDL.Record({
    'attendee_principal' : IDL.Principal,
    'attendee_registration_date' : Time,
  });
  const EventInfo = IDL.Record({
    'status' : EventStatus,
    'updated_at' : Time,
    'created_at' : Time,
    'event_organizers' : IDL.Vec(IDL.Principal),
    'attendees' : IDL.Vec(Attendee),
    'profile' : EventProfile,
  });
  const Event = IDL.Record({ 'id' : IDL.Nat, 'info' : EventInfo });
  const File = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'filefile_type' : IDL.Text,
    'uploaded_at' : Time,
  });
  const Components = IDL.Record({
    'day' : IDL.Nat,
    'month' : IDL.Nat,
    'hour' : IDL.Nat,
    'year' : IDL.Int,
    'minute' : IDL.Nat,
    'nanosecond' : IDL.Nat,
  });
  const UserInfo = IDL.Record({
    'updated_at' : Time,
    'badges' : IDL.Vec(IDL.Record({ 'badge' : Badge, 'event_id' : IDL.Nat })),
    'created_at' : Time,
    'events_created' : IDL.Vec(IDL.Nat),
    'events_attending' : IDL.Vec(IDL.Nat),
    'profile' : UserProfile,
  });
  const User = IDL.Record({ 'principal' : IDL.Principal, 'info' : UserInfo });
  return IDL.Service({
    'addDemoEvents' : IDL.Func([], [], []),
    'addEvent' : IDL.Func([EventProfile], [IDL.Nat], []),
    'addUser' : IDL.Func([IDL.Principal, UserProfile], [], []),
    'getEvent' : IDL.Func([IDL.Nat], [IDL.Opt(Event)], ['query']),
    'getEvents' : IDL.Func([], [IDL.Vec(Event)], ['query']),
    'getFile' : IDL.Func([IDL.Nat], [IDL.Opt(File)], ['query']),
    'getTimeNow' : IDL.Func([], [Components], ['query']),
    'getUpcomingEvents' : IDL.Func([], [IDL.Vec(Event)], ['query']),
    'getUser' : IDL.Func([IDL.Principal], [IDL.Opt(User)], ['query']),
    'getUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'updateUserProfile' : IDL.Func(
        [IDL.Principal, UserProfile],
        [IDL.Bool],
        [],
      ),
    'uploadFile' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8), IDL.Text],
        [IDL.Nat],
        [],
      ),
    'whoAmI' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
