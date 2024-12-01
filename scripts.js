// Données des verbes
const verbs = [
    { base: "abide", past: "abode", participle: "abode", translation: "demeurer",image:"https://thumbs.dreamstime.com/b/abide-concept-word-blackboard-background-165087436.jpg" ,phrase:"She promised to abide by the rules." },
    { base: "awake", past: "awoke", participle: "awoken", translation: "(se) réveiller, aussi awake/awoke/awoke" },
    { base: "be", past: "was/were", participle: "been", translation: "être" },
    { base: "bear", past: "bore", participle: "borne", translation: "porter/supporter/soutenir" },
    { base: "beat", past: "beat", participle: "beaten", translation: "battre" },
    { base: "become", past: "became", participle: "become", translation: "devenir" },
    { base: "beget", past: "begat", participle: "begotten", translation: "engendrer, aussi beget/begot/begotten" },
    { base: "begin", past: "began", participle: "begun", translation: "commencer" },
    { base: "bend", past: "bent", participle: "bent", translation: "se courber" },
    { base: "bereave", past: "bereft", participle: "bereft", translation: "déposséder/priver" },
    { base: "bring", past: "brought", participle: "brought", translation: "apporter" },
    { base: "build", past: "built", participle: "built", translation: "construire" },
    { base: "burn", past: "burnt", participle: "burnt", translation: "brûler" },
    { base: "burst", past: "burst", participle: "burst", translation: "éclater" },
    { base: "buy", past: "bought", participle: "bought", trBanslation: "acheter" },
    { base: "cast", past: "cast", participle: "cast", translation: "jeter, etc." },
    { base: "catch", past: "caught", participle: "caught", translation: "attraper" },
    { base: "chide", past: "chid", participle: "chidden", translation: "gronder/réprimander, aussi chide/chid/chid" },
    { base: "choose", past: "chose", participle: "chosen", translation: "choisir" },
    { base: "cleave", past: "cleft", participle: "cleft", translation: "fendre/coller, aussi cleave/clove/clove" },
    { base: "cling", past: "clung", participle: "clung", translation: "se cramponner" },
    { base: "come", past: "came", participle: "come", translation: "venir" },
    { base: "cost", past: "cost", participle: "cost", translation: "coûter" },
    { base: "creep", past: "crept", participle: "crept", translation: "ramper/se glisser/se hérisser" },
    { base: "crow", past: "crew", participle: "crowed", translation: "chanter (un coq)/jubiler" },
    { base: "cut", past: "cut", participle: "cut", translation: "couper" },
    { base: "deal", past: "dealt", participle: "dealt", translation: "distribuer/traiter" },
    { base: "dig", past: "dug", participle: "dug", translation: "bêcher" },
    { base: "do", past: "did", participle: "done", translation: "faire" },
    { base: "draw", past: "drew", participle: "drawn", translation: "tirer/dessiner" },
    { base: "dream", past: "dreamt", participle: "dreamt", translation: "rêver" },
    { base: "drink", past: "drank", participle: "drunk", translation: "boire" },
    { base: "drive", past: "drove", participle: "driven", translation: "conduire" },
    { base: "dwell", past: "dwelt", participle: "dwelt", translation: "habiter/rester" },
    { base: "eat", past: "ate", participle: "eaten", translation: "manger" },
    { base: "fall", past: "fell", participle: "fallen", translation: "tomber" },
    { base: "feed", past: "fed", participle: "fed", translation: "nourrir" },
    { base: "feel", past: "felt", participle: "felt", translation: "(se) sentir" },
    { base: "fight", past: "fought", participle: "fought", translation: "combattre" },
    { base: "find", past: "found", participle: "found", translation: "trouver" }
];


let editingIndex = null;


