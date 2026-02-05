# Watmonitor - LiTe
* Lightweight open-source version of Watmonitor dashboard
* No backend (webserver) required
* One-page client-side webapp
* Database handled by Firebase Realtime Database (cloud-based)
* Possible to visualise the latest sensor data - water level / bulk material height or other
* **Lite version does not include time-series data or visualisation with graphs**
* Test interface: https://martinius96.github.io/Watmonitor-LiTe/
* 
# Instructions
* Create FireBase Project: https://console.firebase.google.com/u/0/
* Gemini / Analytics are not required
* Navigate to: Build --> Realtime Database
* Create Database, Select Test Mode
* Copy URL, add .json at the end
* For instance --> https://myapp-default-rtdb.europe-west1.firebasedatabase.app/.json
* Put it into config.js file
* Enjoy your first data in HTML5 webapp
<img width="1313" height="448" alt="image" src="https://github.com/user-attachments/assets/4904be52-7ffc-4558-9d65-5d131246e2ad" />
