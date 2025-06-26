document.addEventListener('DOMContentLoaded', () => {
    // Инициализация
    initSwiper();
    initAuth();
    initOffers();
    initEventListeners();
    initAnimations();
    
    // Фильтрация предложений
    initFilters();
    
    // Аналитика
    if (typeof analytics !== 'undefined') {
        analytics.track('page_view', { page: 'home' });
    }
});

function initAnimations() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-quad'
    });
    
    // Эффект при прокрутке навигации
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initSwiper() {
    // Инициализация Swiper для карусели
    const swiper = new Swiper('.hero-reels', {
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

function initAuth() {
    // Проверка аутентификации
    const user = JSON.parse(localStorage.getItem('reelhub_user'));
    if (user) {
        document.getElementById('authBtn').classList.add('hidden');
        document.getElementById('userProfile').classList.remove('hidden');
        document.getElementById('userName').textContent = user.name;
        
        if (user.role === 'advertiser') {
            document.getElementById('createOfferBtn').classList.remove('hidden');
        }
    }
}

function initOffers() {
    const offersContainer = document.getElementById('offersContainer');
    if (!offersContainer) return;
    
    // Данные предложений
    const offers = [
        {
            id: 1,
            title: "Коллаборация с косметическим брендом L'Oréal",
            description: "Ищем блогеров для продвижения новой линии органической косметики. Требуется 3 видео в течение месяца с хештегом #LorealOrganic.",
            category: "Красота",
            pricePer1000: 150,
            budget: 50000,
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80",
            badge: "НОВОЕ",
            filter: "top"
        },
        {
            id: 2,
            title: "Продвижение смартфонов Samsung Galaxy",
            description: "Запуск новой линейки смартфонов. Ищем технологических блогеров с аудиторией 100K+ для создания креативных обзоров.",
            category: "Технологии",
            pricePer1000: 300,
            budget: 120000,
            image: "https://images.unsplash.com/photo-1464380573004-0ca9c8db9d7d?q=80",
            badge: "ВЫСОКИЙ БЮДЖЕТ",
            filter: "high-budget"
        },
        {
            id: 3,
            title: "Запуск фитнес-приложения FlexFit",
            description: "Продвижение нового фитнес-приложения. Ищем тренеров и ЗОЖ-блогеров для создания мотивационных видео с использованием приложения.",
            category: "Здоровье",
            pricePer1000: 100,
            budget: 35000,
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80",
            badge: "БЫСТРЫЙ СТАРТ",
            filter: "quick-start"
        },
        {
            id: 4,
            title: "Продвижение кофейных напитков Starbucks",
            description: "Ищем создателей контента для продвижения сезонных кофейных напитков. Требуется 2 видео в течение 2 недель.",
            category: "Еда и напитки",
            pricePer1000: 180,
            budget: 75000,
            image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80",
            badge: "ТОПОВОЕ",
            filter: "top"
        },
        {
            id: 5,
            title: "Реклама спортивной одежды Nike",
            description: "Запуск новой коллекции спортивной одежды. Ищем фитнес-блогеров и спортсменов для демонстрации продукции.",
            category: "Спорт",
            pricePer1000: 220,
            budget: 90000,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80",
            badge: "ВЫСОКИЙ БЮДЖЕТ",
            filter: "high-budget"
        },
        {
            id: 6,
            title: "Продвижение онлайн-курсов Skillbox",
            description: "Ищем образовательных блогеров для продвижения онлайн-курсов по программированию и дизайну.",
            category: "Образование",
            pricePer1000: 120,
            budget: 45000,
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80",
            badge: "БЫСТРЫЙ СТАРТ",
            filter: "quick-start"
        }
    ];
    
    renderOffers(offers);
}

function renderOffers(offers) {
    const container = document.getElementById('offersContainer');
    container.innerHTML = '';
    
    offers.forEach(offer => {
        const offerElement = document.createElement('div');
        offerElement.className = 'offer-card';
        offerElement.dataset.filter = offer.filter;
        offerElement.innerHTML = `
            <div class="offer-image" style="background-image: url('${offer.image}')">
                <div class="offer-badge">${offer.badge}</div>
            </div>
            <div class="offer-content">
                <h3 class="offer-title">${offer.title}</h3>
                <p class="offer-description">${offer.description}</p>
                <div class="offer-meta">
                    <div class="offer-budget">
                        <span>Бюджет:</span>
                        <strong>₽ ${offer.budget.toLocaleString()}</strong>
                    </div>
                    <div class="offer-price">
                        <span class="value">₽ ${offer.pricePer1000}</span>
                        <span>за 1000 показов</span>
                    </div>
                </div>
                <button class="btn btn-details offer-detail-btn" data-offer="${offer.id}">
                    <i class="fas fa-info-circle"></i> Подробнее
                </button>
            </div>
        `;
        container.appendChild(offerElement);
    });
}

function initFilters() {
    const filters = document.querySelectorAll('.filter');
    const offerCards = document.querySelectorAll('.offer-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Удаляем активный класс у всех фильтров
            filters.forEach(f => f.classList.remove('active'));
            
            // Добавляем активный класс текущему фильтру
            filter.classList.add('active');
            
            const filterValue = filter.dataset.filter;
            
            // Фильтрация карточек
            offerCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.filter === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function initEventListeners() {
    // Открытие попапа авторизации
    document.getElementById('authBtn').addEventListener('click', () => {
        document.getElementById('authPopup').classList.add('active');
    });
    
    // Создание предложения
    document.getElementById('createOfferBtn').addEventListener('click', () => {
        window.location.href = 'create-offer.html';
    });
    
    // Стать создателем
    document.getElementById('becomeCreatorBtn').addEventListener('click', () => {
        window.location.href = 'creator-hub.html';
    });
    
    // Выход из системы
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.removeItem('reelhub_user');
        window.location.reload();
    });
    
    // Закрытие попапов
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.popup').forEach(popup => {
                popup.classList.remove('active');
            });
        });
    });
    
    // Клик вне попапа
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    });
    
    // Переключение вкладок
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Удаляем активный класс у всех вкладок
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке
            tab.classList.add('active');
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });
    
    // Открытие деталей предложения
    document.addEventListener('click', (e) => {
        if (e.target.closest('.offer-detail-btn')) {
            const btn = e.target.closest('.offer-detail-btn');
            const offerId = btn.dataset.offer;
            showOfferDetails(offerId);
        }
    });
    
    // Отправка анкеты
    document.getElementById('surveyForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Анкета успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        e.target.reset();
    });
}

