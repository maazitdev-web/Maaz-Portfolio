
/* =================================
   HERO TEXT ANIMATION
================================= */

// Select the text element
const roleText = document.getElementById("role-text");

// List of professions
const roles = [
    "Web Development",
    "Frontend Development",
    "UI Design",
    "Creative Web Experiences"
];

// Starting position
let roleIndex = 0;

// Change profession every 2 seconds
if (roleText) {

    setInterval(() => {

        // Fade out current text
        roleText.classList.add("fade-out");

        setTimeout(() => {

            // Move to next profession
            roleIndex++;

            // Restart when list ends
            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

            // Update text
            roleText.textContent = roles[roleIndex];

            // Fade in new text
            roleText.classList.remove("fade-out");

        }, 400);

    }, 2000);

}


/* =================================
   ANIMATED MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    // Open and close menu
    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        // Animate hamburger into cross
        menuToggle.classList.toggle("active", isOpen);

        // Update accessibility
        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

    // Close menu after clicking a link
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}

/* =================================
   CONTACT FORM SUBMISSION
================================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (contactForm && formStatus && submitBtn) {

    contactForm.addEventListener("submit", async function (event) {

        // Stop the default page redirect
        event.preventDefault();

        // Show sending status
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formStatus.textContent = "";

        try {

            // Send form data to Formspree
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                formStatus.textContent =
                    "Thank you! Your message has been sent successfully.";

                formStatus.style.color = "#ffffff";

                // Clear the form
                contactForm.reset();

            } else {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

                formStatus.style.color = "#ffffff";

            }

        } catch (error) {

            formStatus.textContent =
                "Unable to send your message. Please check your connection.";

            formStatus.style.color = "#ffffff";

        }

        // Restore the button
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";

    });

}


/* =================================
   PREMIUM SCROLL REVEAL ANIMATION
================================= */

// Enable JavaScript-based animations
document.documentElement.classList.add("js-enabled");

// Select elements from both directions
const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left"
);

// Check browser support
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    // Start the entrance animation
                    entry.target.classList.add("show");

                    // Stop observing after animation
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    // Observe every reveal element
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    // Show elements if IntersectionObserver is unsupported
    revealElements.forEach(element => {
        element.classList.add("show");
    });

}

/* =========================================
   ACTIVE NAVIGATION ON SCROLL
========================================= */

const activeNavLinks = document.querySelectorAll(
    '#nav-links a[href^="#"]'
);

const pageSections = document.querySelectorAll(
    "section[id]"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentSection = entry.target.id;

                    activeNavLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (link.getAttribute("href") === `#${currentSection}`) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* =========================================
   YOURSHOP CASE STUDY TOGGLE
========================================= */

const caseStudyButton = document.querySelector(".case-study-toggle");
const caseStudyClose = document.querySelector(".case-study-close");
const caseStudyContent = document.getElementById("yourshop-case-study");

if (caseStudyButton && caseStudyContent) {

    const buttonText = caseStudyButton.querySelector("span");

    // Function to open or close the case study
    function toggleCaseStudy(open) {

        caseStudyContent.classList.toggle("is-open", open);

        caseStudyButton.setAttribute(
            "aria-expanded",
            String(open)
        );

        buttonText.textContent = open
            ? "Show Less"
            : "View Case Study";

    }

    // Main button
    caseStudyButton.addEventListener("click", () => {

        const isOpen =
            caseStudyButton.getAttribute("aria-expanded") === "true";

        toggleCaseStudy(!isOpen);

    });

    // Show Less button inside the case study
    if (caseStudyClose) {

        caseStudyClose.addEventListener("click", () => {

            toggleCaseStudy(false);

            caseStudyButton.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }

}

