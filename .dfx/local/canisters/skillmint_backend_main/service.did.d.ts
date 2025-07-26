import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Attachment {
  'url' : [] | [string],
  'name' : string,
  'file_type' : string,
}
export interface Attendee {
  'attendee_principal' : Principal,
  'attendee_registration_date' : Time,
}
export interface Badge {
  'image_url' : [] | [string],
  'name' : string,
  'description' : string,
}
export interface Components {
  'day' : bigint,
  'month' : bigint,
  'hour' : bigint,
  'year' : bigint,
  'minute' : bigint,
  'nanosecond' : bigint,
}
export interface Event { 'id' : bigint, 'info' : EventInfo }
export interface EventInfo {
  'status' : EventStatus,
  'updated_at' : Time,
  'created_at' : Time,
  'event_organizers' : Array<Principal>,
  'attendees' : Array<Attendee>,
  'profile' : EventProfile,
}
export type EventMode = { 'Physical' : null } |
  { 'Hybrid' : null } |
  { 'Virtual' : null };
export interface EventProfile {
  'max_attendees' : [] | [bigint],
  'event_end_date' : Time,
  'banner_image' : [] | [string],
  'registration_start' : Time,
  'event_description' : string,
  'tags' : Array<string>,
  'virtual_link' : [] | [string],
  'event_location' : [] | [Location],
  'event_detail' : string,
  'badge' : Badge,
  'registration_end' : Time,
  'event_date' : Time,
  'event_mode' : EventMode,
  'event_name' : string,
  'attachments' : Array<Attachment>,
}
export type EventStatus = { 'Ongoing' : null } |
  { 'Cancelled' : null } |
  { 'Completed' : null } |
  { 'Upcoming' : null };
export interface File {
  'id' : bigint,
  'content' : Uint8Array | number[],
  'name' : string,
  'filefile_type' : string,
  'uploaded_at' : Time,
}
export interface Location {
  'street' : [] | [string],
  'country' : string,
  'bldg' : [] | [string],
  'brgy' : [] | [string],
  'city' : string,
  'establishment' : [] | [string],
  'zipcode' : [] | [string],
}
export type Time = bigint;
export interface User { 'principal' : Principal, 'info' : UserInfo }
export interface UserInfo {
  'updated_at' : Time,
  'badges' : Array<{ 'badge' : Badge, 'event_id' : bigint }>,
  'created_at' : Time,
  'events_created' : Array<bigint>,
  'events_attending' : Array<bigint>,
  'profile' : UserProfile,
}
export interface UserProfile {
  'bio' : [] | [string],
  'profile_image' : [] | [string],
  'email' : string,
  'affiliation' : Array<string>,
  'first_name' : string,
  'last_name' : string,
  'phone' : string,
  'skills' : Array<string>,
  'location' : [] | [Location],
  'social_links' : Array<{ 'url' : string, 'platform' : string }>,
}
export interface _SERVICE {
  'addDemoEvents' : ActorMethod<[], undefined>,
  'addEvent' : ActorMethod<[EventProfile], bigint>,
  'addUser' : ActorMethod<[Principal, UserProfile], undefined>,
  'getEvent' : ActorMethod<[bigint], [] | [Event]>,
  'getEvents' : ActorMethod<[], Array<Event>>,
  'getFile' : ActorMethod<[bigint], [] | [File]>,
  'getTimeNow' : ActorMethod<[], Components>,
  'getUpcomingEvents' : ActorMethod<[], Array<Event>>,
  'getUser' : ActorMethod<[Principal], [] | [User]>,
  'getUsers' : ActorMethod<[], Array<User>>,
  'greet' : ActorMethod<[string], string>,
  'updateUserProfile' : ActorMethod<[Principal, UserProfile], boolean>,
  'uploadFile' : ActorMethod<[string, Uint8Array | number[], string], bigint>,
  'whoAmI' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
