class PopupManager {
    constructor() {
        this.popups = new Map();
    }
    
    register(name, element) {
        this.popups.set(name, element);
        element.querySelector('.popup-close').addEventListener('click', () => this.close(name));
    }
    
    open(name) {
        const popup = this.popups.get(name);
        if (popup) {
            popup.classList.remove('hidden');
            document.body.classList.add('no-scroll');
            this.currentPopup = name;
        }
    }
    
    close(name = null) {
        const popupName = name || this.currentPopup;
        const popup = this.popups.get(popupName);
        if (popup) {
            popup.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }
    }
    
    closeAll() {
        this.popups.forEach(popup => popup.classList.add('hidden'));
        document.body.classList.remove('no-scroll');
    }
}

// Инициализация
const popupManager = new PopupManager();
popupManager.register('auth', document.getElementById('auth-popup'));