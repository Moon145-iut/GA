import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const db = getFirestore();
    const noticeList = document.getElementById("noticeList");

    // Fetch notices from Firestore
    async function loadNotices() {
        try {
            const noticesRef = collection(db, "notices");
            const noticesSnapshot = await getDocs(noticesRef);

            // Clear existing notices
            noticeList.innerHTML = "";

            if (!noticesSnapshot.empty) {
                noticesSnapshot.forEach((doc) => {
                    
                    const notice = doc.data();
                    const noticeBox = document.createElement("div");
                    noticeBox.classList.add("notice-box"); // Add the notice-box class

                    noticeBox.innerHTML = `
                        <h3>${notice.title}</h3>
                        <p>${notice.details}</p>
                        <p><small>Posted on: ${new Date(
                         notice.timestamp.seconds * 1000
                        ).toLocaleDateString()}</small></p>
                    `;
                    noticeList.appendChild(noticeBox);
                });
            } else {
                noticeList.innerHTML = "<p>No notices available at the moment.</p>";
            }
        } catch (error) {
            console.error("Error fetching notices:", error);
            noticeList.innerHTML = "<p>Failed to load notices.</p>";
        }
    }

    // Load notices on page load
    await loadNotices();
});


