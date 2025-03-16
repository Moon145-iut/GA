// const { useState } = React;
// const { render } = ReactDOM;

// // All 80 questions of the RAADS-R Test
// const RAADSRQuestions = [
//     "I have difficulty understanding social rules.",
//     "I find it hard to make eye contact.",
//     "I prefer to be alone rather than with others.",
//     "I find it difficult to start a conversation.",
//     "I often feel overwhelmed in social situations.",
//     "I have trouble recognizing when others are joking.",
//     "I find it hard to understand how people feel.",
//     "I dislike changes in routine.",
//     "I enjoy doing things on my own.",
//     "I feel uncomfortable when others touch me.",
//     // Additional 20 MCQs
//     "What is the capital of France?",
//     "Which planet is known as the Red Planet?",
//     "What is the square root of 64?",
//     "Who developed the theory of relativity?",
//     "Which gas do plants absorb from the atmosphere?",
//     "What is the largest organ in the human body?",
//     "What is the chemical symbol for water?",
//     "Who wrote 'Hamlet'?",
//     "What is the speed of light in vacuum?",
//     "Which element has the atomic number 1?",
//     "Which ocean is the largest?",
//     "What is the hardest natural substance on Earth?",
//     "What is the main ingredient in traditional Japanese miso soup?",
//     "Which is the longest river in the world?",
//     "How many continents are there?",
//     "Which is the smallest planet in our solar system?",
//     "Which gas is most abundant in Earth's atmosphere?",
//     "What is the capital of Japan?",
//     "Which instrument is used to measure earthquakes?",
//     "Which language has the most native speakers in the world?"
// ];

// const MCQOptions = {
//     80: ["Paris", "London", "Berlin", "Rome"],
//     81: ["Venus", "Mars", "Jupiter", "Saturn"],
//     82: ["6", "8", "10", "12"],
//     83: ["Newton", "Einstein", "Galileo", "Tesla"],
//     84: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
//     85: ["Heart", "Liver", "Skin", "Brain"],
//     86: ["H2O", "CO2", "O2", "N2"],
//     87: ["Shakespeare", "Hemingway", "Dickens", "Austen"],
//     88: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "500,000 km/s"],
//     89: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
//     90: ["Atlantic", "Indian", "Arctic", "Pacific"],
//     91: ["Gold", "Iron", "Diamond", "Platinum"],
//     92: ["Rice", "Soybeans", "Tofu", "Fish"],
//     93: ["Amazon", "Nile", "Yangtze", "Mississippi"],
//     94: ["5", "6", "7", "8"],
//     95: ["Mercury", "Venus", "Mars", "Pluto"],
//     96: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
//     97: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
//     98: ["Seismometer", "Barometer", "Thermometer", "Hygrometer"],
//     99: ["English", "Spanish", "Mandarin", "Hindi"]
// };


// const RAADSRApp = () => {
//     const [username, setUsername] = useState('');
//     const [answers, setAnswers] = useState(Array(80).fill(null)); // Initialize with null
//     const [currentPage, setCurrentPage] = useState(1); // To keep track of the current page
//     const totalPages = Math.ceil(RAADSRQuestions.length / 40); // Dynamically set pages
//     const [showScore, setShowScore] = useState(false);
//     const [testStarted, setTestStarted] = useState(false);

//     const handleUsernameChange = (e) => {
//         setUsername(e.target.value);
//     };

//     const startTest = () => {
//         if (username.trim() === "") {
//             alert("Please enter your username.");
//             return;
//         }
//         setTestStarted(true);
//     };

//     const handleAnswerChange = (index, e) => {
//         const newAnswers = [...answers];
//         newAnswers[index] = e.target.value;
//         setAnswers(newAnswers);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         } else {
//             setShowScore(true);
//             // Add timeout to show score before redirecting
//             setTimeout(() => {
//                 window.location.href = "index.html";
//             }, 3000); // 3 seconds delay to show the score
//         }
//     };

//     const calculateScore = () => {
//         return answers.reduce((total, answer) => total + (answer === 'yes' ? 2 : answer === 'sometimes' ? 1 : 0), 0);
//     };

