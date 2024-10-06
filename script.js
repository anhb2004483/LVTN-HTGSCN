// Import các hàm cần thiết từ SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDXPAZ7Wejg29HJWlGk4HVYCSb-tQC_uOs",
    authDomain: "espp-d81e2.firebaseapp.com",
    databaseURL: "https://espp-d81e2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "espp-d81e2",
    storageBucket: "espp-d81e2.appspot.com",
    messagingSenderId: "1031596671832",
    appId: "1:1031596671832:web:827366acdcf47222ae1b2d",
    measurementId: "G-L7ZYC7TE7W"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Tham chiếu các phần tử trong bảng
const snRefs = {
    SN1: {
        object: document.getElementById('sn1-object-data'),
        gas: document.getElementById('sn1-gas-data'),
        gasThreshold: document.getElementById('sn1-gas-threshold-data'),
        tempThreshold: document.getElementById('sn1-temp-threshold-data'),
        khancap: document.getElementById('sn1-khancap-data'),
        bInput: document.getElementById('sn1-b-input'),
        submitButton: document.getElementById('sn1-submit-b')
    },
    SN2: {
        object: document.getElementById('sn2-object-data'),
        gas: document.getElementById('sn2-gas-data'),
        gasThreshold: document.getElementById('sn2-gas-threshold-data'),
        tempThreshold: document.getElementById('sn2-temp-threshold-data'),
        khancap: document.getElementById('sn2-khancap-data'),
        bInput: document.getElementById('sn2-b-input'),
        submitButton: document.getElementById('sn2-submit-b')
    },
    SN3: {
        object: document.getElementById('sn3-object-data'),
        gas: document.getElementById('sn3-gas-data'),
        gasThreshold: document.getElementById('sn3-gas-threshold-data'),
        tempThreshold: document.getElementById('sn3-temp-threshold-data'),
        khancap: document.getElementById('sn3-khancap-data'),
        bInput: document.getElementById('sn3-b-input'),
        submitButton: document.getElementById('sn3-submit-b')
    },
    SN4: {
        object: document.getElementById('sn4-object-data'),
        gas: document.getElementById('sn4-gas-data'),
        gasThreshold: document.getElementById('sn4-gas-threshold-data'),
        tempThreshold: document.getElementById('sn4-temp-threshold-data'),
        khancap: document.getElementById('sn4-khancap-data'),
        bInput: document.getElementById('sn4-b-input'),
        submitButton: document.getElementById('sn4-submit-b')
    }
};

// Hàm để đọc và hiển thị dữ liệu từ Firebase
const fetchDataForSensor = (sensorRef, refs) => {
    onValue(ref(database, `${sensorRef}/object`), (snapshot) => {
        refs.object.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database,
