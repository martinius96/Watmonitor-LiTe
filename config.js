//PUT YOUR FIREBASE REALTIME DATABASE URL HERE (IN JSON FORMAT!!!)
const firebaseURL = "https://watmonitor-lite-default-rtdb.europe-west1.firebasedatabase.app/.json";

const LITER_PER_CM = 5.0265; // Uprav podľa potreby

async function updateData() {
    try {
        const response = await fetch(firebaseURL);
        if (!response.ok) throw new Error("Chyba pripojenia");
        
        const data = await response.json();
        if (!data) return;

        // Predpokladáme, že v DB máš kľúče "level" a "timestamp"
        const level = parseFloat(data.level) || 0;
        const timestamp = data.timestamp;

        // 1. Výpočet litrov
        const liters = (level * LITER_PER_CM).toFixed(2);

        // 2. Prevod času na lokálny formát OS
        // Funguje pre ISO string, UNIX timestamp aj bežný dátum
        const localTime = new Date(timestamp).toLocaleString([], {
            day: '2. digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });

        // 3. Zápis do HTML (podľa ID-čiek, ktoré sme si dohodli)
        document.getElementById('val-level').innerText = level + " cm";
        document.getElementById('val-volume').innerText = liters + " liters";
        document.getElementById('val-time').innerText = localTime;

        console.log("Dáta zaktualizované:", { level, liters, localTime });

    } catch (error) {
        console.error("Chyba pri načítaní dát:", error);
    }
}

// Spustiť hneď pri načítaní stránky
updateData();

setInterval(updateData, 15000);
