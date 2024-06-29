import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase';


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

    const resetForm = () => {
        if (authForm) {
            authForm.reset();
        }
        if (emailField) {
            emailField.focus();
        }
    };

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
            if (authTitle.textContent === 'Реєстрація') {
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
