// Import các hàm từ SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB2bRIDe_WmC4PrqNw0Pc3NmpB8RN49GlA",
  authDomain: "lvtn-1daf8.firebaseapp.com",
  databaseURL: "https://lvtn-1daf8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lvtn-1daf8",
  storageBucket: "lvtn-1daf8.firebasestorage.app",
  messagingSenderId: "714911677725",
  appId: "1:714911677725:web:077d406bd928413b3475f4",
  measurementId: "G-4QZ1WRMGW0"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Các tham chiếu cho từng cảm biến
const sensorsRefs = {
    SN1: {
        object: document.getElementById('sn1-object-data'),
        gas: document.getElementById('sn1-gas-data'),
        gasThreshold: document.getElementById('sn1-gas-threshold-data'),
        tempThreshold: document.getElementById('sn1-temp-threshold-data'),
        khancap: document.getElementById('sn1-khancap-data')
    },
    SN2: {
        object: document.getElementById('sn2-object-data'),
        gas: document.getElementById('sn2-gas-data'),
        gasThreshold: document.getElementById('sn2-gas-threshold-data'),
        tempThreshold: document.getElementById('sn2-temp-threshold-data'),
        khancap: document.getElementById('sn2-khancap-data')
    },
    SN3: {
        object: document.getElementById('sn3-object-data'),
        gas: document.getElementById('sn3-gas-data'),
        gasThreshold: document.getElementById('sn3-gas-threshold-data'),
        tempThreshold: document.getElementById('sn3-temp-threshold-data'),
        khancap: document.getElementById('sn3-khancap-data')
    },
    SN4: {
        object: document.getElementById('sn4-object-data'),
        gas: document.getElementById('sn4-gas-data'),
        gasThreshold: document.getElementById('sn4-gas-threshold-data'),
        tempThreshold: document.getElementById('sn4-temp-threshold-data'),
        khancap: document.getElementById('sn4-khancap-data')
    }
};

// Hàm để cập nhật dữ liệu vào bảng
const fetchDataForSensor = (sensor, refs) => {
    onValue(ref(database, `${sensor}/object`), (snapshot) => {
        refs.object.textContent = snapshot.exists() ? snapshot.val() : 'N/A';
    });
    onValue(ref(database, `${sensor}/gas`), (snapshot) => {
        refs.gas.textContent = snapshot.exists() ? snapshot.val() : 'N/A';
    });
    onValue(ref(database, `${sensor}/Gas_threshold`), (snapshot) => {
        refs.gasThreshold.textContent = snapshot.exists() ? snapshot.val() : 'N/A';
    });
    onValue(ref(database, `${sensor}/Temp_threshold`), (snapshot) => {
        refs.tempThreshold.textContent = snapshot.exists() ? snapshot.val() : 'N/A';
    });
    onValue(ref(database, `${sensor}/khancap`), (snapshot) => {
        if (snapshot.exists()) {
            const khancapValue = snapshot.val();
            // Kiểm tra giá trị khẩn cấp và cập nhật nội dung
            if (khancapValue === -1) {
                refs.khancap.textContent = 'OFF';
            } else if (khancapValue === -2) {
                refs.khancap.textContent = 'ON';
            } else {
                refs.khancap.textContent = khancapValue;
            }
        } else {
            refs.khancap.textContent = 'N/A';
        }
    });
};

// Gọi hàm lấy dữ liệu cho từng sensor
fetchDataForSensor('SN1', sensorsRefs.SN1);
fetchDataForSensor('SN2', sensorsRefs.SN2);
fetchDataForSensor('SN3', sensorsRefs.SN3);
fetchDataForSensor('SN4', sensorsRefs.SN4);