function showOfferDetails(offerId) {
    // В реальном приложении здесь будет запрос к API
    const offers = [
        {
            id: 1,
            title: "Коллаборация с косметическим брендом L'Oréal",
            description: "Мы ищем блогеров в сфере красоты и ухода за собой для продвижения нашей новой линии органической косметики. Требуется создать 3 видео в течение месяца с хештегом #LorealOrganic. Видео должны демонстрировать использование продукции в повседневном уходе.",
            category: "Красота",
            budget: 50000,
            pricePer1000: 150,
            audience: "Женщины 18-35",
            deadline: "14 дней",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80"
        },
        // ... другие предложения
    ];
    
    const offer = offers.find(o => o.id == offerId);
    if (!offer) return;
    
    const popupContent = document.querySelector('#offerDetailPopup .offer-detail-popup');
    popupContent.innerHTML = `
        <div class="offer-detail-header">
            <div class="offer-detail-image" style="background-image: url('${offer.image}')"></div>
            <div>
                <h3 class="offer-detail-title">${offer.title}</h3>
                <span class="offer-detail-category">${offer.category}</span>
                <p class="offer-detail-description">${offer.description}</p>
            </div>
        </div>
        
        <div class="offer-detail-stats">
            <div class="offer-detail-stat">
                <div class="stat-label">Бюджет</div>
                <div class="stat-value">₽ ${offer.budget.toLocaleString()}</div>
            </div>
            <div class="offer-detail-stat">
                <div class="stat-label">Цена за 1000 показов</div>
                <div class="stat-value">₽ ${offer.pricePer1000}</div>
            </div>
            <div class="offer-detail-stat">
                <div class="stat-label">Целевая аудитория</div>
                <div class="stat-value">${offer.audience}</div>
            </div>
            <div class="offer-detail-stat">
                <div class="stat-label">Срок выполнения</div>
                <div class="stat-value">${offer.deadline}</div>
            </div>
        </div>
        
        <div class="offer-detail-actions">
            <button class="btn btn-primary">
                <i class="fas fa-handshake"></i> Откликнуться
            </button>
            <button class="btn btn-outline">
                <i class="fas fa-bookmark"></i> Сохранить
            </button>
        </div>
    `;
    
    document.getElementById('offerDetailPopup').classList.add('active');
}