document.addEventListener('DOMContentLoaded', function() {
    // Логика выхода из системы
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Здесь должна быть логика выхода
            alert('Вы вышли из системы');
            window.location.href = 'index.html';
        });
    }
    
    // Инициализация выпадающего меню профиля
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            const dropdown = this.querySelector('.dropdown-menu');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!userProfile.contains(e.target)) {
                const dropdown = userProfile.querySelector('.dropdown-menu');
                dropdown.style.display = 'none';
            }
        });
    }
});