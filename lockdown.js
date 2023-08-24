const schrodingerLogic = true;
const lockdownDuration = 60000; // 1 minute
const lockdownEnd = localStorage.getItem('lockdownEnd');

function initiateLockdown() {
    localStorage.setItem('lockdownEnd', Date.now() + lockdownDuration);
    window.location.href = 'errorPage.html';
}

if (schrodingerLogic) {
    if (lockdownEnd) {
        if (Date.now() < lockdownEnd) {
            // Still in lockdown
            window.location.href = 'errorPage.html';
        } else {
            // Lockdown ended
            localStorage.removeItem('lockdownEnd');
            document.body.style.display = 'block';  // show the homepage content
        }
    } else {
        // No lockdown initiated yet, let's start one
        initiateLockdown();
    }
} else {
    document.body.style.display = 'block';  // show the homepage content
}