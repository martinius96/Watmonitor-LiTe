import network
import time
import urequests
from machine import Pin
import utime
import json

# --- CONFIG ---
WIFI_SSID = "MY WIFI SSID"
WIFI_PASS = "MY WIFI PASSWORD"
# SET YOUR FIREBASE REALTIME DATABASE URL HERE!
URL = "https://watmonitor-lite-default-rtdb.europe-west1.firebasedatabase.app/.json"

# --- PINS (HC-SR04) ---
TRIG = Pin(3, Pin.OUT)
ECHO = Pin(2, Pin.IN)

# --- PRIPOJENIE NA WIFI ---
def wifi_connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Pripájam sa na WiFi...")
        wlan.connect(WIFI_SSID, WIFI_PASS)
        while not wlan.isconnected():
            time.sleep(0.5)
            print(".", end="")
    print("\nConnected! IP:", wlan.ifconfig()[0])

def measure_distance():
    TRIG.low()
    utime.sleep_us(2)
    TRIG.high()
    utime.sleep_us(10)
    TRIG.low()

    signaloff = 0
    signalon = 0

    # Čakanie na odozvu s poistkou
    timeout_start = utime.ticks_us()
    while ECHO.value() == 0:
        signaloff = utime.ticks_us()
        if utime.ticks_diff(signaloff, timeout_start) > 50000: # 50ms timeout
            return 0
            
    while ECHO.value() == 1:
        signalon = utime.ticks_us()
        if utime.ticks_diff(signalon, signaloff) > 50000:
            return 0

    timepassed = signalon - signaloff
    distance_cm = (timepassed * 0.0343) / 2
    return round(distance_cm, 1)

# --- ODOSIELANIE DO FIREBASE ---
def send_to_firebase(value):
    # Posielame iba level
    payload = {"level": value}
    
    try:
        # PATCH to rewrite key
        response = urequests.patch(URL, json=payload)
        print(f"Sent: {value} cm | Status: {response.status_code}")
        response.close()
    except Exception as e:
        print("Chyba pri odosielaní:", e)

def main():
    wifi_connect()
    while True:
        dist = measure_distance()
        if dist > 0:
            send_to_firebase(dist)
        else:
            print("Chyba čítania senzora.")
            
        time.sleep(15) # Interval merania (sekundy)

if __name__ == "__main__":
    main()
