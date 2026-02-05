//PUT YOUR FIREBASE REALTIME DATABASE URL HERE (IN JSON FORMAT!!!)
const firebaseURL = "https://watmonitor-lite-default-rtdb.europe-west1.firebasedatabase.app/.json";

async function updateData() {
    try {
        const response = await fetch(firebaseURL);
        if (!response.ok) throw new Error("Chyba pripojenia");
        
        const data = await response.json();
        if (!data) return;

        // Predpokladáme, že v DB máš kľúče "level" a "timestamp"
        const level = parseFloat(data.level) || 0;

        //CALCULATION
        const diameter = 80; //set diameter of well in CM
        const depth = 400; //set waterwell depth in CM
        const radius = diameter / 2;
        const liters = (Math.PI * Math.pow(radius, 2) * level / 1000).toFixed(2);
        
        document.getElementById('val-level').innerText = level + " cm";
        document.getElementById('val-volume').innerText = liters + " liters";

        console.log("Data updated:", { level, liters});

    } catch (error) {
        console.error("Error at data obtaining:", error);
    }
}

// Spustiť hneď pri načítaní stránky
updateData();

setInterval(updateData, 15000);
