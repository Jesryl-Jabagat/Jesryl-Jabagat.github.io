/* --------------- carousel codes --------------- */
class Carousel {
    constructor(carousel) {
        this.carousel = carousel;
        this.track = carousel.querySelector('.carousel__track');
        this.slides = Array.from(this.track.children);
        this.nextButton = carousel.querySelector('.carousel__button-right');
        this.prevButton = carousel.querySelector('.carousel__button-left');
        this.navDots = carousel.querySelector('.carousel__nav');
        this.dots = Array.from(this.navDots.children);

        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.currentSlide = 0;

        
        this.autoSlideInterval = 5000;

        this.init();
    }

    init() {
        this.slides.forEach((slide, index) => {
            slide.style.left = this.slideWidth * index + 'px';
        });

        
        this.nextButton.addEventListener('click', () => this.moveToNextSlide());
        this.prevButton.addEventListener('click', () => this.moveToPrevSlide());
        this.navDots.addEventListener('click', (e) => this.handleDotClick(e));

        this.startAutoSlide();
    }

    moveToSlide(currentSlide, targetSlide) {
        this.track.style.transform = `translateX(-${targetSlide.style.left})`;

        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');

        const currentDot = this.dots.find(dot => dot.classList.contains('current-slide'));
        const targetDot = this.dots[this.slides.indexOf(targetSlide)];

        if (currentDot) currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    moveToNextSlide() {
        const currentSlide = this.track.querySelector('.current-slide') || this.slides[0];
        const nextSlide = currentSlide.nextElementSibling || this.slides[0];
        this.moveToSlide(currentSlide, nextSlide);
    }

    moveToPrevSlide() {
        const currentSlide = this.track.querySelector('.current-slide') || this.slides[0];
        const prevSlide = currentSlide.previousElementSibling || this.slides[this.slides.length - 1];
        this.moveToSlide(currentSlide, prevSlide);
    }

    handleDotClick(e) {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = this.track.querySelector('.current-slide') || this.slides[0];
        const targetIndex = this.dots.findIndex(dot => dot === targetDot);
        const targetSlide = this.slides[targetIndex];

        this.moveToSlide(currentSlide, targetSlide);
    }

    startAutoSlide() {
        this.autoSlide = setInterval(() => {
            this.moveToNextSlide();
        }, this.autoSlideInterval);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlide);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    new Carousel(carousel);
});


/* --------------- chatbox codes --------------- */

function openChat() {
    document.getElementById('chatbox').style.display = 'block';
    startChat(); 
}

function closeChat() {
    document.getElementById('chatbox').style.display = 'none';
}

function startChat() {
    
    addMessage('support', "Hello! How can I assist you today?");
    showQuickReplies(); 
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    if (userInput.value.trim()) {
        addMessage('user', userInput.value);
        const reply = generateDynamicReply(userInput.value);  
        userInput.value = ''; 
        setTimeout(() => addMessage('support', reply), 1000); 
    }
}

function addMessage(sender, text) {
    const messageContainer = document.getElementById('messages');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = text;
    
    message.appendChild(bubble);
    messageContainer.appendChild(message);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function showQuickReplies() {
    const messageContainer = document.getElementById('messages');
    const replyContainer = document.createElement('div');
    replyContainer.classList.add('quick-replies');

    const options = [
        "Pricing Information",
        "Course Details",
        "Contact Support"
    ];

    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('quick-reply-btn');
        button.textContent = option;
        button.onclick = () => handleQuickReply(option);
        replyContainer.appendChild(button);
    });

    messageContainer.appendChild(replyContainer);
}

function handleQuickReply(option) {
    addMessage('user', option); 
    simulateSupportReplyBasedOnOption(option); 
}

function simulateSupportReplyBasedOnOption(option) {
    let reply = '';
    
    
    if (option === "Pricing Information") {
        reply = "Our pricing starts at $99 for basic packages. We also offer discounts for bundles and early sign-ups. Would you like more information on pricing?";
    } else if (option === "Course Details") {
        reply = "We offer courses in various areas like landscape photography, wildlife photography, and editing techniques. Let us know which course you're interested in!";
    } else if (option === "Contact Support") {
        reply = "You can reach our support team at naturelens@gmail.com. How else can we assist you today?";
    } else {
        reply = "Sorry, I didn’t catch that. Please select an option or type your question.";
    }

    setTimeout(() => addMessage('support', reply), 1000); 
}


