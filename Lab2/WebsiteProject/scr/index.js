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

function applyTheme(theme) {
    console.log(theme);
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('light-mode');
        themeToggle.checked = false;
    }
}

function handleThemeToggle() {
    if (themeToggle.checked) {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }
}

themeToggle.addEventListener('change', handleThemeToggle);