//     return (
//         <div className="container">
//             <h1>RAADS-R Autism Test</h1>
//             {!testStarted ? (
//                 <div>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={handleUsernameChange}
//                         placeholder="Enter your username"
//                     />
//                     <button onClick={startTest}>Start Test</button>
//                 </div>
//             ) : (
//                 <div>
//                     {RAADSRQuestions.slice((currentPage - 1) * 40, currentPage * 40).map((question, questionIndex) => (
//                         <div className="question-container" key={questionIndex}>
//                             <p>{(currentPage - 1) * 40 + questionIndex + 1}. {question}</p>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     value="yes"
//                                     checked={answers[questionIndex] === 'yes'}
//                                     onChange={(e) => handleAnswerChange(questionIndex, e)}
//                                 />
//                                 Yes
//                             </label>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     value="sometimes"
//                                     checked={answers[questionIndex] === 'sometimes'}
//                                     onChange={(e) => handleAnswerChange(questionIndex, e)}
//                                 />
//                                 Sometimes
//                             </label>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     value="no"
//                                     checked={answers[questionIndex] === 'no'}
//                                     onChange={(e) => handleAnswerChange(questionIndex, e)}
//                                 />
//                                 No
//                             </label>
//                         </div>
//                     ))}
//                     <button className="next" onClick={handleNextPage}>
//                         {currentPage === totalPages ? 'Submit Test' : 'Next'}
//                     </button>
//                 </div>
//             )}
//             {showScore && (
//                 <div className="score">
//                     <h2>Your Score: {calculateScore()}</h2>
//                 </div>
//             )}
//         </div>
//     );
// };

// render(
//     React.createElement(RAADSRApp),
//     document.getElementById("root")
// );
const { useState } = React;
const { render } = ReactDOM;

// All 80 questions of the RAADS-R Test
const RAADSRQuestions = [
    "I have difficulty understanding social rules.",
    "I find it hard to make eye contact.",
    "I prefer to be alone rather than with others.",
    "I find it difficult to start a conversation.",
    "I often feel overwhelmed in social situations.",
    "I have trouble recognizing when others are joking.",
    "I find it hard to understand how people feel.",
    "I dislike changes in routine.",
    "I enjoy doing things on my own.",
    "I feel uncomfortable when others touch me.",
    // Additional 20 MCQs
    "What is the capital of France?",
    "Which planet is known as the Red Planet?",
    "What is the square root of 64?",
    "Who developed the theory of relativity?",
    "Which gas do plants absorb from the atmosphere?",
    "What is the largest organ in the human body?",
    "What is the chemical symbol for water?",
    "Who wrote 'Hamlet'?",
    "What is the speed of light in vacuum?",
    "Which element has the atomic number 1?",
    "Which ocean is the largest?",
    "What is the hardest natural substance on Earth?",
    "What is the main ingredient in traditional Japanese miso soup?",
    "Which is the longest river in the world?",
    "How many continents are there?",
    "Which is the smallest planet in our solar system?",
    "Which gas is most abundant in Earth's atmosphere?",
    "What is the capital of Japan?",
    "Which instrument is used to measure earthquakes?",
    "Which language has the most native speakers in the world?"
];

const MCQOptions = {
    80: ["Paris", "London", "Berlin", "Rome"],
    81: ["Venus", "Mars", "Jupiter", "Saturn"],
    82: ["6", "8", "10", "12"],
    83: ["Newton", "Einstein", "Galileo", "Tesla"],
    84: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    85: ["Heart", "Liver", "Skin", "Brain"],
    86: ["H2O", "CO2", "O2", "N2"],
    87: ["Shakespeare", "Hemingway", "Dickens", "Austen"],
    88: ["300,000 km/s", "150,000 km/s", "400,000 km/s", "500,000 km/s"],
    89: ["Oxygen", "Hydrogen", "Helium", "Carbon"],
    90: ["Atlantic", "Indian", "Arctic", "Pacific"],
    91: ["Gold", "Iron", "Diamond", "Platinum"],
    92: ["Rice", "Soybeans", "Tofu", "Fish"],
    93: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    94: ["5", "6", "7", "8"],
    95: ["Mercury", "Venus", "Mars", "Pluto"],
    96: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    97: ["Beijing", "Tokyo", "Seoul", "Bangkok"],
    98: ["Seismometer", "Barometer", "Thermometer", "Hygrometer"],
    99: ["English", "Spanish", "Mandarin", "Hindi"]
};

