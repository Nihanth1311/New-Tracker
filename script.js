const subjects = {
    "Biology": ["Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom", "Morphology of Plants", "Anatomy of Flowering Plants", "Structural Organisation", "Cell Unit of Life", "Biomolecules", "Cell Cycle", "Photosynthesis", "Respiration", "Plant Growth and Development", "Breathing", "Body Fluids", "Excretion", "Locomotion", "Neural Control", "Chemical Coordination", "Sexual Reproduction in Flowering Plants", "Human Reproduction", "Reproductive Health", "Principles of Inheritance", "Molecular Basis", "Evolution", "Human Health and Diseases", "Microbes in Human Welfare", "Biotechnology Principles", "Biotechnology Applications", "Organisms and Populations", "Ecosystem", "Biodiversity"],
    "Chemistry": ["Some Basic Concepts", "Structure of Atom", "Classification of Elements", "Chemical Bonding", "Thermodynamics", "Equilibrium", "Redox Reactions", "P Block 13-14", "Organic Chemistry", "Hydrocarbons", "Solutions", "Electrochemistry", "Chemical Kinetics", "P Block 15-18", "D and F Blocks", "Coordination Compounds", "Haloalkanes and Haloarenes", "Alcohols, Phenols, and Ethers", "Aldehydes, Ketones, and Carboxylic Acids", "Amines", "Biomolecules"],
    "Physics": ["Units and Measurements", "Motion 1D", "Motion 2D", "Laws of Motion", "Work, Power, Energy", "System of Particles", "Gravitation", "Mechanical Solids", "Mechanical Fluids", "Thermal Properties", "Thermodynamics", "Kinetic Theory", "Oscillations", "Waves", "Electric Charges", "Electrostatic Potential", "Current Electricity", "Moving Charges", "Magnetism and Matter", "EMI", "AC", "EMW", "Ray Optics", "Wave Optics", "Dual Nature", "Atoms", "Nuclei", "Semiconductors"]
};

const quotes = [
    "You're doing amazing, Bujjamma!",
    "One step closer to your dreams. Proud of you!",
    "Nuvve naa Bangaram Bujjiii",
    "Study hard, Tanu! I'm always cheering for you.",
    "You are my best decision. Keep going!",
    "Every chapter you finish makes me more proud.",
    "Don't stress, Kadali. You've got this!"
];

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

function updateProgressUI() {
    // 1. Calculate Subject-wise percentages
    for (const subject in subjects) {
        const subjectCBs = document.querySelectorAll(`.cb-${subject}`);
        const checked = Array.from(subjectCBs).filter(c => c.checked).length;
        const percent = Math.round((checked / subjectCBs.length) * 100);
        
        const badge = document.getElementById(`percent-${subject}`);
        if(badge) badge.innerText = `${percent}% Done`;
    }

    // 2. Calculate Total overall percentage
    const all = document.querySelectorAll('input[type="checkbox"]');
    const totalChecked = Array.from(all).filter(c => c.checked).length;
    const totalPercent = Math.round((totalChecked / all.length) * 100);
    
    document.getElementById('progress-bar').style.width = totalPercent + '%';
    document.getElementById('stats').innerText = `${totalChecked} / ${all.length} Chapters`;
    document.getElementById('overall-percent').innerText = `${totalPercent}% Total`;
}

function toggleLesson(id) {
    const isChecked = document.getElementById(id).checked;
    if (isChecked) showNote();
    saveProgress();
    updateProgressUI();
}

function showNote() {
    const box = document.getElementById('love-note-box');
    const text = document.getElementById('note-text');
    text.innerText = quotes[Math.floor(Math.random() * quotes.length)];
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
    localStorage.setItem('study_progress', JSON.stringify(status));
}

function loadProgress() {
    const saved = JSON.parse(localStorage.getItem('study_progress')) || {};
    Object.keys(saved).forEach(id => {
        const cb = document.getElementById(id);
        if (cb) cb.checked = saved[id];
    });
    updateProgressUI();
}


function clearAll() {
    if(confirm("Reset all progress?")) {
        localStorage.removeItem('study_progress');
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', init);
