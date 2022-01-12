import './styles/reset.css';
import './styles/index.scss';

const sectionsContainer = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
const sectionsContainerHeight = sectionsContainer.offsetHeight;
let currentSectionIndex = 0;

window.addEventListener('wheel', scrollToSection);
sectionsContainer.addEventListener('transitionend', () => {
    removeOrAddWheelListener(true);
})

function scrollToSection(e) {
    if(e.deltaY > 0) {
        // stop if user is on the last section
        if(sections.length - 1 === currentSectionIndex) return;
        currentSectionIndex++;
        sectionsContainer.style.transform = `translateY(${currentSectionIndex * -sectionsContainerHeight}px)`;
        removeOrAddWheelListener(false);
    }
    if(e.deltaY < 0) {
        // stop if user is on the first section
        if(currentSectionIndex === 0) return;
        currentSectionIndex--;
        sectionsContainer.style.transform = `translateY(${currentSectionIndex * -sectionsContainerHeight}px)`;
        removeOrAddWheelListener(false);
    }
}

function removeOrAddWheelListener(bool) {
    if(bool) window.addEventListener('wheel', scrollToSection);
    else window.removeEventListener('wheel', scrollToSection);
}