function generateDynamicReply(userInput) {
    const input = userInput.toLowerCase();

    if (input.includes('pricing') || input.includes('cost') || input.includes('how much')) {
        return "Our pricing starts at $99 for the basic package. Would you like to explore different package options or details?";
    } else if (input.includes('course') || input.includes('learning') || input.includes('class')) {
        return "We offer courses in various areas like nature photography, wildlife photography, and editing techniques. What specifically are you interested in learning?";
    } else if (input.includes('support') || input.includes('help') || input.includes('contact')) {
        return "You can always contact our support team at naturelens@gmail.com. What kind of help do you need today?";
    } else if (input.includes('nature') || input.includes('photography') || input.includes('landscape')) {
        return "Nature photography is our specialty! Do you want tips on shooting landscapes, wildlife, or both?";
    } else if (input.includes('portfolio') || input.includes('showcase') || input.includes('work')) {
        return "Your portfolio is essential! We can guide you on how to build a compelling nature photography portfolio.";
    } else if (input.includes('editing') || input.includes('post-processing') || input.includes('photoshop')) {
        return "Editing is a crucial part of photography! We can teach you how to enhance your photos with various post-processing techniques.";
    } else if (input.includes('sign up') || input.includes('join') || input.includes('enroll')) {
        return "You can sign up for our courses on our website. Would you like more details on the sign-up process?";
    }
    else if(input.includes('hi')){
        return "Hello, how may i help you?";
    }
    else {
        return "Sorry, I didn't quite catch that. Could you please provide more details or choose from the options?";
    }
}

/* --------------- navbar codes --------------- */

let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    const navbar = document.querySelector("nav"); 
    const navLinks = document.querySelectorAll(".links-container a");
    var logoimage = document.getElementById("LOGO");
    const svgIcon = document.querySelector('.open-sidebar-button svg');
    const linkin = document.querySelectorAll(".links-container ");
    
   


    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0"; 
    } else {
        navbar.style.top = "-100px";
    }
    prevScrollpos = currentScrollPos; 
    let taas = window.scrollY;

    const logColor = document.querySelector(".login-button");
    if (taas === 0) {
        navbar.style.backgroundColor = "transparent";
        navLinks.forEach(link => {
            link.style.color = "white"; 
        });
        navLinks.forEach((link) => (link.style.textDecorationColor = "white"));
        svgIcon.style.fill = "white"; 
        logoimage.src = "asset/whiteLogo.png";
    } else {
        navbar.style.backgroundColor = "white";
        navLinks.forEach(link => {
            link.style.color = "black"; 
        });
        navLinks.forEach((link) => (link.style.textDecorationColor = "black"));
        logoimage.src = "asset/blackLogo.png";
        svgIcon.style.fill = "black";
        logColor.style.color = "white";
    }

    
};

/* --------------- navbar active codes --------------- */
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".links-container li a");

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [  0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], 
    };

    const callback = (entries) => {
        entries.forEach((entry) => {
           
            if (entry.intersectionRatio > 0) {
                const sectionData = entry.target.getAttribute("data-section");
                
                
                navLinks.forEach((link) => link.classList.remove("active"));

                
                navLinks.forEach((link) => {
                    if (link.getAttribute("data-section") === sectionData) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    sections.forEach((section) => {
        observer.observe(section);
    });

    
    const initialActiveSection = sections[0];
    const initialSectionData = initialActiveSection.getAttribute("data-section");
    navLinks.forEach((link) => {
        if (link.getAttribute("data-section") === initialSectionData) {
            link.classList.add("active");
        }
    });
});


/* --------------- logsign codes --------------- */

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-button');
    const formContainer = document.querySelector('.form-container');
    const closeButton = document.querySelector('.close-btn');
    const toggleFormLink = document.querySelector('#toggleFormLink');
    const loginForm = document.querySelector('#loginForm');
    const signupForm = document.querySelector('#signupForm');

    loginButton.addEventListener('click', function() {
        formContainer.style.display = 'block'; 
        loginForm.style.display = 'block'; 
        signupForm.style.display = 'none'; 
    });

   
    closeButton.addEventListener('click', function() {
        formContainer.style.display = 'none'; 
    });

    
  
function showSuccessMessage(message) {
    alert(message);
}


loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
   
    showSuccessMessage('Login successful!');
    formContainer.style.display = 'none'; 
});


signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    

    showSuccessMessage('Account created successfully!');
    formContainer.style.display = 'none'; 
});

    toggleFormLink.addEventListener('click', function(e) {
        e.preventDefault(); 

        
        if (loginForm.style.display === 'block') {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            toggleFormLink.innerHTML = "Already have an account? <a href='#'>Login</a>";
        } else {
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
            toggleFormLink.innerHTML = "Don't have an account? <a href='#'>Sign Up</a>";
        }
    });
});


  