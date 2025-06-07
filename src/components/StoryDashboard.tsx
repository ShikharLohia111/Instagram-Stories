import React, { useEffect, useState } from "react";
import { Story } from "../utils/types";
import "./StoryDashboard.css";
import storyData from "../assets/stories.json";
import story1 from "../assets/story1.jpg";
import story2 from "../assets/story2.jpg";
import story3 from "../assets/story3.jpg";
import story4 from "../assets/story4.jpg";
import story5 from "../assets/story5.jpg";
import story6 from "../assets/story6.jpg";

const imageMap: { [key: string]: string } = {
  "story1.jpg": story1,
  "story2.jpg": story2,
  "story3.jpg": story3,
  "story4.jpg": story4,
  "story5.jpg": story5,
  "story6.jpg": story6
};

type Props ={
  onUserSelect: (userId: number) => void;
}

const StoryDashboard: React.FC<Props> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<Story[]>([]);

  useEffect(() => {
    setUsers(storyData);
  }, []);

  return (
    <div>
      <div className="header-container">
        <h2 className="header">Instagram Stories</h2>
      </div>

      <div className="horizontal-line" />

      <div className="story-list">
        {users.map((user) => (
          <div
            key={user.userId}
            className="story-thumbnail"
            data-testid={`thumbnail-${user.userId}`}
            onClick={() => onUserSelect(user.userId)}
          >
            <img src={imageMap[user.stories[0].url]} alt={user.userName} />
            <p className="story-name">{user.userName}</p>
          </div>

        ))}
      </div>

      <div className="horizontal-line" />
    </div>
  );
};

export default StoryDashboard;
