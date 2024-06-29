"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("./firebase");
var auth_1 = require("firebase/auth");
// Modal logic
var modal = document.getElementById('myModal');
var openModalBtn = document.getElementById('openModalBtn');
var closeModalBtn = document.getElementById('closeModalBtn');
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
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeModal();
    }
});
// Point description logic
document.querySelectorAll('.point').forEach(function (point) {
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
        var description = document.createElement('div');
        description.className = 'description';
        description.innerText = element.getAttribute('data-description') || '';
        element.appendChild(description);
    }
}
function hideDescription(element) {
    var description = element.querySelector('.description');
    if (description) {
        element.removeChild(description);
    }
}
function toggleDescription(element) {
    var description = element.querySelector('.description');
    if (description) {
        hideDescription(element);
    }
    else {
        showDescription(element);
    }
}
// Car modal logic
document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal-car');
    var modalTriggers = document.querySelectorAll('.car-card');
    var closeButtons = document.querySelectorAll('.close-car');
    modalTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var carClass = trigger.querySelector('.car-image').classList[1];
            var modal = document.getElementById("modal-".concat(carClass));
            if (modal) {
                modal.style.display = "block";
            }
        });
    });
    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var modalId = button.getAttribute('data-modal-id');
            var modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "none";
            }
        });
    });
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal-car')) {
            event.target.style.display = "none";
        }
    });
});
// Authentication logic
document.addEventListener('DOMContentLoaded', function () {
    var profileIcon = document.getElementById('profileIcon');
    var modalAuth = document.getElementById('modal-auth');
    var closeModal = document.getElementById('closeModal');
    var authTitle = document.getElementById('authTitle');
    var authForm = document.getElementById('authForm');
    var toggleAuth = document.getElementById('toggleAuth');
    var emailField = document.getElementById('email');
    var passwordField = document.getElementById('password');
    var confirmPasswordField = document.getElementById('confirmPassword');
    var usernameLabel = document.getElementById('usernameLabel');
    var confirmPasswordLabel = document.getElementById('confirmPasswordLabel');
    var submitButton = document.getElementById('submitButton');
    var resetForm = function () {
        if (authForm) {
            authForm.reset();
        }
        if (emailField) {
            emailField.focus();
        }
    };
    if (profileIcon && modalAuth && closeModal && authTitle && authForm && toggleAuth && emailField && passwordField && confirmPasswordField && usernameLabel && confirmPasswordLabel && submitButton) {
        profileIcon.addEventListener('click', function () {
            modalAuth.classList.add('show');
            document.body.classList.add('modal-open');
            resetForm();
        });
        closeModal.addEventListener('click', function () {
            modalAuth.classList.remove('show');
            document.body.classList.remove('modal-open');
        });
        window.addEventListener('click', function (event) {
            if (event.target === modalAuth) {
                modalAuth.classList.remove('show');
                document.body.classList.remove('modal-open');
            }
        });
        toggleAuth.addEventListener('click', function (event) {
            event.preventDefault();
            if (authTitle.textContent === 'Реєстрація') {
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
        authForm === null || authForm === void 0 ? void 0 : authForm.addEventListener('submit', function (event) { return __awaiter(void 0, void 0, void 0, function () {
            var email, password, userCredential, error_1, userCredential, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        email = emailField === null || emailField === void 0 ? void 0 : emailField.value;
                        password = passwordField === null || passwordField === void 0 ? void 0 : passwordField.value;
                        if (!email || !password)
                            return [2 /*return*/];
                        if (!((authTitle === null || authTitle === void 0 ? void 0 : authTitle.textContent) === 'Реєстрація')) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, auth_1.createUserWithEmailAndPassword)(firebase_1.auth, email, password)];
                    case 2:
                        userCredential = _a.sent();
                        console.log('User registered:', userCredential.user);
                        modalAuth.classList.remove('show');
                        document.body.classList.remove('modal-open');
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error registering user:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, email, password)];
                    case 6:
                        userCredential = _a.sent();
                        console.log('User signed in:', userCredential.user);
                        modalAuth.classList.remove('show');
                        document.body.classList.remove('modal-open');
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.error('Error signing in user:', error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    }
    else {
        console.error('Some elements were not found on the page.');
    }
});
