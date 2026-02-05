//PUT YOUR FIREBASE REALTIME DATABASE URL HERE (IN JSON FORMAT!!!)
const firebaseURL = "https://watmonitor-lite-default-rtdb.europe-west1.firebasedatabase.app/.json";

async function updateData() {
    try {
        const response = await fetch(firebaseURL);
        if (!response.ok) throw new Error("Connection problem");
        
        const data = await response.json();
        if (!data) return;

        const level = parseFloat(data.level) || 0;

        //CALCULATION
        const diameter = 80; //set diameter of well in CM
        const depth = 400; //set waterwell depth in CM if your sensor is measuring from the top to waterwell (differential measurement), set to 0, if you are sending total measurement (from bottom of the well to water level)
        const radius = diameter / 2;
        let total_level;
        if (depth > 0){ //DIFFERENTIAL MEASUREMENT (ULTRASONIC, RADAR)
        total_level = level;
        }else{ //TOTAL MEASUREMENT (PRESSURE SENSOR, HYDROSTATIC PRESSURE)
        total_level = depth - level;    
        }
        const liters = (Math.PI * Math.pow(radius, 2) * total_level / 1000).toFixed(2);
        document.getElementById('val-level').innerText = level + " cm";
        document.getElementById('val-volume').innerText = liters + " liters";

        console.log("Data updated:", { level, liters});

    } catch (error) {
        console.error("Error at data obtaining:", error);
    }
}

//Run onload
updateData();

setInterval(updateData, 15000);
