const schrodingerLogic = true; // Set to true for production, false for development
let lockdownDuration = 60000; // 1 minute

if (!schrodingerLogic) {
    lockdownDuration = 0; // Bypass the lockdown for development purposes
}

// Set a new lockdown timer immediately upon script execution
localStorage.setItem('lockdownEnd', Date.now() + lockdownDuration);

// Now fetch that value for checks
const lockdownEnd = Number(localStorage.getItem('lockdownEnd'));

console.log("Schrodinger Logic: ", schrodingerLogic);
console.log("Lockdown Duration: ", lockdownDuration);
console.log("Lockdown End from localStorage: ", lockdownEnd);

if (lockdownEnd) {
    console.log("Existing lockdown end: ", new Date(lockdownEnd));

    if (Date.now() >= lockdownEnd) {
        console.log("Lockdown expired (which should be impossible). Navigating to home.html.");
        window.location.href = 'home.html';
    } else {
        console.log("Lockdown still active. Not navigating.");
    }
} else {
    console.log("No lockdown end detected. This should never happen as we always initiate a lockdown.");
}