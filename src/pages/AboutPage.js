import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-container">
      <h2>About Wheel of Life</h2>
      <p>
        The Wheel of Life is a simple yet powerful tool for visualizing all
        areas of your life at once to see where you most need improvement. It
        provides a holistic view of your life and helps identify areas that need
        more attention.
      </p>

      <h3>Benefits</h3>
      <ul>
        <li>Gain clarity on your life's balance.</li>
        <li>Identify areas that need improvement.</li>
        <li>Track your progress over time.</li>
        <li>Set clear goals for each life segment.</li>
      </ul>

      <h3>Tips and Tricks</h3>
      <p>When creating your Wheel of Life, consider the following tips:</p>
      <ul>
        <li>Be honest with yourself.</li>
        <li>
          Rate each segment based on your current state, not where you want to
          be.
        </li>
        <li>Revisit your wheel regularly to track progress.</li>
      </ul>

      <h3>How to Rate Each Segment</h3>
      <p>
        Each segment represents a part of your life. Rate each segment on a
        scale of 1 to 10, where 1 means you're completely dissatisfied and 10
        means you're fully satisfied. Remember, it's okay if not all segments
        are perfect. The goal is to identify areas for growth and improvement.
      </p>
    </div>
  );
}

export default AboutPage;
