/**
 * Bujjamma's Study Tracker - Complete Logic
 */

const subjects = {
    "Biology": ["Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom", "Morphology of Plants", "Anatomy of Flowering Plants", "Structural Organisation", "Cell Unit of Life", "Biomolecules", "Cell Cycle", "Photosynthesis", "Respiration", "Plant Growth and Development", "Breathing", "Body Fluids", "Excretion", "Locomotion", "Neural Control", "Chemical Coordination", "Sexual Reproduction in Flowering Plants", "Human Reproduction", "Reproductive Health", "Principles of Inheritance", "Molecular Basis", "Evolution", "Human Health and Diseases", "Microbes in Human Welfare", "Biotechnology Principles", "Biotechnology Applications", "Organisms and Populations", "Ecosystem", "Biodiversity"],
    "Chemistry": ["Some Basic Concepts", "Structure of Atom", "Classification of Elements", "Chemical Bonding", "Thermodynamics", "Equilibrium", "Redox Reactions", "P Block 13-14", "Organic Chemistry", "Hydrocarbons", "Solutions", "Electrochemistry", "Chemical Kinetics", "P Block 15-18", "D and F Blocks", "Coordination Compounds", "Haloalkanes and Haloarenes", "Alcohols, Phenols, and Ethers", "Aldehydes, Ketones, and Carboxylic Acids", "Amines", "Biomolecules"],
    "Physics": ["Units and Measurements", "Motion 1D", "Motion 2D", "Laws of Motion", "Work, Power, Energy", "System of Particles", "Gravitation", "Mechanical Solids", "Mechanical Fluids", "Thermal Properties", "Thermodynamics", "Kinetic Theory", "Oscillations", "Waves", "Electric Charges", "Electrostatic Potential", "Current Electricity", "Moving Charges", "Magnetism and Matter", "EMI", "AC", "EMW", "Ray Optics", "Wave Optics", "Dual Nature", "Atoms", "Nuclei", "Semiconductors"]
};

const quotes = [
    "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    "Bujji, study hard , I want your mini versions",
    "Nee Babu ki cheppi ninnu pattukellipota",
    "Nannu eppudu vadalaku pleaseeeee",
    "Kittuu proud ga undali gaaaaa, chaduvuu , lessgooooo",
    "Nuvve naa Bangaram Bujjiii",
    "Website create cheadam late ayyindi, sorry, nee husband nee gaaa forgive cheseyyyyyy",
    "You are My Home Tanu",
    "Honest ga cheptunna, you are my best decision",
    "There is no breaking up for us bujji",
    "I may break down sometimes, but with you beside me, I wont",
    "You are the best thing that happened to ME",
    "Gardening chesta annav kada, I will help you everyday by doing something watering plants",
    "Everything feels different with you",
    "You are the rhythm of my heart, Tanu.",
    "Every chapter you finish makes me fall for you more.",
    "Study well, my future doctor!",
    "I'm so lucky to have you as my partner.",
    "Your smile is my favorite motivation.",
    "Distance means nothing when someone means everything.",
    "I believe in you more than anything, Bujjamma.",
    "You've got the brains and the beauty—unstoppable!",
    "Can't wait to celebrate your success together.",
    "You are my today and all of my tomorrows.",
    "Just a little more effort, and you'll reach the top.",
    "I'm always here, cheering for you in the front row.",
    "Your hard work will pay off, I promise.",
    "You make my world so much brighter.",
    "Stay focused, my love. Greatness takes time.",
    "I love the way you chase your dreams.",
    "You are my favorite person to talk to after a long day.",
    "Treat yourself to a break—you've earned it!",
    "One more lesson? You can do it!",
    "I am so incredibly proud of your dedication.",
    "No matter how hard it gets, we face it together.",
    "You are my safe haven, Tanu.",
    "Seeing your progress makes my day.",
    "Keep going, my brilliant Bujjamma!",
    "My heart is wherever you are.",
    "I'll be the one holding the flowers at your graduation.",
    "You've already come so far. Keep pushing!",
    "Life is better with you by my side.",
    "I love your 'study face'—it's so cute.",
    "Success is coming for you, just keep at it.",
    "You're not just smart, you're extraordinary.",
    "Thinking of you keeps me going too.",
    "You're the strongest person I know.",
    "Don't forget to hydrate, my busy bee!",
    "Your ambition is one of the things I love most about you.",
    "Everything is possible for a girl like you.",
    "The world isn't ready for your brilliance!",
    "I'm counting down the days until I see you.",
    "You are my peace in the chaos.",
    "Each checkbox is a step closer to our future.",
    "I love you more than words can express.",
    "You are my sunshine on a cloudy day.",
    "Your potential is limitless, Bujjamma.",
    "I'll always be your #1 fan.",
    "Stay positive, stay brave, stay you.",
    "I'm sending you a big virtual hug right now!",
    "You are worth all the effort in the world.",
    "I love growing with you.",
    "Take it one step at a time, Tanu.",
    "Your brain is as beautiful as your heart.",
    "I'm so proud to call you mine.",
    "You're doing better than you think.",
    "Keep your chin up, the finish line is near.",
    "I cherish every moment we share.",
    "You are the anchor of my life.",
    "Go get 'em, tiger!",
    "Your passion inspires me every day.",
    "You are the most precious thing I own.",
    "Work hard now, relax with me later!",
    "I'm so glad we're on this journey together.",
    "You make me want to be a better man.",
    "The best is yet to come for us.",
    "You are my forever and always.",
    "I love your determination.",
    "Just think of how happy you'll be when you're done!",
    "You are simply irreplaceable.",
    "I love you to the moon and back, Bujjamma."
];

