document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Переключение вкладок
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Удаляем активный класс у всех вкладок
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });
    
    // Обработка формы входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Здесь должна быть логика входа
        alert('Форма входа отправлена!');
        // Перенаправление в личный кабинет
        window.location.href = 'dashboard.html';
    });
    
    // Обработка формы регистрации
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Здесь должна быть логика регистрации
        alert('Форма регистрации отправлена!');
        // Перенаправление в личный кабинет
        window.location.href = 'dashboard.html';
    });
});