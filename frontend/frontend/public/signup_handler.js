import { setDoc, doc, getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", function() {
    const signUpForm = document.getElementById("signUpForm");
    const signUpMessage = document.getElementById("signUpMessage");

    signUpForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const firstName = document.getElementById("fName").value.trim();
        const lastName = document.getElementById("lName").value.trim();
        const email = document.getElementById("rEmail").value.trim();
        const password = document.getElementById("rPassword").value.trim();
        const role = document.getElementById("rRole").value;
        const level = document.getElementById("rLevel") ? document.getElementById("rLevel").value : "";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            const userData = {
                uid: user.uid,
                firstName,
                lastName,
                email,
                role,
                level,
                createdAt: new Date()
            };

            await setDoc(doc(db, "users", user.uid), userData);
            signUpMessage.textContent = "Account Created Successfully";
            signUpMessage.style.display = "block";

            setTimeout(() => {
                if (role === "Special child") {
                    window.location.href = "test.html"; // Redirect to test page
                } else {
                    window.location.href = "index.html"; // Default redirect
                }
            }, 1500);
        } catch (error) {
            signUpMessage.textContent = "Error: " + error.message;
            signUpMessage.style.display = "block";
        }
    });
});
