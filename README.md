
The app can be accessed here:

Deployment Link: https://instagramlike-stories.vercel.app/

How to Run the App Locally
Clone the repository:

git clone https://github.com/ShikharLohia111/Instagram-Stories.git

cd Instagram-Stories

1. npm install

2. npm start

This will open the app at http://localhost:3000 in your browser.

-----------------------------
How to Run Tests

To run the test suite:

1. npm test

Test are written in jest and react testing library. It covers basic unit tests like rendering,auto navigation after delay,manual navigation,closing of story along with End to end test of all of these combined.

Design and code decisions

The app is optimized for mobile or any other device by using relative units (like vh) and full-screen layouts. 
Tap areas for navigation are based on screen 30% each side.
All components are written in React with TypeScript. No third-party libraries or animation frameworks are used, as per the assignment guidelines.

Images are statically imported and mapped to file names using an object

Currently the app handles the data using JSON but it can be easily replaced with an API if needed.

Auto navigation is created using settimeout timers and mocked using faketimer in test cases.
Navigation transitions are implemented with simple CSS classes for smooth effects.

---------------------------------,
Features Implemented

Story thumbnails with user names

Story viewer that supports multiple stories per user with name of user visible

Auto advance to next story every 5 seconds

Tap left or right to go to previous or next story

Close button to exit the viewer anytime

Fade Transition animations between users

Tests that simulate user interaction and timing

Optimizations:
1. Instead of storing images locally we can use API to get the required data from server
2. To manage the state for larger application we can use redux
