// ==== ĐĂNG KÝ ====
function register(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.username === username)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

// ==== ĐĂNG NHẬP ====
function login(event) {
    event.preventDefault();
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;
    let remember = document.getElementById("rememberMe").checked;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (remember) {
            localStorage.setItem("currentUser", username);
        } else {
            sessionStorage.setItem("currentUser", username);
        }
        window.location.href = "home.html";
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu");
    }
}

// ==== KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP ====
function checkLoginStatus() {
    let currentUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
    if (currentUser) {
        window.location.href = "home.html";
    }
}

// ==== HIỂN THỊ TRANG HOME ====
function loadHome() {
    let currentUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
    console.log(currentUser)
    if (!currentUser) {
        window.location.href = "login.html";
    } else {
        let a = document.getElementById("welcomeMessage").innerHTML = `Xin chào, ${currentUser}!`;
        
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
