
document.addEventListener('DOMContentLoaded', () => {
    const colors = [
        { hex: '#FF0000', name: 'Red' },
        { hex: '#00FF00', name: 'Green' },
        { hex: '#0000FF', name: 'Blue' },
        { hex: '#FFFF00', name: 'Yellow' },
        { hex: '#FF00FF', name: 'Pink' },
        { hex: '#800080', name: 'Purple' },
        { hex: '#FFA500', name: 'Orange' },
        { hex: '#A52A2A', name: 'Brown' }
    ];

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(150px, 1fr))';
    grid.style.gap = '20px';
    grid.style.padding = '20px';

    colors.forEach(color => {
        const square = document.createElement('div');
        square.style.background = color.hex;
        square.style.height = '150px';
        square.style.borderRadius = '15px';
        square.style.cursor = 'pointer';
        square.style.display = 'flex';
        square.style.alignItems = 'center';
        square.style.justifyContent = 'center';
        square.style.color = color.hex === '#FFFF00' ? '#000' : '#FFF';
        square.style.fontWeight = 'bold';
        square.style.fontSize = '24px';
        square.style.transition = 'transform 0.3s ease';
        square.textContent = color.name;

        square.addEventListener('click', () => {
            document.body.style.background = color.hex;
            setTimeout(() => document.body.style.background = '', 2000);
            const utterance = new SpeechSynthesisUtterance(color.name);
            window.speechSynthesis.speak(utterance);
        });

        square.addEventListener('mouseover', () => {
            square.style.transform = 'scale(1.1)';
        });

        square.addEventListener('mouseout', () => {
            square.style.transform = 'scale(1)';
        });

        grid.appendChild(square);
    });

    document.getElementById('colors-container').appendChild(grid);
});
