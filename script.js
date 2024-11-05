// Import các hàm cần thiết từ SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

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
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Tham chiếu các phần tử trong bảng
const snRefs = {
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

// Hàm lấy và hiển thị dữ liệu cho từng sensor
const fetchDataForSensor = (sensorKey, refs) => {
  onValue(ref(database, `${sensorKey}/object`), (snapshot) => {
    refs.object.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/gas`), (snapshot) => {
    refs.gas.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/Gas_threshold`), (snapshot) => {
    refs.gasThreshold.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/Temp_threshold`), (snapshot) => {
    refs.tempThreshold.textContent = snapshot.val() || 'N/A';
  });
  onValue(ref(database, `${sensorKey}/khancap`), (snapshot) => {
    if (snapshot.exists()) {
      const khancapValue = snapshot.val();
      // Kiểm tra giá trị khẩn cấp và cập nhật nội dung
      refs.khancap.textContent = (khancapValue === -1) ? 'OFF' : (khancapValue === -2) ? 'ON' : khancapValue;
    } else {
      refs.khancap.textContent = 'N/A';
    }
  });
};

// Gọi hàm lấy dữ liệu cho từng sensor
Object.keys(snRefs).forEach(sensorKey => fetchDataForSensor(sensorKey, snRefs[sensorKey]));

// Đăng nhập
const loginButton = document.getElementById('login-button');
const loginMessage = document.getElementById('login-message');

loginButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const userRef = ref(database, 'user');

  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();

    if (userData) {
      const dbUsername = userData.name;
      const dbPassword = userData.password;

      if (username === dbUsername && password === dbPassword) {
        loginMessage.textContent = 'Đăng nhập thành công!';
        loginMessage.classList.add('success');
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('data-table').style.display = 'table';
        document.getElementById('input-container').style.display = 'block'; // Hiện khu vực nhập dữ liệu
      } else {
        loginMessage.textContent = 'Tên người dùng hoặc mật khẩu không đúng!';
        loginMessage.classList.add('error');
      }
    } else {
      loginMessage.textContent = 'Không tìm thấy dữ liệu người dùng!';
      loginMessage.classList.add('error');
    }
  }, (error) => {
    console.error("Lỗi khi đọc dữ liệu người dùng:", error);
    loginMessage.textContent = 'Đã xảy ra lỗi khi lấy dữ liệu người dùng: ' + error.message;
    loginMessage.classList.add('error');
  });
});

// Nhập dữ liệu cho sensor
const sendButton = document.getElementById('send-button');
const inputMessage = document.getElementById('input-message');

sendButton.addEventListener('click', () => {
  const selectedSensor = document.getElementById('sensor-select').value;
  const gasThreshold = document.getElementById('gas-threshold-input').value;
  const tempThreshold = document.getElementById('temp-threshold-input').value;

  const sensorRef = ref(database, selectedSensor);

  // Gửi dữ liệu vào Firebase
  set(sensorRef, {
    Gas_threshold: gasThreshold,
    Temp_threshold: tempThreshold
  }).then(() => {
    inputMessage.textContent = 'Gửi dữ liệu thành công!';
    inputMessage.classList.add('success');
  }).catch((error) => {
    inputMessage.textContent = 'Đã xảy ra lỗi: ' + error.message;
    inputMessage.classList.add('error');
  });
});

// Bật khẩn cấp
const khancapToggleButton = document.getElementById('khancap-toggle');

khancapToggleButton.addEventListener('click', () => {
  const selectedSensor = document.getElementById('sensor-select').value;
  const sensorRef = ref(database, `${selectedSensor}/khancap`);

  // Chuyển đổi giá trị khẩn cấp
  onValue(sensorRef, (snapshot) => {
    const currentValue = snapshot.val();
    const newValue = currentValue === -1 ? -2 : -1; // Chuyển đổi giữa OFF và ON

    set(sensorRef, newValue).then(() => {
      inputMessage.textContent = `Đã chuyển đổi khẩn cấp ${newValue === -2 ? 'ON' : 'OFF'} cho ${selectedSensor}`;
      inputMessage.classList.add('success');
    }).catch((error) => {
      inputMessage.textContent = 'Đã xảy ra lỗi: ' + error.message;
      inputMessage.classList.add('error');
    });
  });
});
