"use strict";
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
