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
    khancap: document.getElementById('sn1-khancap-data')
};

// Hàm để đọc và hiển thị dữ liệu cho SN1
const fetchDataForSN1 = () => {
    onValue(ref(database, `SN1/object`), (snapshot) => {
        sn1Refs.object.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `SN1/gas`), (snapshot) => {
        sn1Refs.gas.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `SN1/Gas_threshold`), (snapshot) => {
        sn1Refs.gasThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `SN1/Temp_threshold`), (snapshot) => {
        sn1Refs.tempThreshold.textContent = snapshot.val() || 'N/A';
    });
    onValue(ref(database, `SN1/khancap`), (snapshot) => {
        sn1Refs.khancap.textContent = snapshot.val() || 'N/A';
    });
};

// Gọi hàm để lấy dữ liệu cho SN1
fetchDataForSN1();

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

// Gửi giá trị b lên Firebase
const submitButton = document.getElementById('submit-b');
const submitMessage = document.getElementById('submit-message');

submitButton.addEventListener('click', () => {
    const bValue = document.getElementById('b-value').value;

    if (bValue !== '') {
        set(ref(database, 'SN1/b'), bValue)
            .then(() => {
                submitMessage.textContent = 'Đã gửi thành công giá trị b!';
                submitMessage.style.color = 'green';
            })
            .catch((error) => {
                submitMessage.textContent = 'Lỗi khi gửi giá trị b: ' + error.message;
                submitMessage.style.color = 'red';
            });
    } else {
        submitMessage.textContent = 'Vui lòng nhập giá trị b!';
        submitMessage.style.color = 'red';
    }
});
