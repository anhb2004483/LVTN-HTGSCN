// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// Đọc dữ liệu từ Firebase
const dataContainer = document.getElementById('data-container');

// Đường dẫn đến dữ liệu mà bạn muốn lấy
const dataRef = ref(database, 'aaa');

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
        // Hiển thị dữ liệu lên trang web
        dataContainer.innerHTML = `<p><strong>Dữ liệu:</strong> ${data}</p>`;
    } else {
        dataContainer.innerHTML = `<p>Không có dữ liệu tại đường dẫn 'aaa'</p>`;
    }
}, (error) => {
    console.error("Lỗi khi đọc dữ liệu từ Firebase:", error);
    dataContainer.innerHTML = `<p>Đã xảy ra lỗi khi lấy dữ liệu: ${error.message}</p>`;
});
