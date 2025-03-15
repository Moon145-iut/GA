// import firebase from 'firebase/app';
// import 'firebase/firestore';
// function showLevels(subject) {
//     const levels = ['Primary', 'Intermediate', 'Advanced'];
//     const levelsContainer = document.getElementById('levelsContainer');
    
//     // Clear previous content and display levels for the selected subject
//     levelsContainer.innerHTML = `<h3>Select Level for ${subject}</h3>`;
//     levels.forEach(level => {
//         const levelDiv = document.createElement('div');
//         levelDiv.classList.add('level-option');
        
//         // Add tutorial, resource, and quiz buttons for each level
//         levelDiv.innerHTML = `
//             <h4>${level} Level</h4>
//             <button onclick="showTutorial('${subject}', '${level}')">Tutorial</button>
//             <button onclick="showResources('${subject}', '${level}')">Resources</button>
//             <button onclick="startQuiz('${subject}', '${level}')">Take Quiz</button>
//         `;
//         levelsContainer.appendChild(levelDiv);
//     });
// }

// function showTutorial(subject, level) {
//     const contentContainer = document.getElementById('contentContainer');
//     contentContainer.innerHTML = `
//         <div class="video-placeholder">
//             <h4>${subject} - ${level} Level: Tutorial Video</h4>
//             <p>Watch this tutorial video to understand the concepts better.</p>
//             <video controls>
//                 <source src="path_to_tutorial_video.mp4" type="video/mp4">
//                 Your browser does not support the video tag.
//             </video>
//         </div>
//     `;
// }

// function showResources(subject, level) {
//     const contentContainer = document.getElementById('contentContainer');
//     contentContainer.innerHTML = `
//         <div class="resource-list">
//             <h4>${subject} - ${level} Level: Resources</h4>
//             <ul>
//                 <li><a href="#">Download PDF Resources for ${subject} - ${level}</a></li>
//                 <li><a href="#">Download Additional Resources for ${subject} - ${level}</a></li>
//             </ul>
//         </div>
//     `;
// }

// // function startQuiz(subject, level) {
// //     const quizSection = document.getElementById('quizSection');
// //     const quizTitle = document.getElementById('quizTitle');
// //     const quizContent = document.getElementById('quizContent');
    
// //     // For demonstration, using hardcoded quiz questions
// //     const quizQuestions = [
// //         { question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: 1 },
// //         { question: 'What is 3 + 5?', options: ['7', '8', '9'], correct: 1 }
// //     ];

// //     quizTitle.innerHTML = `Quiz for ${subject} - ${level} Level`;
// //     quizContent.innerHTML = '';

// //     quizQuestions.forEach((q, index) => {
// //         const questionElement = document.createElement('div');
// //         questionElement.classList.add('question');
// //         questionElement.innerHTML = `
// //             <p>${q.question}</p>
// //             ${q.options.map((option, i) => `<input type="radio" name="q${index}" value="${i}"> ${option}<br>`).join('')}
// //         `;
// //         quizContent.appendChild(questionElement);
// //     });

// //     quizSection.style.display = 'block';
// // }
// // function startQuiz(subject, level) {
// //     const db = firebase.firestore(); // Initialize Firestore
// //     const quizSection = document.getElementById('quizSection');
// //     const quizTitle = document.getElementById('quizTitle');
// //     const quizContent = document.getElementById('quizContent');

// //     quizTitle.innerHTML = `Quiz for ${subject} - ${level} Level`;
// //     quizContent.innerHTML = `<p>Loading quiz questions...</p>`; // Temporary loading message

// //     // Fetch questions from Firestore
// //     db.collection('quizzes')
// //         .doc(subject)
// //         .collection(level)
// //         .doc('questions')
// //         .get()
// //         .then((doc) => {
// //             if (doc.exists) {
// //                 const questions = doc.data();
// //                 const questionKeys = Object.keys(questions);

// //                 quizContent.innerHTML = ''; // Clear loading message
// //                 questionKeys.forEach((key, index) => {
// //                     const q = questions[key];
// //                     const questionElement = document.createElement('div');
// //                     questionElement.classList.add('question');
// //                     questionElement.innerHTML = `
// //                         <p>${index + 1}. ${q.text}</p>
// //                         ${q.options.map((option, i) => `
// //                             <input type="radio" name="q${index}" value="${i}">
// //                             ${option}<br>
// //                         `).join('')}
// //                     `;
// //                     quizContent.appendChild(questionElement);
// //                 });

// //                 // Add submit button
// //                 const submitButton = document.createElement('button');
// //                 submitButton.textContent = 'Submit Quiz';
// //                 submitButton.onclick = submitQuiz;
// //                 quizContent.appendChild(submitButton);
// //             } else {
// //                 quizContent.innerHTML = `<p>No quiz questions available for ${subject} - ${level} Level.</p>`;
// //             }
// //         })
// //         .catch((error) => {
// //             console.error('Error fetching quiz questions:', error);
// //             quizContent.innerHTML = `<p>Error loading quiz. Please try again later.</p>`;
// //         });

// //     quizSection.style.display = 'block';
// // }

