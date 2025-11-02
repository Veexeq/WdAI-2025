// Apparently a good practice to ensure the script is loaded only after
// loading everything else, despite defer in HTML <script> tag
document.addEventListener('DOMContentLoaded', () => {

    // Show-hide logic in projects section
    const projectHeaders = document.querySelectorAll('#previous-projects h2');
    projectHeaders.forEach(header => {
        header.addEventListener('click', () => {
            
            // Directly below a header is a <p>
            const content = header.nextElementSibling;

            // Make sure that the type matches
            if (content && content.tagName === 'P') {
                content.classList.toggle('is-hidden');
                header.classList.toggle('is-open');
            }
        });
    });

    // Website theme
    const themeToggle = document.querySelector('.theme-switch input[type="checkbox"]');
    const body = document.body;

    // A key for localStorage
    const THEME_KEY = 'theme-preference';

    function applyTheme(theme) {
        console.log(theme);
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('light-mode');
            themeToggle.checked = false;
        }

        // Save the preference in localStorage
        localStorage.setItem(THEME_KEY, theme);
    }

    function checkInitialTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);

        // If it was set before (it exists in localStorage)
        if (savedTheme) {
            applyTheme(savedTheme);
        } 
        // If it wasn't set before, go with the browser's theme
        else {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            if (prefersLight) {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        }
    }

    function handleThemeToggle() {
        if (themeToggle.checked) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    }

    checkInitialTheme();
    themeToggle.addEventListener('change', handleThemeToggle);

    // Scroll Spy logic

    // Begins with "#", exclude only "#"
    const navLinks = document.querySelectorAll('aside nav a[href^="#"]:not([href="#"])');
    
    // An array of sections based on ids
    const sections = Array.from(navLinks).map(link => {
        const href = link.getAttribute('href');
        return document.querySelector(href);   
    });

    // An object containing margin due to the header and a threshold
    // When 30% of the section will be below the margin, activate the link
    const observerOptions = {
        root: null,
        threshold: 0.3
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionID = entry.target.id;
                const activeLink = document.querySelector(`aside nav a[href="#${currentSectionID}"]`);
                
                // Delete the class from all of the other elements
                navLinks.forEach(link => link.classList.remove('active-link'));
            
                // Add it only to the appropriate one
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    };

    // New Scroll Spy
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });

    // Clock script
    const hoursElement = document.getElementById('clock-hours');
    const minutesElement = document.getElementById('clock-minutes');
    const secondsElement = document.getElementById('clock-seconds');

    // Update the clock every 1000 ms
    setInterval(() => {
        const currDate = new Date();

        hoursElement.innerHTML = currDate.getHours();
        minutesElement.innerHTML = currDate.getMinutes();
        secondsElement.innerHTML = currDate.getSeconds();
    }, 1000);
});