import React, { useEffect, useState } from "react";
import "./StoryWindow.css";
import story1 from "../assets/story1.jpg";
import story2 from "../assets/story2.jpg";
import story3 from "../assets/story3.jpg";
import story4 from "../assets/story4.jpg";
import story5 from "../assets/story5.jpg";
import story6 from "../assets/story6.jpg";
import { Story } from "../utils/types";

const images: { [key: string]: string } = {
    "story1.jpg": story1,
    "story2.jpg": story2,
    "story3.jpg": story3,
    "story4.jpg": story4,
    "story5.jpg": story5,
    "story6.jpg": story6
};

interface Props {
    user: Story;
    allUsers: Story[];
    onClose: () => void;
}

const StoryWindow: React.FC<Props> = ({ user, allUsers, onClose }) => {
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(() => allUsers.findIndex(item => item.userId === user.userId));

    const currentUser = allUsers[currentIndex];
    const currentStory = currentUser.stories[index];

    //Handle next as soon as first image opens
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleNext();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [index, currentIndex]);

    const handleLoading = () => setLoading(false);
    const [transitioning, setTransitioning] = useState(false);

    const handleNext = () => {
        setLoading(true);
        if (index < currentUser.stories.length - 1) {
            setIndex(index + 1);
        } else if (currentIndex < allUsers.length - 1) {
            setTransitioning(true);
            setTimeout(() => { // For transition
                setCurrentIndex(currentIndex + 1);
                setIndex(0);
                setTransitioning(false);
            }, 300);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        setLoading(true);
        if (index > 0) {
            setIndex(index - 1);
        } else if (currentIndex > 0) {
            setTransitioning(true);
            setTimeout(() => {
                const prevUserIndex = currentIndex - 1;
                setCurrentIndex(prevUserIndex);
                setIndex(allUsers[prevUserIndex].stories.length - 1);
                setTransitioning(false);
            },300)
        } else {
            onClose();
        }
    };

    return (
        <div className="story-window">
            <button className="close" onClick={onClose}>×</button>
            <div className="viewer-header" data-testid="viewer-header">
                {currentUser.userName}
            </div>
            {loading && <div className="loader">Loading...</div>}
            <div className="story-touch-area">
                <div className="left" data-testid="left-tap" onClick={handlePrevious}></div> 
                <div className="right" data-testid="right-tap" onClick={handleNext}></div>
                <img
                    src={images[currentStory.url]}
                    alt={`Story ${currentStory.id}`}
                    onLoad={handleLoading}
                    className={`story-image ${loading || transitioning ? "fade-out" : "visible"}`}
                />
            </div>
        </div>
    );
};

export default StoryWindow;
