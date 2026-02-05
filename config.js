//Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

//SET CONFIGURATION FOR FIREBASE HERE!
const firebaseConfig = {
  apiKey: "TVOJ_API_KEY",
  authDomain: "PROJEKT.firebaseapp.com",
  databaseURL: "https://PROJEKT-DEFAULT-RTDB.firebaseio.com",
  projectId: "PROJEKT-ID",
  storageBucket: "PROJEKT.appspot.com",
  messagingSenderId: "ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Reference - trace to data
const dataRef = ref(db, 'tvoja_cesta_k_datam');

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Parse data for key - level
    const rawLevel = parseFloat(data.level); 
    const rawTimestamp = data.timestamp; // Očakáva sa ISO formát alebo Unix milisekundy

    const calculatedVolume = (rawLevel * LITER_PER_CM).toFixed(2);

    // 3. Konverzia času na lokálny formát OS
    const localTime = new Date(rawTimestamp).toLocaleString([], {
        day: '2. digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });

    // 4. Dynamické prepísanie HTML elementov
    document.getElementById('val-level').innerText = `${rawLevel} cm`;
    document.getElementById('val-volume').innerText = `${calculatedVolume} liters`;
    document.getElementById('val-time').innerText = localTime;

    console.log("Dáta úspešne aktualizované.");
});
