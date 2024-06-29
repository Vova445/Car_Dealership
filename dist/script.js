var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
function openModal() {
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}
function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
document.querySelectorAll('.point').forEach(point => {
    point.addEventListener('mouseenter', function () {
        showDescription(this);
    });
    point.addEventListener('mouseleave', function () {
        hideDescription(this);
    });
    point.addEventListener('click', function () {
        toggleDescription(this);
    });
});
function showDescription(element) {
    if (!element.querySelector('.description')) {
        const description = document.createElement('div');
        description.className = 'description';
        description.innerText = element.getAttribute('data-description') || '';
        element.appendChild(description);
    }
}
function hideDescription(element) {
    const description = element.querySelector('.description');
    if (description) {
        element.removeChild(description);
    }
}
function toggleDescription(element) {
    const description = element.querySelector('.description');
    if (description) {
        hideDescription(element);
    }
    else {
        showDescription(element);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal-car');
    const modalTriggers = document.querySelectorAll('.car-card');
    const closeButtons = document.querySelectorAll('.close-car');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const carClass = trigger.querySelector('.car-image').classList[1];
            const modal = document.getElementById(`modal-${carClass}`);
            if (modal) {
                modal.style.display = "block";
            }
        });
    });
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "none";
            }
        });
    });
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-car')) {
            event.target.style.display = "none";
        }
    });
});
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon');
    const modalAuth = document.getElementById('modal-auth');
    const closeModal = document.getElementById('closeModal');
    const authTitle = document.getElementById('authTitle');
    const authForm = document.getElementById('authForm');
    const toggleAuth = document.getElementById('toggleAuth');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const usernameLabel = document.getElementById('usernameLabel');
    const confirmPasswordLabel = document.getElementById('confirmPasswordLabel');
    const submitButton = document.getElementById('submitButton');
    if (profileIcon && modalAuth && closeModal && authTitle && authForm && toggleAuth && emailField && passwordField && confirmPasswordField && usernameLabel && confirmPasswordLabel && submitButton) {
        profileIcon.addEventListener('click', () => {
            modalAuth.classList.add('show');
            document.body.classList.add('modal-open');
            resetForm();
        });
        closeModal.addEventListener('click', () => {
            modalAuth.classList.remove('show');
            document.body.classList.remove('modal-open');
        });
        window.addEventListener('click', (event) => {
            if (event.target === modalAuth) {
                modalAuth.classList.remove('show');
                document.body.classList.remove('modal-open');
            }
        });
        toggleAuth.addEventListener('click', (event) => {
            event.preventDefault();
            if ((authTitle === null || authTitle === void 0 ? void 0 : authTitle.textContent) === 'Реєстрація') {
                authTitle.textContent = 'Авторизація';
                toggleAuth.textContent = 'Зареєструватися';
                submitButton.textContent = 'Увійти';
                if (usernameLabel)
                    usernameLabel.style.display = 'none';
                if (confirmPasswordLabel)
                    confirmPasswordLabel.style.display = 'none';
                if (usernameLabel)
                    document.getElementById('username').style.display = 'none';
                if (confirmPasswordLabel)
                    document.getElementById('confirmPassword').style.display = 'none';
            }
            else {
                authTitle.textContent = 'Реєстрація';
                toggleAuth.textContent = 'Увійти';
                submitButton.textContent = 'Зареєструватися';
                if (usernameLabel)
                    usernameLabel.style.display = 'block';
                if (confirmPasswordLabel)
                    confirmPasswordLabel.style.display = 'block';
                if (usernameLabel)
                    document.getElementById('username').style.display = 'block';
                if (confirmPasswordLabel)
                    document.getElementById('confirmPassword').style.display = 'block';
            }
            resetForm();
        });
        const resetForm = () => {
            if (authForm) {
                authForm.reset();
            }
            if (emailField) {
                emailField.focus();
            }
        };
        authForm === null || authForm === void 0 ? void 0 : authForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const email = emailField === null || emailField === void 0 ? void 0 : emailField.value;
            const password = passwordField === null || passwordField === void 0 ? void 0 : passwordField.value;
            if (!email || !password)
                return;
            if ((authTitle === null || authTitle === void 0 ? void 0 : authTitle.textContent) === 'Реєстрація') {
                try {
                    const userCredential = yield createUserWithEmailAndPassword(auth, email, password);
                    console.log('User registered:', userCredential.user);
                    modalAuth.classList.remove('show');
                    document.body.classList.remove('modal-open');
                }
                catch (error) {
                    console.error('Error registering user:', error);
                }
            }
            else {
                try {
                    const userCredential = yield signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in:', userCredential.user);
                    modalAuth.classList.remove('show');
                    document.body.classList.remove('modal-open');
                }
                catch (error) {
                    console.error('Error signing in user:', error);
                }
            }
        }));
    }
    else {
        console.error('Some elements were not found on the page.');
    }
});
