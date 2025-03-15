
document.addEventListener('DOMContentLoaded', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const words = {
        'A': 'Apple', 'B': 'Ball', 'C': 'Cat', 'D': 'Dog', 'E': 'Elephant',
        'F': 'Fish', 'G': 'Giraffe', 'H': 'House', 'I': 'Ice cream', 'J': 'Juice',
        'K': 'Kite', 'L': 'Lion', 'M': 'Moon', 'N': 'Nest', 'O': 'Orange',
        'P': 'Penguin', 'Q': 'Queen', 'R': 'Rainbow', 'S': 'Sun', 'T': 'Tree',
        'U': 'Umbrella', 'V': 'Violin', 'W': 'Water', 'X': 'X-ray', 'Y': 'Yacht',
        'Z': 'Zebra'
    };

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap = '15px';
    grid.style.padding = '20px';

    alphabet.forEach(letter => {
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.innerHTML = `
            <h2>${letter}</h2>
            <div class="word-container">
                <img src="https://source.unsplash.com/200x200/?${words[letter]}" alt="${words[letter]}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin: 10px 0;">
                <p style="font-size: 1.2em; margin: 5px 0;">${words[letter]}</p>
            </div>
        `;
        tile.style.padding = '20px';
        tile.style.background = '#fff';
        tile.style.borderRadius = '15px';
        tile.style.cursor = 'pointer';
        tile.style.textAlign = 'center';
        tile.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        tile.style.transition = 'transform 0.3s ease';

        // Letter click event
        tile.querySelector('h2').addEventListener('click', () => {
            tile.style.transform = 'scale(0.95)';
            setTimeout(() => tile.style.transform = 'scale(1)', 100);
            const utterance = new SpeechSynthesisUtterance(`${letter} for ${words[letter]}`);
            window.speechSynthesis.speak(utterance);
        });

        // Word and image click event
        tile.querySelector('.word-container').addEventListener('click', () => {
            tile.style.transform = 'scale(0.95)';
            setTimeout(() => tile.style.transform = 'scale(1)', 100);
            const utterance = new SpeechSynthesisUtterance(words[letter]);
            window.speechSynthesis.speak(utterance);
        });

        grid.appendChild(tile);
    });

    document.getElementById('alphabet-container').appendChild(grid);
});