const RAADSRApp = () => {
    const [username, setUsername] = useState('');
    const [answers, setAnswers] = useState(Array(80).fill(null)); // Initialize with null
    const [currentPage, setCurrentPage] = useState(1); // To keep track of the current page
    const totalPages = Math.ceil(RAADSRQuestions.length / 40); // Dynamically set pages
    const [showScore, setShowScore] = useState(false);
    const [testStarted, setTestStarted] = useState(false);
    const [score, setScore] = useState(0); // To store the test score
    const [scoreMessage, setScoreMessage] = useState(""); // To store the interpretation message

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const startTest = () => {
        if (username.trim() === "") {
            alert("Please enter your username.");
            return;
        }
        setTestStarted(true);
    };

    const handleAnswerChange = (index, e) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            const testScore = calculateScore();
            setScore(testScore);  // Store the calculated score
            setScoreMessage(getScoreMessage(testScore));  // Get the interpretation message
            setShowScore(true);

            // Render the score interpretation and chart after 5 seconds
            setTimeout(() => {
                const ctx = document.getElementById('scoreChart').getContext('2d');
                const scoreChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Score'],
                        datasets: [{
                            label: 'RAADS-R Score',
                            data: [score],
                            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                            borderColor: ['rgba(54, 162, 235, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }, 500);

            // Redirect after 5 seconds
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to index.html
            }, 5000);
        }
    };

    const calculateScore = () => {
        return answers.reduce((total, answer) => total + (answer === 'yes' ? 2 : answer === 'sometimes' ? 1 : 0), 0);
    };

    const getScoreMessage = (score) => {
        if (score < 25) return "You are not autistic.";
        if (score >= 25 && score < 50) return "Some autistic traits, but likely not autistic.";
        if (score >= 50 && score < 65) return "Some autistic traits, but likely not autistic (yet some autistic people score as low as 44).";
        if (score >= 65 && score < 90) return "The minimum score at which autism is considered.";
        if (score >= 90 && score < 130) return "Stronger indications of autism, although non-autistics may score as high.";
        if (score >= 130 && score < 160) return "The mean score of autistic people; strong evidence for autism.";
        if (score >= 160 && score < 227) return "Very strong evidence for autism.";
        if (score >= 227 && score < 240) return "The maximum score autistic people acquired in Ritvo’s seminal paper on the RAADS-R.";
        return "The maximum possible RAADS-R score.";
    };

    return (
        <div className="container">
            <h1>RAADS-R Autism Test</h1>
            {!testStarted ? (
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter your username"
                    />
                    <button onClick={startTest}>Start Test</button>
                </div>
            ) : (
                <div>
                    {RAADSRQuestions.slice((currentPage - 1) * 40, currentPage * 40).map((question, questionIndex) => (
                        <div className="question-container" key={questionIndex}>
                            <p>{(currentPage - 1) * 40 + questionIndex + 1}. {question}</p>
                            <label>
                                <input
                                    type="radio"
                                    value="yes"
                                    checked={answers[questionIndex] === 'yes'}
                                    onChange={(e) => handleAnswerChange(questionIndex, e)}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="sometimes"
                                    checked={answers[questionIndex] === 'sometimes'}
                                    onChange={(e) => handleAnswerChange(questionIndex, e)}
                                />
                                Sometimes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="no"
                                    checked={answers[questionIndex] === 'no'}
                                    onChange={(e) => handleAnswerChange(questionIndex, e)}
                                />
                                No
                            </label>
                        </div>
                    ))}
                    <button className="next" onClick={handleNextPage}>
                        {currentPage === totalPages ? 'Submit Test' : 'Next'}
                    </button>
                </div>
            )}
            {showScore && (
                
                <div className="score">
                    <h2>Your Score: {score}</h2>
                    <canvas id="scoreChart" width="400" height="400"></canvas>
                    <div id="scoreInterpretation" style={{ display: 'block' }}>
                    <div id="scoreInterpretation" style={{ display: 'none' }}>
                        <h3>RAADS-R Score Interpretation</h3>
                        <p><strong>25</strong> - You are not autistic.</p>
                        <p><strong>50</strong> - Some autistic traits, but likely not autistic.</p>
                        <p><strong>65</strong> - The minimum score at which autism is considered.</p>
                        <p><strong>90</strong> - Stronger indications of autism.</p>
                        <p><strong>130</strong> - The mean score of autistic people; strong evidence for autism.</p>
                        <p><strong>160</strong> - Very strong evidence for autism.</p>
                        <p><strong>227</strong> - The maximum score autistic people acquired in Ritvo’s seminal paper on the RAADS-R.</p>
                        <p><strong>240</strong> - The maximum possible RAADS-R score.</p>
                    </div>
                        <h3>RAADS-R Score Interpretation</h3>
                        <p>{scoreMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

render(
    React.createElement(RAADSRApp),
    document.getElementById("root")
);
