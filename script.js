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
        document.getElementById('data-container').style.display = 'block'; // Hiện bảng dữ liệu
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

// Biến để theo dõi trạng thái khẩn cấp
let khancapState = -1; // -1 là OFF, -2 là ON

// Xử lý sự kiện nhấn nút On/Off
const khancapToggle = document.getElementById('khancap-toggle');
const sensorSelect = document.getElementById('sensor-select');

// Hàm gửi trạng thái khẩn cấp lên Firebase
const sendKhancapStatus = () => {
    const selectedSensor = sensorSelect.value;
    const khancapRef = ref(database, `${selectedSensor}/khancap`);
    
    set(khancapRef, khancapState)
        .then(() => {
            console.log(`Trạng thái khẩn cấp đã được gửi cho ${selectedSensor}: ${khancapState}`);
        })
        .catch((error) => {
            console.error("Lỗi khi gửi trạng thái khẩn cấp:", error);
        });
};

// Gửi giá trị khi nhấn nút bật/tắt
khancapToggle.addEventListener('click', () => {
    khancapState = (khancapState === -1) ? -2 : -1; // Chuyển đổi trạng thái
    khancapToggle.textContent = (khancapState === -2) ? 'Nhấn để Tắt Khẩn Cấp' : 'Nhấn để Bật Khẩn Cấp'; // Cập nhật văn bản nút
    sendKhancapStatus(); // Gửi trạng thái khẩn cấp lên Firebase
});

// Gửi giá trị vào Firebase
const sendButton = document.getElementById('send-button');
const inputMessage = document.getElementById('input-message');

sendButton.addEventListener('click', () => {
    const selectedSensor = sensorSelect.value; // Lấy giá trị sensor đã chọn
    const gasThresholdValue = Number(document.getElementById('gas-threshold-input').value);
    const tempThresholdValue = Number(document.getElementById('temp-threshold-input').value);

    // Kiểm tra xem các giá trị có phải là số không
    if (isNaN(gasThresholdValue) || isNaN(tempThresholdValue)) {
        inputMessage.textContent = 'Vui lòng nhập các giá trị số hợp lệ!';
        inputMessage.classList.add('error');
        inputMessage.classList.remove('success'); // Bỏ lớp thành công nếu có
        return; // Dừng thực hiện nếu không phải số
    }

    // Cập nhật giá trị vào Firebase
    const gasThresholdRef = ref(database, `${selectedSensor}/Gas_threshold`);
    const tempThresholdRef = ref(database, `${selectedSensor}/Temp_threshold`);

    // Gửi từng giá trị lên Firebase
    Promise.all([
        set(gasThresholdRef, gasThresholdValue),
        set(tempThresholdRef, tempThresholdValue)
    ])
    .then(() => {
        inputMessage.textContent = 'Giá trị đã được gửi thành công!';
        inputMessage.classList.add('success');
        inputMessage.classList.remove('error'); // Bỏ lớp lỗi nếu có

        // Xóa giá trị đã nhập
        document.getElementById('gas-threshold-input').value = '';
        document.getElementById('temp-threshold-input').value = '';

        // Làm cho thông báo biến mất sau 2 giây
        setTimeout(() => {
            inputMessage.textContent = '';
            inputMessage.classList.remove('success');
        }, 2000);
    })
    .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
        inputMessage.textContent = 'Đã xảy ra lỗi khi gửi dữ liệu: ' + error.message;
        inputMessage.classList.add('error');
        inputMessage.classList.remove('success'); // Bỏ lớp thành công nếu có
    });
});