// // // function submitQuiz() {
// // //     alert('Quiz Submitted!');
// // //     document.getElementById('quizSection').style.display = 'none';
// // // }

// // function submitQuiz() {
// //     const selectedAnswers = [];
// //     const questions = document.querySelectorAll('.question');
// //     questions.forEach((question, index) => {
// //         const selectedOption = question.querySelector(`input[name="q${index}"]:checked`);
// //         if (selectedOption) selectedAnswers.push(parseInt(selectedOption.value));
// //     });

// //     // Validate answers here (you can fetch the correct answers from Firestore and compare)
// //     alert('Quiz Submitted!');
// //     document.getElementById('quizSection').style.display = 'none';
// // }


// document.getElementById('mathTile').addEventListener('click', () => showLevels('Math'));
// document.getElementById('scienceTile').addEventListener('click', () => showLevels('Science'));
// document.getElementById('artTile').addEventListener('click', () => showLevels('Art'));
// document.getElementById('musicTile').addEventListener('click', () => showLevels('Music'));




function showLevels(subject) {
    const levels = ['Primary', 'Intermediate', 'Advanced'];
    const levelsContainer = document.getElementById('levelsContainer');
    
    // Clear previous content and display levels for the selected subject
    levelsContainer.innerHTML = `<h3>Select Level for ${subject}</h3>`;
    levels.forEach(level => {
        const levelDiv = document.createElement('div');
        levelDiv.classList.add('level-option');
        
        // Add tutorial, resource, and quiz buttons for each level
        levelDiv.innerHTML = `
            <h4>${level} Level</h4>
            <button onclick="showTutorial('${subject}', '${level}')">Tutorial</button>
            <button onclick="showResources('${subject}', '${level}')">Resources</button>
            <button onclick="startQuiz('${subject}', '${level}')">Take Quiz</button>
        `;
        levelsContainer.appendChild(levelDiv);
    });
}

function showTutorial(subject, level) {
    const contentContainer = document.getElementById('contentContainer');
    const tutorials = [
        "video.mp4", // Example relative path to video file
        "video.mp4",
        "video.mp4"
    ];

    contentContainer.innerHTML = `
        <div class="video-placeholder">
            <h4>${subject} - ${level} Level: Tutorial Video</h4>
            <p>Watch this tutorial video to understand the concepts better.</p>
            <video controls>
                <source src="${tutorials[currentTutorialIndex]}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <br>
            <button id="nextTutorialButton" onclick="nextTutorial('${subject}', '${level}')">Next Video</button>
        </div>
    `;
}
let currentTutorialIndex = 0;

function nextTutorial(subject, level) {
    const tutorials = [
        "video.mp4",
        "video.mp4",
        "video.mp4"
    ];
    
    currentTutorialIndex = (currentTutorialIndex + 1) % tutorials.length; // Loop back to the first video if at the end
    showTutorial(subject, level);
}

function showResources(subject, level) {
    const contentContainer = document.getElementById('contentContainer');
    
    // Array of PDF resources (replace these paths with actual PDF URLs)
    const resources = [
        "a.pdf",
        "b.pdf",
        "a2.pdf"
    ];

    // Display the resources list
    contentContainer.innerHTML = `
        <div class="resource-list">
            <h4>${subject} - ${level} Level: Resources</h4>
            <ul>
                <li><a href="${resources[currentResourceIndex]}" target="_blank">Download PDF Resource ${currentResourceIndex + 1} for ${subject} - ${level}</a></li>
            </ul>
            <br>
            <button id="nextResourceButton" onclick="nextResource('${subject}', '${level}')">Next Resource</button>
        </div>
    `;
}

// Function to go to the next resource
function nextResource(subject, level) {
    const resources = [
        "a.pdf",
        "b.pdf",
        "a2.pdf"
    ];
    currentResourceIndex = (currentResourceIndex + 1) % resources.length; // Loop back to the first resource if at the end
    showResources(subject, level); // Reload the resources section with the next resource
}

function showResources(subject, level) {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = `
        <div class="resource-list">
            <h4>${subject} - ${level} Level: Resources</h4>
            <ul>
                <li><a href="a.pdf" target="_blank">Download PDF 1 for ${subject} - ${level}</a></li>
                <li><a href="b.pdf" target="_blank">Download PDF 2 for ${subject} - ${level}</a></li>
                <li><a href="a2.pdf" target="_blank">Download PDF 3 for ${subject} - ${level}</a></li>
            </ul>
        </div>
    `;
}

function submitQuiz() {
    alert('Quiz Submitted!');
    document.getElementById('quizSection').style.display = 'none';
}

function startQuiz(subject, level) {
    // Redirect to the quiz page with query parameters
    const quizPageUrl = `quiz.html?subject=${encodeURIComponent(subject)}&level=${encodeURIComponent(level)}`;
    window.location.href = quizPageUrl;
}


document.getElementById('mathTile').addEventListener('click', () => showLevels('Math'));
document.getElementById('scienceTile').addEventListener('click', () => showLevels('Science'));
document.getElementById('artTile').addEventListener('click', () => showLevels('Art'));
document.getElementById('musicTile').addEventListener('click', () => showLevels('Music'));
