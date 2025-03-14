```md
# Connecting an Expo App (Mobile) to a Django Server (Laptop)

## **1️⃣ Find Your Laptop's Local IP**
Run the following command on your laptop to get the local IP:
```sh
ip a | grep inet
```
From the output, find the IP under your active network interface (`wlo1`).
For example, if the IP is:
```
inet 172.31.99.84/23 brd 172.31.99.255 scope global dynamic noprefixroute wlo1
```
Your **laptop's local IP** is:
```
172.31.99.84
```

---

## **2️⃣ Start Django Server on Local Network**
By default, Django runs on `127.0.0.1:8000`, which is only accessible on your laptop.
To make it accessible from other devices (like your phone), run:
```sh
python manage.py runserver 0.0.0.0:8000
```
Now, your Django server is accessible at:
```
http://172.31.99.84:8000
```

---

## **3️⃣ Update API Base URL in Expo App**
In your **React Native (Expo) app**, update your API requests.
Instead of:
```js
const BASE_URL = "http://127.0.0.1:8000/api/";
```
Use your **laptop's local IP**:
```js
const BASE_URL = "http://172.31.99.84:8000/api/";
```
This ensures your mobile device makes requests to your laptop's server.

---

## **4️⃣ Allow Django Through Firewall (If Needed)**
If your phone **cannot connect**, the firewall may be blocking it.

### **For Linux**
Run:
```sh
sudo ufw allow 8000
```

### **For Windows**
1. Open **Windows Security** → **Firewall & network protection**.
2. Click **Allow an app through firewall**.
3. Add **Python** and allow both **Private & Public networks**.

---

## **5️⃣ Start Expo in LAN Mode**
By default, Expo may use "Tunnel" mode, which **won't work** for local networking.
Run:
```sh
expo start --lan
```
Expo should now display a URL like:
```
exp://172.31.99.84:19000
```
✅ **Scan the QR code in the Expo Go app on your phone**.

---

## **6️⃣ Test API Calls**
Now, test making a request from your mobile **Expo app** to:
```
http://172.31.99.84:8000/api/
```
If it works, your **Expo app is successfully connected to Django!** 🎉

Let me know if you run into any issues! 🚀
```


