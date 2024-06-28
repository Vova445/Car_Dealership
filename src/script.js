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
