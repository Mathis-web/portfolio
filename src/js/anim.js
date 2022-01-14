import gsap from 'gsap';

const animSection  = (index) => {
    if(index === 5) return;
    if(index === 0) {
        animIntro();
        return;
    }
    const section = document.querySelector(`.section[data-index="${index}"]`);
    const title = section.querySelector('.section__content__title');
    const sepBar = section.querySelector('.section__content__sep-bar-container');
    const info = section.querySelector('.section__content__info');
    const btns = section.querySelector('.section__content__links');
    const img = section.querySelector('.section__img-container');
    
    const tl = gsap.timeline();
    tl
        .from(title, {x:'-100%', duration: .7, delay: .4})
        .from(sepBar, {x: '-120%', duration: .7}, "<.1")
        .from(info, {x: '-120%', duration: .7}, '<.1')
        .from(btns, {x: '-100%', duration: .7}, '<.02')
        .from(img, {x: '50px', scale: 0.7, duration: 1}, .4)
    
};

const animIntro = () => {
    const section = document.querySelector(`.section[data-index="0"]`);
    const title = section.querySelector('.section__content__title');
    const sepBar = section.querySelector('.section__content__sep-bar-container');
    const info = section.querySelector('.section__content__info');
    const portfolioTitle = section.querySelector('.portfolio');

    const tl = gsap.timeline();
    tl
        .from(title, {x:'-100%', duration: .7, delay: .4})
        .from(sepBar, {x: '-120%', duration: .7}, "<.1")
        .from(info, {x: '-120%', duration: .7}, "<.1")
        .from(portfolioTitle, {x: '100%', duration: .7}, .4);
};

const animStart = () => {
    setTimeout(() => document.querySelector('.header').style.zIndex = 1000, 1000);

    const fullPage = document.querySelector('.fullpage-anim');
    const section = document.querySelector(`.section[data-index="0"]`);
    const title = section.querySelector('.section__content__title');
    const sepBar = section.querySelector('.section__content__sep-bar-container');
    const info = section.querySelector('.section__content__info');
    const portfolioTitle = section.querySelector('.portfolio');
    
    const tl = gsap.timeline();
    tl
        .to(fullPage, {y: -window.innerHeight, duration: 0.8})
        .from(title, {x:'-100%', duration: .7}, "<.3")
        .from(sepBar, {x: '-120%', duration: .7}, "<.1")
        .from(info, {x: '-120%', duration: .7}, '<.1')
        .from(portfolioTitle, {x: '100%', duration: .8}, .3);
}

export {animSection, animStart}
