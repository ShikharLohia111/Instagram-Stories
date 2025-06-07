import React, { useState, useEffect } from "react";
import StoryDashboard from "./components/StoryDashboard";
import StoryWindow from "./components/StoryWindow";
import { Story } from "./utils/types";
import stories from "./assets/stories.json";

function App() {
  const [users, setUsers] = useState<Story[]>([]);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);

  useEffect(() => {
    setUsers(stories);
  }, []);

  const active = users.find((item) => item.userId === activeUserId) || null;

  return (
    <div>
      <StoryDashboard onUserSelect={setActiveUserId} />
      {active && (
        <StoryWindow
          user={active}
          allUsers={users}
          onClose={() => setActiveUserId(null)}
        />
      )}
    </div>
  );
}

export default App;