import './styles/reset.css';
import './styles/index.scss';
import './styles/responsive.scss';
import sendEmail from './js/emailService';
import {animStart, animSection, animMenu, animIntro} from './js/anim';

// let isUserOnComputer = true;
// delete section animations on mobile beacause of performance issue
// if(window.innerWidth < 700) isUserOnComputer = false;

const app = {
    sectionsContainer: document.querySelector('.slider'),
    currentSectionIndex: 0,
    sections: document.querySelectorAll('.section'),
    isScrolling: false,

    init() {
        const contactForm = document.querySelector('.contact__form');
        const burger = document.querySelector('.burger');
        const menuItems = document.querySelectorAll('.menu__list__item');

        window.addEventListener('wheel', app.handleWheelEvent);
        window.addEventListener('touchstart', app.touchStart);
        window.addEventListener('touchmove', app.touchMove);
        app.sectionsContainer.addEventListener('transitionend', () => {
            app.setIsScrolling(false);
        });
        contactForm.addEventListener('submit', app.sendEmail);
        burger.addEventListener('click', app.toggleMenu);
        menuItems.forEach((item) => item.addEventListener('click', app.onClickMenuItem));
        setTimeout(() => {
            animStart();
        }, 700)
    },

    handleWheelEvent(e) {
        if(app.isScrolling) return;
        let direction;
        if(e.deltaY >= 0) {
            direction = 'up';
        }
        if(e.deltaY < 0) {
            direction = 'down';
        }
        app.scrollToSection(direction);
    },

    touchStart(e) {
        app.touchY = e.touches[0].screenY;
    },

    touchMove(e) {
        const currentY = e.touches[0].screenY;
        // avoid scroll that are too small
        const calc = app.touchY - currentY;
        if(calc < 30 && calc > -30) return;
        if(calc >= 0) {
            app.scrollToSection('up')
        }
        if(calc < 0) {
            app.scrollToSection('down');
        }
    },

    scrollToSection(direction) {
        if(app.isScrolling) return;
        if(direction === 'up') {
            app.scrollToTop();
        }
        if(direction === 'down') {
            app.scrollToBottom();
        }
    },

    scrollToTop() {
        // stop if user is on the last section
        if(app.sections.length - 1 === app.currentSectionIndex) return;
        const heightToScroll = -app.sectionsContainer.offsetHeight;
        app.currentSectionIndex++;
        app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * heightToScroll}px)`;
        // if(isUserOnComputer) animSection(app.currentSectionIndex);
        animSection(app.currentSectionIndex)
        app.setIsScrolling(true);
    },

    scrollToBottom() {
        // stop if user is on the first section
        if(app.currentSectionIndex === 0) return;
        const heightToScroll = -app.sectionsContainer.offsetHeight;
        app.currentSectionIndex--;
        app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * heightToScroll}px)`;
        // if(isUserOnComputer) animSection(app.currentSectionIndex);
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
    },

    toggleMenu() {
        const burger = document.querySelector('.burger');
        if(burger.classList.contains('active')) {
            burger.classList.remove('active');
            animMenu(false);
        }
        else {
            burger.classList.add('active');
            animMenu(true); 
        }
    },

    onClickMenuItem(e) {
        const burger = document.querySelector('.burger');
        burger.classList.remove('active');
        animMenu(false)
        app.animScrollToSection(e.target.dataset.index);
    },

    animScrollToSection(index) {
        const container = document.querySelector('.container');
        const heightToScroll = -container.offsetHeight;
        if(index == 0) {
            container.style.transform = `translateY(${index * heightToScroll}px)`;
            app.currentSectionIndex = index;
            // if(isUserOnComputer) animIntro();
            animIntro();
        };
        if(index == 1) {
            container.style.transform = `translateY(${index * heightToScroll}px)`;
            app.currentSectionIndex = index;
            // if(isUserOnComputer) animSection(1);
            animSection(1);
        }
        if(index == 5) {
            container.style.transform = `translateY(${index * heightToScroll}px)`
            app.currentSectionIndex = index;
        };
    }
};

window.addEventListener('load', app.init);