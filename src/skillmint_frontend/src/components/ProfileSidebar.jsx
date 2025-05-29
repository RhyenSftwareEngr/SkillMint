import React from "react";
import styles from "./ProfileSidebar.module.css";

function ProfileSidebar() {
  return (
    <aside className={styles.profileSidebar}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}></div>
        <h3 className={styles.name}>User Name</h3>
        <div className={styles.badges}>
          {/* Example badges */}
          <span className={styles.badge}>🏅</span>
          <span className={styles.badge}>🎓</span>
        </div>
      </div>
      {/* Add more profile info or quick actions here */}
    </aside>
  );
}

export default ProfileSidebar;