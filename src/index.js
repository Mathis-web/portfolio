import './styles/reset.css';
import './styles/index.scss';
import sendEmail from './js/emailService';

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
    },

    scrollToSection(e) {
        if(app.isScrolling) return;
        if(e.deltaY > 0) {
            // stop if user is on the last section
            if(app.sections.length - 1 === app.currentSectionIndex) return;
            app.currentSectionIndex++;
            app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * -app.sectionsContainer.offsetHeight}px)`;
            app.setIsScrolling(true);
        }
        if(e.deltaY < 0) {
            // stop if user is on the first section
            if(app.currentSectionIndex === 0) return;
            app.currentSectionIndex--;
            app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * -app.sectionsContainer.offsetHeight}px)`;
            app.setIsScrolling(true);
        }
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

app.init();