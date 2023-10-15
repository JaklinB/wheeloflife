import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-container">
      <h2>Your Guide to Crafting the Wheel of Life</h2>
      <p>
        Welcome to the Wheel of Life, a compass for your life's journey. Here's
        how to craft yours:
      </p>

      <h3>
        <span className="icon">&#x1F50D;</span> Introspection
      </h3>
      <p>
        Begin with introspection. Dedicate some quiet time to genuinely reflect
        on each segment. How do you feel about your career, relationships,
        personal growth?
      </p>

      <h3>
        <span className="icon">&#x1F4DD;</span> Honest Ratings
      </h3>
      <p>
        Rate each segment from 1 to 10. Remember, it's not about perfection, but
        reflection. A '6' in health might mean you feel there's room for
        improvement.
      </p>

      <h3>
        <span className="icon">&#x1F4C8;</span> Setting Goals
      </h3>
      <p>
        For segments with lower scores, set goals. If 'Recreation' is a '5',
        maybe you aim to take up a new hobby or travel more.
      </p>

      <h3>
        <span className="icon">&#x1F4AC;</span> Discuss & Share
      </h3>
      <p>
        Sharing your Wheel with someone can provide a fresh perspective. They
        might see patterns or offer insights you hadn't considered.
      </p>

      <h3>
        <span className="icon">&#x1F4D6;</span> Revisit & Update
      </h3>
      <p>
        Your Wheel is dynamic, just like life. Regularly update your ratings,
        track your progress, and pivot as needed. It's a tool for growth, not
        just assessment.
      </p>

      <h3>
        <span className="icon">&#x1F4D7;</span> Understanding the Scale (1-10)
      </h3>
      <p>The scale is a tool to express how you feel about each segment:</p>
      <ul>
        <li>
          <b>1-3</b> Dissatisfied - Significant improvement needed.
        </li>
        <li>
          <b>4-6</b> Average - There's room for growth.
        </li>
        <li>
          <b>7-8</b> Satisfied - Content but open to improvement.
        </li>
        <li>
          <b>9</b> Very Satisfied - Minor improvements possible.
        </li>
        <li>
          <b>10</b> Thriving - Perfect, no changes needed.
        </li>
      </ul>
      <h3 className="important-heading">
        <span className="icon">&#x1F6A8;</span> Why is it Important?
      </h3>
      <p>
        The Wheel of Life is vital because it helps you gain clarity and insight
        into the various aspects of your life. Here's why it's so valuable:
      </p>
      <div className="important-point">
        <b>Self-Awareness:</b> It promotes self-reflection and self-awareness by
        prompting you to assess your current state in different life areas.
      </div>
      <div className="important-point">
        <b>Balance:</b> It highlights imbalances in your life, allowing you to
        identify areas that need attention and improvement.
      </div>
      <div className="important-point">
        <b>Goal Setting:</b> By assessing each segment, you can set meaningful
        goals and priorities for personal growth and fulfillment.
      </div>
      <div className="important-point">
        <b>Measurable Progress:</b> It provides a measurable way to track your
        progress over time, celebrating achievements and making necessary
        adjustments.
      </div>
      <div className="important-point">
        <b>Improved Decision-Making:</b> It aids in making informed decisions by
        considering the impact on various life areas.
      </div>
      <div className="important-point">
        <b>Fulfillment:</b> Ultimately, it guides you towards a more balanced
        and fulfilling life, where you can thrive in all essential aspects.
      </div>
    </div>
  );
}

export default AboutPage;
