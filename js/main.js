const BASE_URL = 'http://localhost:5000/api'; 

function updateHeaderState() {
    const token = localStorage.getItem('userToken');
    const userName = localStorage.getItem('userName');
    
    const authArea = document.getElementById('authStatusArea'); 

    if (!authArea) return;

    if (token && userName) {
        authArea.innerHTML = `
            <span style="color: white; padding-right: 10px;">Chào, <strong>${userName.split(' ')[0]}</strong></span>
            <a href="my-account.html" style="color: white; text-decoration: none; padding-right: 10px;">Tài khoản</a>
            <a href="#" onclick="handleLogout(event)" style="color: #ff6b00; text-decoration: none;">Đăng xuất</a>
        `;
    } else {
        authArea.innerHTML = `
            <a href="login.html" style="color: white; text-decoration: none; padding-right: 10px;">Đăng nhập</a>
            <a href="login.html" style="color: white; text-decoration: none;">Đăng ký</a>
        `;
    }
}

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    alert('Đã đăng xuất thành công.');
    window.location.replace('index.html'); 
}

async function fetchWithAuth(url, method = 'POST', data = null) {
    const token = localStorage.getItem('userToken');
    if (!token) {
        alert('Vui lòng đăng nhập để thêm sản phẩm.');
        window.location.replace('login.html');
        throw new Error('No token found');
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const config = { method, headers, };
    if (data) { config.body = JSON.stringify(data); }

    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Lỗi hệ thống');
    }
    return result;
}


document.addEventListener("DOMContentLoaded", () => {
    updateHeaderState(); 
    
    const buttons = document.querySelectorAll(".btn"); 

    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();

            const productId = button.dataset.productId; 
            const quantity = 1; 

            if (!productId) {
                alert("Lỗi: Không tìm thấy ID sản phẩm để thêm.");
                return;
            }

            try {
                const result = await fetchWithAuth(`${BASE_URL}/cart/add`, 'POST', {
                    productId: parseInt(productId),
                    quantity: quantity
                });
                
            } catch (error) {
                alert('❌ Lỗi khi thêm vào giỏ: ' + error.message);
            }
        });
    });
});