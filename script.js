// Import các hàm cần thiết từ SDK
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
const sn1Refs = {
    object: document.getElementById('sn1-object-data'),
    gas: document.getElementById('sn1-gas-data'),
    gasThreshold: document.getElementById('sn1-gas-threshold-data'),
    tempThreshold: document.getElementById('sn1-temp-threshold-data'),
    khancap: document.getElementById('sn1-khancap-data'),
    bInput: document.getElementById('sn1-b-input'),
    sendButton: document.getElementById('sn1-send-button'),
};
const sn2Refs = {
    object: document.getElementById('sn2-object-data'),
    gas: document.getElementById('sn2-gas-data'),
    gasThreshold: document.getElementById('sn2-gas-threshold-data'),
    tempThreshold: document.getElementById('sn2-temp-threshold-data'),
    khancap: document.getElementById('sn2-khancap-data'),
    bInput: document.getElementById('sn2-b-input'),
    sendButton: document.getElementById('sn2-send-button'),
};
const sn3Refs = {
    object: document.getElementById('sn3-object-data'),
    gas: document.getElementById('sn3-gas-data'),
    gasThreshold: document.getElementById('sn3-gas-threshold-data'),
    tempThreshold: document.getElementById('sn3-temp-threshold-data'),
    khancap: document.getElementById('sn3-khancap-data'),
    bInput: document.getElementById('sn3-b-input'),
    sendButton: document.getElementById('sn3-send-button'),
};
const sn4Refs = {
    object: document.getElementById('sn4-object-data'),
    gas: document.getElementById('sn4-gas-data'),
    gasThreshold: document.getElementById('sn4-gas-threshold-data'),
    tempThreshold: document.getElementById('sn4-temp-threshold-data'),
    khancap: document.getElementById('sn4-khancap-data'),
    bInput: document.getElementById('sn4-b-input'),
    sendButton: document.getElementById('sn4-send-button'),
};

// Hàm để đọc và hiển thị dữ liệu
const fetchDataForSensor = (sensorRef, refs) => {
    onValue(ref(database, `${sensorRef}/object`), (snapshot) => {
        refs.object.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/gas`), (snapshot) => {
        refs.gas.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/Gas_threshold`), (snapshot) => {
        refs.gasThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/Temp_threshold`), (snapshot) => {
        refs.tempThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `${sensorRef}/khancap`), (snapshot) => {
        refs.khancap.textContent = snapshot.val() || 'N/A';
    });
};

// Gọi hàm để lấy dữ liệu cho từng sensor
fetchDataForSensor('SN1', sn1Refs);
fetchDataForSensor('SN2', sn2Refs);
fetchDataForSensor('SN3', sn3Refs);
fetchDataForSensor('SN4', sn4Refs);

// Hàm gửi dữ liệu B lên Firebase
const sendDataB = (sensorRef, inputElement) => {
    const bValue = inputElement.value;
    set(ref(database, `${sensorRef}/b`), bValue)
        .then(() => {
            alert(`Giá trị B cho ${sensorRef} đã được gửi: ${bValue}`);
            inputElement.value = ''; // Xóa ô nhập sau khi gửi
        })
        .catch((error) => {
            console.error(`Lỗi khi gửi dữ liệu B cho ${sensorRef}: `, error);
        });
};

// Thêm sự kiện click cho các nút gửi B
sn1Refs.sendButton.addEventListener('click', () => sendDataB('SN1', sn1Refs.bInput));
sn2Refs.sendButton.addEventListener('click', () => sendDataB('SN2', sn2Refs.bInput));
sn3Refs.sendButton.addEventListener('click', () => sendDataB('SN3', sn3Refs.bInput));
sn4Refs.sendButton.addEventListener('click', () => sendDataB('SN4', sn4Refs.bInput));
