import React from "react";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.upcomingSection}>
        <h3 className={styles.heading}>My Upcoming Events</h3>
        <input className={styles.search} placeholder="🔍" />
        <ul className={styles.eventList}>
          <li className={styles.eventCard}>
            <div className={styles.eventDate}>
              <span className={styles.day}>6</span>
              <span className={styles.month}>June</span>
            </div>
            <div className={styles.eventInfo}>
              <div className={styles.eventTitle}>Hackathon – Philippine Blockchain Week 2025</div>
              <div className={styles.eventTime}>May 26, 2025 • 5:00PM - 8:00PM</div>
            </div>
          </li>
          {/* Repeat <li> for each event */}
          <li className={styles.eventCard}>
            <div className={styles.eventDate}>
              <span className={styles.day}>7</span>
              <span className={styles.month}>June</span>
            </div>
            <div className={styles.eventInfo}>
              <div className={styles.eventTitle}>Hackathon – Philippine Blockchain Week 2025</div>
              <div className={styles.eventTime}>May 26, 2025 • 5:00PM - 8:00PM</div>
            </div>
          </li>
          <li className={styles.eventCard}>
            <div className={styles.eventDate}>
              <span className={styles.day}>8</span>
              <span className={styles.month}>June</span>
            </div>
            <div className={styles.eventInfo}>
              <div className={styles.eventTitle}>Hackathon – Philippine Blockchain Week 2025</div>
              <div className={styles.eventTime}>May 26, 2025 • 5:00PM - 8:00PM</div>
            </div>
          </li>
          <li className={styles.eventCard}>
            <div className={styles.eventDate}>
              <span className={styles.day}>9</span>
              <span className={styles.month}>June</span>
            </div>
            <div className={styles.eventInfo}>
              <div className={styles.eventTitle}>Hackathon – Philippine Blockchain Week 2025</div>
              <div className={styles.eventTime}>May 26, 2025 • 5:00PM - 8:00PM</div>
            </div>
          </li>
        </ul>
        <a href="#" className={styles.showAll}>Show All</a>
      </div>
      <div className={styles.calendarSection}>
        <h4 className={styles.calendarHeading}>May 2025</h4>
        <div className={styles.calendarWidget}>
          {/* Replace with your calendar component or static calendar */}
          <table className={styles.calendarTable}>
            <thead>
              <tr>
                <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {/* Render calendar days here */}
              <tr>
                <td></td><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td>
              </tr>
              <tr>
                <td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td>
              </tr>
              <tr>
                <td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td>
              </tr>
              <tr>
                <td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td>
              </tr>
              <tr>
                <td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <a href="#" className={styles.showCalendar}>Show Calendar</a>
      </div>
    </aside>
  );
}

export default Sidebar;