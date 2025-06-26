class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = this.form.querySelectorAll('[data-validate]');
        this.errors = {};
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validate()) {
                e.preventDefault();
                this.showErrors();
            }
        });
        
        // Сброс ошибок при изменении поля
        this.fields.forEach(field => {
            field.addEventListener('input', () => {
                this.clearError(field);
            });
        });
    }
    
    validate() {
        let isValid = true;
        this.errors = {};
        
        this.fields.forEach(field => {
            const value = field.value.trim();
            const rules = field.dataset.validate.split('|');
            
            for (const rule of rules) {
                const [ruleName, ruleParam] = rule.split(':');
                
                switch(ruleName) {
                    case 'required':
                        if (!value) {
                            this.addError(field, 'Это поле обязательно для заполнения');
                            isValid = false;
                        }
                        break;
                    case 'email':
                        if (!this.isEmail(value)) {
                            this.addError(field, 'Введите корректный email');
                            isValid = false;
                        }
                        break;
                    case 'min':
                        if (value.length < parseInt(ruleParam)) {
                            this.addError(field, `Минимальная длина: ${ruleParam} символов`);
                            isValid = false;
                        }
                        break;
                }
            }
        });
        
        return isValid;
    }
    
    isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    addError(field, message) {
        if (!this.errors[field.name]) {
            this.errors[field.name] = [];
        }
        this.errors[field.name].push(message);
    }
    
    showErrors() {
        // Сначала очищаем все предыдущие ошибки
        this.clearAllErrors();
        
        // Показываем новые ошибки
        for (const fieldName in this.errors) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const errorContainer = document.createElement('div');
                errorContainer.className = 'error-message';
                errorContainer.textContent = this.errors[fieldName][0];
                errorContainer.style.color = '#ff4d4d';
                errorContainer.style.marginTop = '5px';
                errorContainer.style.fontSize = '0.9rem';
                
                field.parentNode.appendChild(errorContainer);
                field.classList.add('error');
            }
        }
    }
    
    clearError(field) {
        field.classList.remove('error');
        const errorContainer = field.parentNode.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.remove();
        }
    }
    
    clearAllErrors() {
        this.fields.forEach(field => {
            this.clearError(field);
        });
    }
}

// Пример использования
// const loginValidator = new FormValidator('loginForm');
// const registerValidator = new FormValidator('registerForm');