import './styles/reset.css';
import './styles/index.scss';
import './styles/responsive.scss';
import sendEmail from './js/emailService';
import {animStart, animSection, animMenu, animIntro} from './js/anim';

let paddingValue;
if(window.innerWidth > 600) paddingValue = 64;
else paddingValue = 32;


const app = {
    sectionsContainer: document.querySelector('.container'),
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
        }, 500)
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
        app.currentSectionIndex++;
        app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * (-app.sectionsContainer.offsetHeight + paddingValue)}px)`;
        animSection(app.currentSectionIndex);
        app.setIsScrolling(true);
    },

    scrollToBottom() {
        // stop if user is on the first section
        if(app.currentSectionIndex === 0) return;
        app.currentSectionIndex--;
        app.sectionsContainer.style.transform = `translateY(${app.currentSectionIndex * (-app.sectionsContainer.offsetHeight + paddingValue)}px)`;
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
        if(index == 0) {
            container.style.transform = `translateY(${index * (-container.offsetHeight + paddingValue)}px)`;
            app.currentSectionIndex = index;
            animIntro();
        };
        if(index == 1) {
            container.style.transform = `translateY(${index * (-container.offsetHeight + paddingValue)}px)`;
            app.currentSectionIndex = index;
            animSection(1);
        }
        if(index == 5) {
            container.style.transform = `translateY(${index * (-container.offsetHeight + paddingValue)}px)`
            app.currentSectionIndex = index;
        };
    }
};

document.addEventListener('DOMContentLoaded', app.init());