function renderTable() {
    const tbody = document.querySelector('#verbTable tbody');
    tbody.innerHTML = '';

    // Sort verbs by base form (alphabetical order)
    verbs.sort((a, b) => a.base.localeCompare(b.base));

    // Keep track of added anchor IDs to avoid duplicates
    const addedAnchors = new Set();

    // Create rows for sorted verbs
    verbs.forEach((verb, index) => {
        const row = document.createElement('tr');

        // Add an anchor ID for the first occurrence of each starting letter
        const firstLetter = verb.base[0].toUpperCase();
        const idAttribute = !addedAnchors.has(firstLetter) ? `id="${firstLetter}"` : '';
        if (idAttribute) addedAnchors.add(firstLetter);

        row.innerHTML = `
            <td ${idAttribute}>${verb.base}</td>
            <td>${verb.past}</td>
            <td>${verb.participle}</td>
            <td>${verb.translation}</td>
            <td>
                <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteVerb(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    updateStatistics();
    updateLinks();
}



// Update statistics dynamically
function updateStatistics() {
    const stats = {};
    verbs.forEach(verb => {
        const firstLetter = verb.base[0].toUpperCase();
        stats[firstLetter] = (stats[firstLetter] || 0) + 1;
    });

    const avg = (verbs.length / Object.keys(stats).length).toFixed(2);
    let statsText = ` ${avg} verbs on Average per letter : `;
    for (const [letter, count] of Object.entries(stats)) {
        statsText += `${letter}→${count}, `;
    }

    document.getElementById('dynamicStats').textContent = statsText.slice(0, -2);
}

// Update links dynamically
function updateLinks() {
    const linkContainer = document.getElementById('dynamicLinks');
    linkContainer.innerHTML = '';

    const letters = [...new Set(verbs.map(v => v.base[0].toUpperCase()))].sort();
    letters.forEach(letter => {
        const link = document.createElement('li');
        link.innerHTML = `<a href="#${letter}" onclick="scrollToLetter('${letter}')">Verbs starting with '${letter}'</a>`;
        linkContainer.appendChild(link);
    });
}
function scrollToLetter(letter) {
    const target = document.getElementById(letter);
    if (target) {
        // Scroll into view smoothly
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Add highlight animation
        target.classList.add('highlight');

        // Remove the highlight class after animation ends
        setTimeout(() => {
            target.classList.remove('highlight');
        }, 1000); // Match the animation duration
    }
}


// Add a new verb
document.getElementById('addVerb').addEventListener('click', () => {
    const newVerb = {
        base: prompt('Enter base form:'),
        past: prompt('Enter past tense:'),
        participle: prompt('Enter past participle:'),
        translation: prompt('Enter translation:')
    };

    if (newVerb.base && newVerb.past && newVerb.participle && newVerb.translation) {
        verbs.push(newVerb);
        renderTable();
    }
});

// Search for a verb
document.getElementById('findVerbButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchVerb').value.toLowerCase();
    const rows = document.querySelectorAll('#verbTable tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});




function openEditModal(index) {
    editingIndex = index;
    const verb = verbs[index];
    // Display image and phrase without allowing edits
    document.getElementById('editImagePreview').src = verb.image; 
    document.getElementById('editPhrase').value = verb.phrase || "";

    // Populate editable fields
    document.getElementById('editBase').value = verb.base;
    document.getElementById('editPast').value = verb.past;
    document.getElementById('editParticiple').value = verb.participle;
    document.getElementById('editTranslation').value = verb.translation;

    // Show the modal
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    editingIndex = null;
}

document.getElementById('updateVerb').addEventListener('click', () => {
    if (editingIndex !== null) {
        // Update only editable fields
        verbs[editingIndex].base = document.getElementById('editBase').value;
        verbs[editingIndex].past = document.getElementById('editPast').value;
        verbs[editingIndex].participle = document.getElementById('editParticiple').value;
        verbs[editingIndex].translation = document.getElementById('editTranslation').value;

        // Optionally re-render the table
        renderTable();
        closeModal();
    }
});

// Delete verb
function deleteVerb(index) {
    if (confirm('Are you sure you want to delete this verb?')) {
        verbs.splice(index, 1);
        renderTable();
    }
}

// Swap columns
document.getElementById('swapButton').addEventListener('click', () => {
    const container = document.querySelector('.container');
    const tableContainer = document.querySelector('.table-container');
    const sidebar = document.querySelector('.sidebar');

    // Check the current order and toggle
    if (sidebar.nextElementSibling === tableContainer) {
        // Sidebar is before tableContainer, move it after
        container.insertBefore(tableContainer, sidebar);
    } else {
        // Sidebar is after tableContainer, move it before
        container.insertBefore(sidebar, tableContainer);
    }
});


// Initialize table
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});