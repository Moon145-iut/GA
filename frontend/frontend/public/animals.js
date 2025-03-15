
document.addEventListener('DOMContentLoaded', () => {
    const animals = [
        { name: 'Lion', sound: 'Roar', soundUrl: 'https://www.myinstants.com/media/sounds/lion-roar_1.mp3' },
        { name: 'Dog', sound: 'Woof', soundUrl: 'https://www.myinstants.com/media/sounds/dog-barking-sound-effect.mp3' },
        { name: 'Cat', sound: 'Meow', soundUrl: 'https://www.myinstants.com/media/sounds/cat-meow_1.mp3' },
        { name: 'Elephant', sound: 'Trumpet', soundUrl: 'https://www.myinstants.com/media/sounds/elephant-trumpets-growls.mp3' },
        { name: 'Bird', sound: 'Chirp', soundUrl: 'https://www.myinstants.com/media/sounds/birds-sing.mp3' },
        { name: 'Monkey', sound: 'Ooh ooh', soundUrl: 'https://www.myinstants.com/media/sounds/monkey_5.mp3' },
        { name: 'Cow', sound: 'Moo', soundUrl: 'https://www.myinstants.com/media/sounds/cow-moo-sound.mp3' },
        { name: 'Duck', sound: 'Quack', soundUrl: 'https://www.myinstants.com/media/sounds/duck-quack.mp3' }
    ];

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    grid.style.gap = '20px';
    grid.style.padding = '20px';

    animals.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.style.padding = '20px';
        card.style.background = '#fff';
        card.style.borderRadius = '15px';
        card.style.textAlign = 'center';
        card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        card.style.transition = 'transform 0.3s ease';

        const img = document.createElement('img');
        img.src = `https://source.unsplash.com/200x200/?${animal.name}`;
        img.alt = animal.name;
        img.style.width = '200px';
        img.style.height = '200px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '10px';
        img.style.marginBottom = '10px';

        const name = document.createElement('h3');
        name.textContent = animal.name;
        name.style.cursor = 'pointer';
        name.style.color = '#4169E1';
        name.addEventListener('click', () => {
            name.style.transform = 'scale(0.95)';
            setTimeout(() => name.style.transform = 'scale(1)', 100);
            const utterance = new SpeechSynthesisUtterance(animal.name);
            window.speechSynthesis.speak(utterance);
        });

        const sound = document.createElement('p');
        sound.textContent = animal.sound;
        sound.style.cursor = 'pointer';
        sound.style.color = '#FF6B6B';
        sound.addEventListener('click', () => {
            sound.style.transform = 'scale(0.95)';
            setTimeout(() => sound.style.transform = 'scale(1)', 100);
            const audio = new Audio(animal.soundUrl);
            audio.play().catch(error => {
                // Fallback to speech synthesis if audio fails to play
                const utterance = new SpeechSynthesisUtterance(animal.sound);
                window.speechSynthesis.speak(utterance);
            });
        });

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(sound);
        grid.appendChild(card);
    });

    document.getElementById('animals-container').appendChild(grid);
});
