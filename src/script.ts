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
