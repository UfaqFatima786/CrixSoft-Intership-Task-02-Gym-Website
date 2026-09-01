
gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {

    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08
    });

    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power2.out"
    });

});


const hoverElements = document.querySelectorAll(
    "a, button, .glass-card, .price-card, .service-box"
);

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        gsap.to(follower, {
            width: 60,
            height: 60,
            duration: 0.25
        });

        gsap.to(cursor, {
            scale: 1.5,
            duration: 0.2
        });

    });


    element.addEventListener("mouseleave", () => {

        gsap.to(follower, {
            width: 38,
            height: 38,
            duration: 0.25
        });

        gsap.to(cursor, {
            scale: 1,
            duration: 0.2
        });

    });

});

const words = [
    "BODY.",
    "STRENGTH.",
    "CONFIDENCE.",
    "LEGACY."
];

const typewriter = document.querySelector(".typewriter");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typewriter.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1300);

            return;
        }

    } else {

        typewriter.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 70 : 120
    );
}

typeEffect();


gsap.from(".navbar", {

    y: -100,
    duration: 1,
    ease: "power4.out"

});

const heroTimeline = gsap.timeline();

heroTimeline

    .from(".small-title", {
        opacity: 0,
        y: 30,
        duration: .7
    })

    .from(".hero h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    }, "-=.3")

    .from(".hero-text", {
        opacity: 0,
        y: 30,
        duration: .7
    }, "-=.5")

    .from(".hero-buttons", {
        opacity: 0,
        y: 25,
        duration: .7
    }, "-=.4")

    .from(".hero-stats > div", {
        opacity: 0,
        y: 30,
        stagger: .15,
        duration: .6
    }, "-=.4");


gsap.to(".hero-glow", {

    x: 80,
    y: -50,

    duration: 4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.from(".facility-card", {

    scrollTrigger: {
        trigger: "#facilities",
        start: "top 75%",
        toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 80,
    scale: .9,
    duration: .8,
});


gsap.utils.toArray(".section-heading").forEach((heading) => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 85%"
        },
        opacity: 0,
        y: 50,

        duration: .8,
    });

});

gsap.from(".price-card", {

    scrollTrigger: {
        trigger: ".pricing",
        start: "top 80%"
    },

    opacity: 0,
    y: 60,

    duration: .8,

});

gsap.from(".service-box", {

    scrollTrigger: {
        trigger: ".service-grid",
        start: "top 80%"
    },

    opacity: 0,
    y: 70,

});

gsap.from(".cta", {

    scrollTrigger: {
        trigger: ".cta",
        start: "top 80%"
    },

    opacity: 0,
    scale: .92,

    duration: 1,

    ease: "power3.out"

});

gsap.from(".contact-info", {

    scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 80%"
    },

    opacity: 0,
    x: -70,

    duration: .9,

    ease: "power3.out"

});


gsap.from("#contactForm", {

    scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 80%"
    },

    opacity: 0,
    x: 70,

    duration: .9,

    ease: "power3.out"

});

document.querySelectorAll(".glass-card, .price-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 4;

        gsap.to(card, {

            rotateX: rotateX,
            rotateY: rotateY,

            duration: .3,

            transformPerspective: 800

        });

    });


    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            rotateX: 0,
            rotateY: 0,

            duration: .5

        });

    });

});

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    formMessage.textContent =
        "✓ Message sent successfully! We'll contact you soon.";

    gsap.fromTo(formMessage,

        {
            opacity: 0,
            y: 10
        },

        {
            opacity: 1,
            y: 0,
            duration: .5
        }

    );

    form.reset();

});

const menu = document.querySelector(".menu");
const nav = document.querySelector(".navbar nav");

menu.addEventListener("click", () => {

    nav.classList.toggle("mobile-nav");

});

const style = document.createElement("style");

style.innerHTML = `

@media(max-width:700px){

    .navbar nav.mobile-nav{

        display:flex;

        position:absolute;

        top:80px;
        left:5%;
        right:5%;

        padding:25px;

        flex-direction:column;

        gap:20px;

        background:rgba(15,10,24,.97);

        border:1px solid rgba(255,255,255,.1);

        border-radius:15px;

        backdrop-filter:blur(20px);

    }

}

`;

document.head.appendChild(style);