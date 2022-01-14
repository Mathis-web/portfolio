import './styles/reset.css';
import './styles/index.scss';
import sendEmail from './js/emailService';
import {animStart, animSection} from './js/anim';


const app = {
    sectionsContainer: document.querySelector('.container'),
    currentSectionIndex: 0,
    sections: document.querySelectorAll('.section'),
    isScrolling: false,

    init() {
        const contactForm = document.querySelector('.contact__form');

        window.addEventListener('wheel', app.scrollToSection);
        app.sectionsContainer.addEventListener('transitionend', () => {
            app.setIsScrolling(false);
        });
        contactForm.addEventListener('submit', app.sendEmail);
        setTimeout(() => {
            animStart();
        }, 500)
    },

    scrollToSection(e) {
        if(app.isScrolling) return;
        if(e.deltaY > 0) {
            app.scrollToTop();
        }
        if(e.deltaY < 0) {
            app.scrollToBottom();
        }
    },

    scrollToTop() {
        // stop if user is on the last section
        if(app.sections.length - 1 === app.currentSectionIndex) return;
        app.currentSectionIndex++;
        app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * (-app.sectionsContainer.offsetHeight + 64)}px)`;
        animSection(app.currentSectionIndex);
        app.setIsScrolling(true);
    },

    scrollToBottom() {
        // stop if user is on the first section
        if(app.currentSectionIndex === 0) return;
        app.currentSectionIndex--;
        app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * (-app.sectionsContainer.offsetHeight + 64)}px)`;
        animSection(app.currentSectionIndex);
        app.setIsScrolling(true);
    },

    setIsScrolling(bool) {
        app.isScrolling = bool;
    },

    sendEmail(e) {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const message = e.target.elements.message.value;
        document.querySelector('.contact__form__button').style.display = "none";
        sendEmail({name, email, message});
    }
};

document.addEventListener('DOMContentLoaded', app.init());