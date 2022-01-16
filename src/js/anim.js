import gsap from 'gsap';

const animSection  = (index) => {
    if(index === 5) return;
    if(index === 0) {
        animIntro();
        return;
    }

    const dataIndex = `.section[data-index="${index}"]`;
    const tl = gsap.timeline();
    tl
        .from(`${dataIndex} .section__content__title`, {x:'-100%', duration: .7, delay: .4})
        .from(`${dataIndex} .section__content__sep-bar-container`, {x: '-120%', duration: .7}, "<.1")
        .from(`${dataIndex} .section__content__info`, {x: '-120%', duration: .7}, '<.1')
        .from(`${dataIndex} .section__content__links`, {x: '-100%', duration: .7}, '<.02')
        .from(`${dataIndex} .section__img-container`, {scale: 0.7, x: '50px', duration: .9}, .4)
};

const animIntro = () => {
    const tl = gsap.timeline();
    tl
        .from('.section[data-index="0"] .section__content__title', {x:'-100%', duration: .7, delay: .4})
        .from('.section[data-index="0"] .section__content__sep-bar-container', {x: '-120%', duration: .7}, "<.1")
        .from('.section[data-index="0"] .section__content__info', {x: '-120%', duration: .7}, "<.1")
        .from('.section[data-index="0"] .portfolio', {x: '120%', duration: .7}, .4);
};

const animStart = () => {
    setTimeout(() => document.querySelector('.header').style.zIndex = 3000, 1000);
    const tl = gsap.timeline();

    if(window.innerWidth > 700) {
        tl
            .to('.fullpage-anim', {y: '-110vh', duration: 0.8})
            .from('.section[data-index="0"] .section__content__title', {x:'-100%', duration: .7}, "<.3")
            .from('.section[data-index="0"] .section__content__sep-bar-container', {x: '-120%', duration: .7}, "<.1")
            .from('.section[data-index="0"] .section__content__info', {x: '-120%', duration: .7}, '<.1')
            .from('.section[data-index="0"] .portfolio', {x: '100%', duration: .8}, .3);
    }
    else {
        gsap.to('.fullpage-anim', {y: '-110vh', duration: 0.8})
    }
};

const animMenu = (bool) => {
    const tl = gsap.timeline();
    if(bool) {
        tl
            .to('.menu', {y: 0, duration: .5})
            .from('.menu__list__item span', {y: '100%', duration: .2});
    }
    else {
        gsap.to('.menu', {y: '-100vh', duration: .5});
    }
};

export {animSection, animStart, animMenu, animIntro}

