document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content');
    const tiles = document.querySelectorAll('.tile');

    const sections = {
        piano: createPianoSection,
        animals: createAnimalsSection,
        colors: createColorsSection,
        occupation: createOccupationsSection,
        alphabet: createAlphabetSection
    };

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const section = tile.dataset.section;
            if (section === 'piano') {
                window.location.href = 'piano.html';
            } else if (section === 'colors') {
                window.location.href = 'colors.html';
            } else if (section === 'animals') {
                window.location.href = 'animals.html';
            } else if (section === 'occupation') {
                window.location.href = 'occupation.html';
            } else if (section === 'alphabet') {
                window.location.href = 'alphabet.html';
            } else if (sections[section]) {
                contentArea.style.display = 'block';
                contentArea.innerHTML = '';
                sections[section]();
            }
        });
    });
});

function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
}

function createPianoSection() {
    const piano = document.createElement('div');
    piano.className = 'piano';
    piano.style.display = 'flex';
    piano.style.justifyContent = 'center';
    piano.style.padding = '20px';

    const notes = [
        { note: 'C', freq: 261.63, key: 'white' },
        { note: 'C#', freq: 277.18, key: 'black' },
        { note: 'D', freq: 293.66, key: 'white' },
        { note: 'D#', freq: 311.13, key: 'black' },
        { note: 'E', freq: 329.63, key: 'white' },
        { note: 'F', freq: 349.23, key: 'white' },
        { note: 'F#', freq: 369.99, key: 'black' },
        { note: 'G', freq: 392.00, key: 'white' },
        { note: 'G#', freq: 415.30, key: 'black' },
        { note: 'A', freq: 440.00, key: 'white' },
        { note: 'A#', freq: 466.16, key: 'black' },
        { note: 'B', freq: 493.88, key: 'white' }
    ];

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    notes.forEach(noteData => {
        const key = document.createElement('div');
        key.className = `piano-key ${noteData.key}-key`;
        key.style.width = noteData.key === 'white' ? '50px' : '30px';
        key.style.height = noteData.key === 'white' ? '200px' : '120px';
        key.style.backgroundColor = noteData.key === 'white' ? '#fff' : '#000';
        key.style.border = '1px solid #000';
        key.style.position = noteData.key === 'black' ? 'absolute' : 'relative';
        key.style.marginLeft = noteData.key === 'black' ? '-15px' : '0';
        key.style.zIndex = noteData.key === 'black' ? '1' : '0';
        key.style.cursor = 'pointer';

        key.addEventListener('click', () => {
            key.style.transform = 'scale(0.98)';
            setTimeout(() => key.style.transform = 'scale(1)', 100);

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(noteData.freq, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1);
        });

        piano.appendChild(key);
    });

    document.getElementById('content').appendChild(piano);
}

function createAnimalsSection() {
    const animals = ['Lion', 'Dog', 'Cat', 'Elephant', 'Bird'];
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
    grid.style.gap = '20px';

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.innerHTML = `
            <img src="https://source.unsplash.com/100x100/?${animal}" alt="${animal}">
            <h3>${animal}</h3>
        `;
        card.style.padding = '15px';
        card.style.background = '#fff';
        card.style.borderRadius = '10px';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'center';

        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = 'scale(1)', 100);
            const utterance = new SpeechSynthesisUtterance(animal);
            window.speechSynthesis.speak(utterance);
        });

        grid.appendChild(card);
    });

    document.getElementById('content').appendChild(grid);
}

function createColorsSection() {
    const colors = [
        { hex: '#FF0000', name: 'Red' },
        { hex: '#00FF00', name: 'Green' },
        { hex: '#0000FF', name: 'Blue' },
        { hex: '#FFFF00', name: 'Yellow' },
        { hex: '#FF00FF', name: 'Pink' }
    ];
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))';
    grid.style.gap = '10px';

    colors.forEach(color => {
        const square = document.createElement('div');
        square.style.background = color.hex;
        square.style.height = '100px';
        square.style.borderRadius = '10px';
        square.style.cursor = 'pointer';
        square.style.display = 'flex';
        square.style.alignItems = 'center';
        square.style.justifyContent = 'center';
        square.style.color = color.hex === '#FFFF00' ? '#000' : '#FFF';
        square.style.fontWeight = 'bold';
        square.textContent = color.name;

        square.addEventListener('click', () => {
            document.body.style.background = color.hex;
            setTimeout(() => document.body.style.background = '', 2000);
            const utterance = new SpeechSynthesisUtterance(color.name);
            window.speechSynthesis.speak(utterance);
        });

        grid.appendChild(square);
    });

    document.getElementById('content').appendChild(grid);
}

function createOccupationsSection() {
    const occupations = ['Doctor', 'Teacher', 'Firefighter', 'Chef', 'Artist'];
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap = '20px';

    occupations.forEach(job => {
        const card = document.createElement('div');
        card.className = 'occupation-card';
        card.innerHTML = `
            <img src="https://source.unsplash.com/100x100/?${job}" alt="${job}">
            <h3>${job}</h3>
        `;
        card.style.padding = '15px';
        card.style.background = '#fff';
        card.style.borderRadius = '10px';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'center';

        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = 'scale(1)', 100);
            const utterance = new SpeechSynthesisUtterance(job);
            window.speechSynthesis.speak(utterance);
        });

        grid.appendChild(card);
    });

    document.getElementById('content').appendChild(grid);
}

function createAlphabetSection() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(80px, 1fr))';
    grid.style.gap = '10px';

    alphabet.forEach(letter => {
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        tile.style.padding = '20px';
        tile.style.background = '#fff';
        tile.style.borderRadius = '10px';
        tile.style.cursor = 'pointer';
        tile.style.textAlign = 'center';
        tile.style.fontSize = '24px';
        tile.style.fontWeight = 'bold';

        tile.addEventListener('click', () => {
            tile.style.transform = 'scale(0.95)';
            setTimeout(() => tile.style.transform = 'scale(1)', 100);
            const utterance = new SpeechSynthesisUtterance(letter);
            window.speechSynthesis.speak(utterance);
        });

        grid.appendChild(tile);
    });

    document.getElementById('content').appendChild(grid);
}