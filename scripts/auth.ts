document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon') as HTMLElement | null;
    const modalAuth = document.getElementById('modal-auth') as HTMLElement | null;
    const closeModal = document.getElementById('closeModal') as HTMLElement | null;
    const authTitle = document.getElementById('authTitle') as HTMLElement | null;
    const authForm = document.getElementById('authForm') as HTMLFormElement | null;
    const toggleAuth = document.getElementById('toggleAuth') as HTMLElement | null;
    const emailField = document.getElementById('emailAuth') as HTMLInputElement | null;
    const passwordField = document.getElementById('password') as HTMLInputElement | null;
    const confirmPasswordField = document.getElementById('confirmPassword') as HTMLInputElement | null;
    const usernameField = document.getElementById('username') as HTMLInputElement | null;
    const usernameLabel = document.getElementById('usernameLabel') as HTMLElement | null;
    const confirmPasswordLabel = document.getElementById('confirmPasswordLabel') as HTMLElement | null;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;

    const resetForm = () => {
        authForm?.reset();
        emailField?.focus();
    };

    if (profileIcon && modalAuth && closeModal && authTitle && authForm && toggleAuth && emailField && passwordField && confirmPasswordField && usernameField && usernameLabel && confirmPasswordLabel && submitButton) {
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

        toggleAuth.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            if (authTitle.textContent === 'Registration') {
                authTitle.textContent = 'Authorization';
                toggleAuth.textContent = 'Registration';
                submitButton.textContent = 'Sign In';
                usernameLabel.style.display = 'none';
                confirmPasswordLabel.style.display = 'none';
                usernameField.style.display = 'none';
                confirmPasswordField.style.display = 'none';
            } else {
                authTitle.textContent = 'Registration';
                toggleAuth.textContent = 'Sign In';
                submitButton.textContent = 'Register';
                usernameLabel.style.display = 'block';
                confirmPasswordLabel.style.display = 'block';
                usernameField.style.display = 'block';
                confirmPasswordField.style.display = 'block';
            }
            resetForm();
        });

        authForm.addEventListener('submit', async (event: Event) => {
            event.preventDefault();
            const email = emailField?.value;
            const password = passwordField?.value;
            const confirmPassword = confirmPasswordField?.value;
            const username = usernameField?.value;

            if (!email || !password || (authTitle?.textContent === 'Registration' && (!username || password !== confirmPassword))) {
                return;
            }

            const endpoint = authTitle?.textContent === 'Registration' ? '/register' : '/login';
            const body = authTitle?.textContent === 'Registration' ? { email, password, username } : { email, password };

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                if (response.ok) {
                    console.log(authTitle?.textContent === 'Registration' ? 'User registered' : 'User signed in');
                    modalAuth.classList.remove('show');
                    document.body.classList.remove('modal-open');
                } else {
                    console.error('Error:', await response.text());
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        });
    } else {
        console.error('Some elements were not found on the page.');
    }
});
