// Import các hàm cần thiết từ SDK
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

// Tham chiếu các phần tử trong bảng
const sn1Refs = {
    object: document.getElementById('sn1-object-data'),
    gas: document.getElementById('sn1-gas-data'),
    gasThreshold: document.getElementById('sn1-gas-threshold-data'),
    tempThreshold: document.getElementById('sn1-temp-threshold-data'),
    khancap: document.getElementById('sn1-khancap-data')
};
const sn2Refs = {
    object: document.getElementById('sn2-object-data'),
    gas: document.getElementById('sn2-gas-data'),
    gasThreshold: document.getElementById('sn2-gas-threshold-data'),
    tempThreshold: document.getElementById('sn2-temp-threshold-data'),
    khancap: document.getElementById('sn2-khancap-data')
};
const sn3Refs = {
    object: document.getElementById('sn3-object-data'),
    gas: document.getElementById('sn3-gas-data'),
    gasThreshold: document.getElementById('sn3-gas-threshold-data'),
    tempThreshold: document.getElementById('sn3-temp-threshold-data'),
    khancap: document.getElementById('sn3-khancap-data')
};
const sn4Refs = {
    object: document.getElementById('sn4-object-data'),
    gas: document.getElementById('sn4-gas-data'),
    gasThreshold: document.getElementById('sn4-gas-threshold-data'),
    tempThreshold: document.getElementById('sn4-temp-threshold-data'),
    khancap: document.getElementById('sn4-khancap-data')
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

// Đăng nhập
const loginButton = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');

loginButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Tham chiếu đến tên người dùng và mật khẩu trong Firebase
    const userRef = ref(database, 'user');

    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();

        if (userData) {
            const dbUsername = userData.name;
            const dbPassword = userData.password;

            if (username === dbUsername && password === dbPassword) {
                loginMessage.textContent = 'Đăng nhập thành công!';
                document.getElementById('login-container').style.display = 'none'; // Ẩn phần đăng nhập
                document.getElementById('data-table').style.display = 'table'; // Hiện bảng dữ liệu
            } else {
                loginMessage.textContent = 'Tên người dùng hoặc mật khẩu không đúng!';
            }
        } else {
            loginMessage.textContent = 'Không tìm thấy dữ liệu người dùng!';
        }
    }, (error) => {
        console.error("Lỗi khi đọc dữ liệu người dùng:", error);
        loginMessage.textContent = 'Đã xảy ra lỗi khi lấy dữ liệu người dùng: ' + error.message;
    });
});
