const modal = document.getElementById('myModal') as HTMLElement;
const openModalBtn = document.getElementById('openModalBtn') as HTMLElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLElement;

function openModal(): void {
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

function closeModal(): void {
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
    point.addEventListener('mouseenter', function(this: HTMLElement) {
        showDescription(this);
    });

    point.addEventListener('mouseleave', function(this: HTMLElement) {
        hideDescription(this);
    });

    point.addEventListener('click', function(this: HTMLElement) {
        toggleDescription(this);
    });
});

function showDescription(element: HTMLElement) {
    if (!element.querySelector('.description')) {
        const description = document.createElement('div');
        description.className = 'description';
        description.innerText = element.getAttribute('data-description') || '';
        element.appendChild(description);
    }
}

function hideDescription(element: HTMLElement) {
    const description = element.querySelector('.description');
    if (description) {
        element.removeChild(description);
    }
}

function toggleDescription(element: HTMLElement) {
    const description = element.querySelector('.description');
    if (description) {
        hideDescription(element);
    } else {
        showDescription(element);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll<HTMLDivElement>('.modal-car');
    const modalTriggers = document.querySelectorAll<HTMLDivElement>('.car-card');
    const closeButtons = document.querySelectorAll<HTMLSpanElement>('.close-car');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const carClass = trigger.querySelector<HTMLDivElement>('.car-image')!.classList[1];
            const modal = document.getElementById(`modal-${carClass}`) as HTMLDivElement;
            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-id')!;
            const modal = document.getElementById(modalId) as HTMLDivElement;
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    window.addEventListener('click', (event) => {
        if ((event.target as HTMLDivElement).classList.contains('modal-car')) {
            (event.target as HTMLDivElement).style.display = "none";
        }
    });
});



import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

document.addEventListener('DOMContentLoaded', () => {
    const profileIcon: HTMLElement | null = document.getElementById('profileIcon');
    const modalAuth: HTMLElement | null = document.getElementById('modal-auth');
    const closeModal: HTMLElement | null = document.getElementById('closeModal');
    const authTitle: HTMLElement | null = document.getElementById('authTitle');
    const authForm: HTMLFormElement | null = document.getElementById('authForm') as HTMLFormElement | null;
    const toggleAuth: HTMLElement | null = document.getElementById('toggleAuth');
    const emailField: HTMLInputElement | null = document.getElementById('email') as HTMLInputElement | null;
    const passwordField: HTMLInputElement | null = document.getElementById('password') as HTMLInputElement | null;
    const confirmPasswordField: HTMLInputElement | null = document.getElementById('confirmPassword') as HTMLInputElement | null;
    const usernameLabel: HTMLElement | null = document.getElementById('usernameLabel');
    const confirmPasswordLabel: HTMLElement | null = document.getElementById('confirmPasswordLabel');
    const submitButton: HTMLButtonElement | null = document.getElementById('submitButton') as HTMLButtonElement | null;

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

        window.addEventListener('click', (event: MouseEvent) => {
            if (event.target === modalAuth) {
                modalAuth.classList.remove('show');
                document.body.classList.remove('modal-open');
            }
        });

        toggleAuth.addEventListener('click', (event) => {
            event.preventDefault();
            if (authTitle?.textContent === 'Реєстрація') {
                authTitle.textContent = 'Авторизація';
                toggleAuth.textContent = 'Зареєструватися';
                submitButton.textContent = 'Увійти';
                if (usernameLabel) usernameLabel.style.display = 'none';
                if (confirmPasswordLabel) confirmPasswordLabel.style.display = 'none';
                if (usernameLabel) document.getElementById('username')!.style.display = 'none';
                if (confirmPasswordLabel) document.getElementById('confirmPassword')!.style.display = 'none';
            } else {
                authTitle.textContent = 'Реєстрація';
                toggleAuth.textContent = 'Увійти';
                submitButton.textContent = 'Зареєструватися';
                if (usernameLabel) usernameLabel.style.display = 'block';
                if (confirmPasswordLabel) confirmPasswordLabel.style.display = 'block';
                if (usernameLabel) document.getElementById('username')!.style.display = 'block';
                if (confirmPasswordLabel) document.getElementById('confirmPassword')!.style.display = 'block';
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

        authForm?.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = emailField?.value;
            const password = passwordField?.value;
            if (!email || !password) return;

            if (authTitle?.textContent === 'Реєстрація') {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log('User registered:', userCredential.user);
                    modalAuth.classList.remove('show');
                    document.body.classList.remove('modal-open');
                } catch (error) {
                    console.error('Error registering user:', error);
                }
            } else {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in:', userCredential.user);
                    modalAuth.classList.remove('show');
                    document.body.classList.remove('modal-open');
                } catch (error) {
                    console.error('Error signing in user:', error);
                }
            }
        });
    } else {
        console.error('Some elements were not found on the page.');
    }
});