// List to track unused quotes
let availableQuotes = JSON.parse(localStorage.getItem('unused_quotes')) || [...quotes];

function init() {
    const grid = document.getElementById('subjects-grid');
    let html = '';

    for (const [subject, lessons] of Object.entries(subjects)) {
        html += `
            <div class="subject-card">
                <div class="subject-header">
                    <h2>${subject}</h2>
                    <span id="percent-${subject}" class="subject-percent">0% Done</span>
                </div>
                <div class="lesson-list">
                    ${lessons.map((lesson, i) => {
                        const id = `${subject}-${i}`.replace(/\s+/g, '');
                        return `
                            <div class="lesson-item">
                                <input type="checkbox" id="${id}" class="cb-${subject}" onchange="toggleLesson('${id}')">
                                <label for="${id}">${lesson}</label>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    grid.innerHTML = html;
    loadProgress();
}

function toggleLesson(id) {
    const isChecked = document.getElementById(id).checked;
    if (isChecked) {
        showNote();
    }
    saveProgress();
    updateProgressUI();
}

function showNote() {
    const box = document.getElementById('love-note-box');
    const text = document.getElementById('note-text');

    // Reset if all quotes have been used
    if (availableQuotes.length === 0) {
        availableQuotes = [...quotes];
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const quote = availableQuotes.splice(randomIndex, 1)[0];

    // Save the remaining unused quotes to localStorage
    localStorage.setItem('unused_quotes', JSON.stringify(availableQuotes));

    text.innerText = quote;
    box.classList.remove('hidden');
}

function hideNote() {
    document.getElementById('love-note-box').classList.add('hidden');
}

function saveProgress() {
    const status = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        status[cb.id] = cb.checked;
    });
    localStorage.setItem('bujjamma_study_data', JSON.stringify(status));
}

function loadProgress() {
    const saved = JSON.parse(localStorage.getItem('bujjamma_study_data')) || {};
    Object.keys(saved).forEach(id => {
        const cb = document.getElementById(id);
        if (cb) cb.checked = saved[id];
    });
    updateProgressUI();
}

function updateProgressUI() {
    // Subject wise percentage logic
    for (const subject in subjects) {
        const subjectCBs = document.querySelectorAll(`.cb-${subject}`);
        const checked = Array.from(subjectCBs).filter(c => c.checked).length;
        const percent = Math.round((checked / subjectCBs.length) * 100);
        
        const badge = document.getElementById(`percent-${subject}`);
        if(badge) badge.innerText = `${percent}% Done`;
    }

    // Overall percentage logic
    const all = document.querySelectorAll('input[type="checkbox"]');
    const totalChecked = Array.from(all).filter(c => c.checked).length;
    const totalPercent = Math.round((totalChecked / all.length) * 100);
    
    const progressBar = document.getElementById('progress-bar');
    const statsText = document.getElementById('stats');
    const overallPercentText = document.getElementById('overall-percent');

    if(progressBar) progressBar.style.width = totalPercent + '%';
    if(statsText) statsText.innerText = `${totalChecked} / ${all.length} Chapters`;
    if(overallPercentText) overallPercentText.innerText = `${totalPercent}% Total`;
}

function clearAll() {
    if(confirm("Reset all progress, Bujjamma? This will also reset your unique quote list!")) {
        localStorage.removeItem('bujjamma_study_data');
        localStorage.removeItem('unused_quotes');
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', init);
