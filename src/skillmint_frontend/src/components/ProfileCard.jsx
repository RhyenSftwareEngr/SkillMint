function ProfileCard({ profile }) {
  return (
    <div className="profile-card">
      <img src={profile.image} alt={`${profile.name}'s profile`} />
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
      <a href={profile.link} target="_blank" rel="noopener noreferrer">View Profile</a>
    </div>
  );
}       
export default ProfileCard;