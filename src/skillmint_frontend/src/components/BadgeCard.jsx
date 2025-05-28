function BadgeCard({ badge }) {
  return (
    <div className="badge-card">
      <img src={badge.image} alt={badge.name} className="badge-image" />
      <h3 className="badge-name">{badge.name}</h3>
      <p className="badge-description">{badge.description}</p>
      <span className="badge-level">Level: {badge.level}</span>
    </div>
  );
}   
export default BadgeCard;