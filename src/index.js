import './styles/reset.css';
import './styles/index.scss';
import githubLogo from './assets/img/logo-github.png';
import linkedinLogo from './assets/img/logo-linkedin.png';

const app = {
    sectionsContainer: document.querySelector('.container'),
    currentSectionIndex: 0,
    sections: document.querySelectorAll('.section'),
    isScrolling: false,

    init() {
        window.addEventListener('wheel', app.scrollToSection);
        app.sectionsContainer.addEventListener('transitionend', () => {
            app.setIsScrolling(false);
        });
        app.addHeaderImages();
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

    addHeaderImages() {
        const imagesContainer = document.querySelector('.header__links');
        const imgArr = [
            {src: linkedinLogo, alt: 'lien compte linkedin', link: 'https://www.linkedin.com/in/mathis-pati/'},
            {src: githubLogo, alt: "lien compte github", link: 'https://github.com/Mathis-web'}
        ];
        imgArr.forEach(el => {
            const img = document.createElement('img');
            const link = document.createElement('a');
            link.href = el.link;
            link.className = "header__links__item";
            img.src = el.src;
            img.alt = el.alt;
            link.appendChild(img);
            imagesContainer.appendChild(link);
        });

    }
};

app.init();