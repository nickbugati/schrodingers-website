const schrodingerLogic = true; // Set to true for production, false for development
let lockdownDuration = 60000; // 1 minute

if (!schrodingerLogic) {
    lockdownDuration = 0; // Bypass the lockdown for development purposes
}

const lockdownEnd = Number(localStorage.getItem('lockdownEnd'));

console.log("Schrodinger Logic: ", schrodingerLogic);
console.log("Lockdown Duration: ", lockdownDuration);
console.log("Lockdown End from localStorage: ", lockdownEnd);

function initiateLockdown() {
    localStorage.setItem('lockdownEnd', Date.now() + lockdownDuration);
    window.location.reload(); // Refresh the page to reflect the new state
}

console.log("Schrodinger Logic: ", schrodingerLogic);
console.log("Lockdown Duration: ", lockdownDuration);

if (!lockdownEnd) {
    console.log("No lockdown end detected. Initiating lockdown.");
    initiateLockdown();
} else {
    console.log("Existing lockdown end: ", new Date(lockdownEnd * 1));

    if (Date.now() >= lockdownEnd) {
        console.log("Lockdown expired. Navigating to home.html.");
        window.location.href = 'home.html';
    } else {
        console.log("Lockdown still active. Not navigating.");
    }
}
