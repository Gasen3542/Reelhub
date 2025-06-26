class Analytics {
    constructor() {
        this.events = [];
    }
    
    track(event, data = {}) {
        const eventData = {
            event,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            ...data
        };
        
        this.events.push(eventData);
        this.saveToLocalStorage();
        
        // Здесь может быть отправка на сервер
        console.log(`Tracked event: ${event}`, eventData);
    }
    
    saveToLocalStorage() {
        const existing = JSON.parse(localStorage.getItem('analytics_events') || []);
        const updated = [...existing, ...this.events];
        localStorage.setItem('analytics_events', JSON.stringify(updated));
        this.events = [];
    }
    
    pageView() {
        this.track('pageview', {
            referrer: document.referrer,
            screen: `${window.screen.width}x${window.screen.height}`
        });
    }
    
    buttonClick(buttonId) {
        this.track('button_click', {
            button_id: buttonId
        });
    }
    
    formSubmit(formId) {
        this.track('form_submit', {
            form_id: formId
        });
    }
}

// Инициализация
const analytics = new Analytics();

// Трекер просмотра страницы
document.addEventListener('DOMContentLoaded', () => {
    analytics.pageView();
    
    // Трекинг кликов по кнопкам
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            analytics.buttonClick(button.id || button.className);
        });
    });
    
    // Трекинг отправки форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            analytics.formSubmit(form.id || 'unknown_form');
        });
    });
});