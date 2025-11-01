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
});