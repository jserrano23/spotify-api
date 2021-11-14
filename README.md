# Spotify API Application

An application made using React and the Spotify API.

Displays newly released albums on main page, and the track list of the respective album on another page.

To be able to play a track, user needs to login to Spotify (can only use playback with a premium account). [.env file with client credentials included. Application may ask for permission to read the information from my own Spotify account, which I do not mind using for this demo.]

Uses a third-party library called `react-spotify-web-playback` to manage the Spotify Web SDK.

---

## To Build and Run

In the project directory, run the following commands in the terminal/command line:

**`npm i`** 
- to download all dependencies

**`npm run build`**
- to build the application

**`npm install -g serve`**  
**`serve -s build`**
- to deploy the application to `http://localhost:3000`

When you would like to stop the server, run **`<Ctrl>+C`** and follow the prompts.