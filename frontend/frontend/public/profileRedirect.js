// import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
// import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// document.addEventListener('DOMContentLoaded', () => {
//     const profilePic = document.getElementById('profilePic');
//     const auth = getAuth();
//     const db = getFirestore();
    
//     // Add click event to profile picture for redirection
//     if (profilePic) {
//         profilePic.addEventListener('click', async () => {
//             // First try to get role from localStorage for better performance
//             const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//             let userRole = userData.role || profilePic.dataset.role;
            
//             // If role not found in localStorage, try to get from Firebase (as fallback)
//             if (!userRole && auth.currentUser) {
//                 try {
//                     const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
//                     if (userDoc.exists()) {
//                         userRole = userDoc.data().role;
//                     }
//                 } catch (error) {
//                     console.error("Error fetching user role:", error);
//                 }
//             }
            
//             if (userRole) {
//                 // Normalize role name to match the dashboard file naming convention
//                 const normalizedRole = userRole.toLowerCase().replace(' ', '_');
                
//                 // Determine dashboard URL based on role
//                 let dashboardURL;
                
//                 // Handle special child role
//                 if (userRole.toLowerCase() === "special child" || normalizedRole === "special_child") {
//                     dashboardURL = "special_child_dashboard.html";
//                 } else {
//                     dashboardURL = `${normalizedRole}_dashboard.html`;
//                 }
                
//                 console.log(`Redirecting to ${dashboardURL} for role: ${userRole}`);
//                 window.location.href = dashboardURL;
//             } else {
//                 console.error("User role not found");
//                 alert("Could not determine your role. Please try logging in again.");
//             }
//         });
//     }
// });
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profilePic');
    const auth = getAuth();
    const db = getFirestore();
    
    // Add click event to profile picture for redirection
    if (profilePic) {
        profilePic.addEventListener('click', async () => {
            // First try to get role from localStorage for better performance
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            let userRole = userData.role || profilePic.dataset.role;
            
            // If role not found in localStorage, try to get from Firebase (as fallback)
            if (!userRole && auth.currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                    if (userDoc.exists()) {
                        userRole = userDoc.data().role;
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
            
            if (userRole) {
                // Normalize role name to match the dashboard file naming convention
                const normalizedRole = userRole.toLowerCase().replace(' ', '_');
                
                // Determine dashboard URL based on role
                let dashboardURL;
                
                // Handle special child role
                if (userRole.toLowerCase() === "special child" || normalizedRole === "special_child") {
                    dashboardURL = "special_child_dashboard.html";
                } else {
                    dashboardURL = `${normalizedRole}_dashboard.html`;
                }
                
                console.log(`Redirecting to ${dashboardURL} for role: ${userRole}`);
                window.location.href = dashboardURL;
            } else {
                console.error("User role not found");
                alert("Could not determine your role. Please try logging in again.");
            }
        });
    }
});
