
document.addEventListener('DOMContentLoaded', () => {
    const piano = document.createElement('div');
    piano.className = 'piano';
    piano.style.display = 'flex';
    piano.style.justifyContent = 'center';
    piano.style.padding = '20px';

    // Extended notes array with multiple octaves
    const baseNotes = [
        { note: 'C', key: 'white' },
        { note: 'C#', key: 'black' },
        { note: 'D', key: 'white' },
        { note: 'D#', key: 'black' },
        { note: 'E', key: 'white' },
        { note: 'F', key: 'white' },
        { note: 'F#', key: 'black' },
        { note: 'G', key: 'white' },
        { note: 'G#', key: 'black' },
        { note: 'A', key: 'white' },
        { note: 'A#', key: 'black' },
        { note: 'B', key: 'white' }
    ];

    // Create 32 keys by using multiple octaves
    const notes = [];
    const baseFreq = 110; // Starting from A2
    for (let octave = 0; octave < 3; octave++) {
        baseNotes.forEach((noteData, index) => {
            if (notes.length < 32) {
                const freq = baseFreq * Math.pow(2, (octave * 12 + index) / 12);
                notes.push({
                    ...noteData,
                    freq: freq
                });
            }
        });
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    notes.forEach((noteData, index) => {
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
        key.style.borderRadius = '0 0 4px 4px';
        if (noteData.key === 'black') {
            const whiteKeyWidth = 50;
            const offset = whiteKeyWidth - (whiteKeyWidth / 3);
            key.style.left = `${offset}px`;
            key.style.backgroundColor = '#000';
        }

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

    document.getElementById('piano-container').appendChild(piano);
});
