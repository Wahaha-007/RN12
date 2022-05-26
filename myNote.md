1. Navigation
   npm install @react-navigation/native @react-navigation/native-stack

2. Expo image picker
   ref: https://docs.expo.dev/versions/v45.0.0/sdk/imagepicker/
   expo install expo-image-picker

3. Expo Location
   ref : https://docs.expo.dev/versions/latest/sdk/location/  
   expo install expo-location

4. Log-in into Google Static MAP API (Can be costly)
   API Key : AIzaSyD1aRsDeYHnlUa-tyuImqzZRskJR9yhAM0

5. DOTENV ( https://www.npmjs.com/package/react-native-dotenv )

Step 1: $ npm install react-native-dotenv

Step 2: Add content to file babel.config.js
plugins: ['module:react-native-dotenv'],

Step 3: Create .env file
API_TOKEN=abc123

Step 4: import to use
import {API_TOKEN} from "@env"

Step 5: (Optional Check)

- include .env into .gitignore
- expo r -c to clear Metro cache and restart bundle again

6. Expo MapView
   ref: https://docs.expo.dev/versions/latest/sdk/map-view/
   https://github.com/react-native-maps/react-native-maps
   expo install react-native-maps

7. SQLite Database
   ref: https://docs.expo.dev/versions/latest/sdk/sqlite/
   expo install expo-sqlite

8. App Loading Screen
   expo install expo-app-loading
