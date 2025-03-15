
document.addEventListener('DOMContentLoaded', () => {
    const occupations = [
        { title: 'Doctor', description: 'Helps sick people get better' },
        { title: 'Teacher', description: 'Helps students learn' },
        { title: 'Firefighter', description: 'Puts out fires and saves people' },
        { title: 'Chef', description: 'Cooks delicious food' },
        { title: 'Artist', description: 'Creates beautiful artwork' },
        { title: 'Police Officer', description: 'Keeps people safe' },
        { title: 'Farmer', description: 'Grows food for people' },
        { title: 'Pilot', description: 'Flies airplanes' }
    ];

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    grid.style.gap = '20px';
    grid.style.padding = '20px';

    occupations.forEach(job => {
        const card = document.createElement('div');
        card.className = 'occupation-card';
        card.innerHTML = `
            <img src="https://source.unsplash.com/200x200/?${job.title}" alt="${job.title}">
            <h3>${job.title}</h3>
            <p>${job.description}</p>
        `;
        card.style.padding = '20px';
        card.style.background = '#fff';
        card.style.borderRadius = '15px';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'center';
        card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        card.style.transition = 'transform 0.3s ease';

        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = 'scale(1)', 100);
            const utterance = new SpeechSynthesisUtterance(`A ${job.title} ${job.description}`);
            window.speechSynthesis.speak(utterance);
        });

        grid.appendChild(card);
    });

    document.getElementById('occupations-container').appendChild(grid);
});
