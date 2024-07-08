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
    const profileModal = document.getElementById('modal-profile') as HTMLElement | null;
    const closeProfileModal = document.getElementById('closeProfileModal') as HTMLElement | null;
    const profileUsername = document.getElementById('profileUsername') as HTMLElement | null;
    const profileEmail = document.getElementById('profileEmail') as HTMLElement | null;
    const logoutButton = document.getElementById('logoutButton') as HTMLElement | null;

    const resetForm = () => {
        authForm?.reset();
    };

    const showProfileModal = (username: string | null, email: string | null) => {
        if (profileUsername && profileEmail && profileModal) {
            if (username) {
                profileUsername.textContent = username;
            }
            if (email) {
                profileEmail.textContent = email;
            }
            profileModal.classList.add('show');
            document.body.classList.add('modal-open');
        }
    };

    const hideModal = (modal: HTMLElement, modalContentClass: string) => {
        const modalContent = modal.querySelector(modalContentClass) as HTMLElement;
        modalContent.classList.add('hide');
        setTimeout(() => {
            modal.classList.remove('show');
            modalContent.classList.remove('hide');
            document.body.classList.remove('modal-open');
        }, 500);
    };

    const hideProfileModal = () => {
        if (profileModal) {
            hideModal(profileModal, '.modal-content-profile');
        }
    };

    const hideAuthModal = () => {
        if (modalAuth) {
            hideModal(modalAuth, '.modal-content-auth');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        hideProfileModal();
        modalAuth!.classList.add('show');
        document.body.classList.add('modal-open');
    };

    if (profileIcon && modalAuth && closeModal && authTitle && authForm && toggleAuth && emailField && passwordField && confirmPasswordField && usernameField && usernameLabel && confirmPasswordLabel && submitButton && profileModal && closeProfileModal && profileUsername && profileEmail && logoutButton) {
        profileIcon.addEventListener('click', () => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const { username, email } = JSON.parse(loggedInUser);
                showProfileModal(username, email);
            } else {
                modalAuth.classList.add('show');
                document.body.classList.add('modal-open');
                resetForm();
            }
        });

        closeModal.addEventListener('click', () => {
            const modalContent = modalAuth?.querySelector('.modal-content-auth') as HTMLElement;
            if (modalContent) {
                modalContent.classList.add('hide');
                setTimeout(() => {
                    modalAuth!.classList.remove('show');
                    modalContent.classList.remove('hide');
                    document.body.classList.remove('modal-open');
                }, 500);
            }
        });

        closeProfileModal.addEventListener('click', hideProfileModal);

        logoutButton.addEventListener('click', handleLogout);

        toggleAuth.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            const formContent = authForm!;

            formContent.classList.add('form-hide');
            setTimeout(() => {
                if (authTitle!.textContent === 'Registration') {
                    authTitle!.textContent = 'Authorization';
                    toggleAuth!.textContent = 'Registration';
                    submitButton!.textContent = 'Sign In';
                    usernameLabel!.style.display = 'none';
                    confirmPasswordLabel!.style.display = 'none';
                    usernameField!.style.display = 'none';
                    confirmPasswordField!.style.display = 'none';
                } else {
                    authTitle!.textContent = 'Registration';
                    toggleAuth!.textContent = 'Sign In';
                    submitButton!.textContent = 'Register';
                    usernameLabel!.style.display = 'block';
                    confirmPasswordLabel!.style.display = 'block';
                    usernameField!.style.display = 'block';
                    confirmPasswordField!.style.display = 'block';
                }
                formContent.classList.remove('form-hide');
                formContent.classList.add('form-transition');
            }, 500);
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

            const baseURL = "https://Vova445.github.io/Car_Dealership";

            const endpoint = authTitle?.textContent === 'Registration' ? `${baseURL}/register` : `${baseURL}/login`;
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
                    hideAuthModal();
                    localStorage.setItem('loggedInUser', JSON.stringify({ username, email }));
                    showProfileModal(username, email);
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

document.addEventListener('DOMContentLoaded', () => {
    const visitBtn = document.getElementById('visitBtn') as HTMLElement | null;
    const modalAuth = document.getElementById('modal-auth') as HTMLElement | null;
    const closeModalAuth = document.getElementById('closeModal') as HTMLElement | null;
    const myModal = document.getElementById('myModal') as HTMLElement | null;
    const closeModalBtn = document.getElementById('closeModalBtn') as HTMLElement | null;

    if (!visitBtn || !modalAuth || !closeModalAuth || !myModal || !closeModalBtn) {
        console.error('Required elements not found');
        return;
    }

    const showProfileModal = (username: string | null, email: string | null) => {
        const profileModal = document.getElementById('modal-profile') as HTMLElement | null;
        const profileUsername = document.getElementById('profileUsername') as HTMLElement | null;
        const profileEmail = document.getElementById('profileEmail') as HTMLElement | null;
    
        if (profileUsername && profileEmail && profileModal) {
            if (username) {
                profileUsername.textContent = username;
            }
            if (email) {
                profileEmail.textContent = email;
            }
            profileModal.classList.add('show');
            document.body.classList.add('modal-open');
        }
    };

    const isUserRegistered = (): boolean => {
        return !!localStorage.getItem('loggedInUser');
    };

    visitBtn.addEventListener('click', () => {
        if (!isUserRegistered()) {
            myModal!.style.display = 'none';
            modalAuth!.classList.add('show');
            document.body.classList.add('modal-open');
        } else {
            myModal!.style.display = 'none'; 
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const { username, email } = JSON.parse(loggedInUser);
                showProfileModal(username, email);
            }
        }
    });
});
