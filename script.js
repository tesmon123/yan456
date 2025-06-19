// 分类标签切换功能
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.category-tab');
    const cards = document.querySelectorAll('.brand-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // 更新活动标签
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            // 筛选品牌卡片
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            nav.style.background = 'rgba(26, 26, 26, 0.9)';
        }
    });

    // 登录功能
    const loginForm = document.getElementById('loginForm');
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeModal = document.querySelector('.close-modal');
    const mainContent = document.getElementById('mainContent');

    // 显示登录模态框
    function showLoginModal() {
        loginModal.style.display = 'flex';
    }

    // 隐藏登录模态框
    function hideLoginModal() {
        loginModal.style.display = 'none';
    }

    // 检查是否已登录
    function checkLogin() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            mainContent.style.display = 'block';
            hideLoginModal();
        } else {
            mainContent.style.display = 'none';
            showLoginModal();
        }
    }

    // 登录验证
    function validateLogin(username, password) {
        // 简单的前端验证（实际应用中应该使用后端验证）
        const validUsers = {
            'admin': 'password123',
            'user': '123456',
            'guest': 'guest123'
        };
        
        return validUsers[username] === password;
    }

    // 处理登录表单提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('errorMsg');

        if (validateLogin(username, password)) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            hideLoginModal();
            mainContent.style.display = 'block';
            errorMsg.textContent = '';
            
            // 更新导航栏显示用户名
            const userInfo = document.getElementById('userInfo');
            if (userInfo) {
                userInfo.textContent = `欢迎, ${username}`;
            }
        } else {
            errorMsg.textContent = '用户名或密码错误！';
        }
    });

    // 登出功能
    window.logout = function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        location.reload();
    };

    // 关闭模态框
    closeModal.addEventListener('click', hideLoginModal);

    // 点击模态框外部关闭
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            hideLoginModal();
        }
    });

    // 页面加载时检查登录状态
    checkLogin();

    // 显示用户信息
    const username = localStorage.getItem('username');
    if (username) {
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.textContent = `欢迎, ${username}`;
        }
    }
});

