import { getAuth, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const auth = getAuth();
    const db = getFirestore();

    // Add Profile elements
    const profileSection = document.getElementById("profileSection");
    const profileContainer = document.getElementById("profileContainer");
    const profileForm = document.getElementById("profileForm");
    const headerProfilePic = document.getElementById("headerProfilePic");
    const profilePic = document.getElementById("profilePic");

    // Sidebar elements
    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");
    const logoutLink = document.getElementById("logoutLink");

    // Details button and user list
    const detailsButton = document.getElementById("detailsButton");
    const userDetails = document.getElementById("userDetails");
    const userList = document.getElementById("userList");

    // Post Notice elements
    const postNoticeButton = document.getElementById("postNoticeButton");
    const postNoticeForm = document.createElement("div");
    const noticeTitleInput = document.createElement("input");
    const noticeDetailsInput = document.createElement("textarea");
    const noticeSubmitButton = document.createElement("button");

    // Initialize Notice Form
    function initNoticeForm() {
        postNoticeForm.id = "postNoticeForm";
        postNoticeForm.style.display = "none";

        noticeTitleInput.id = "noticeTitle";
        noticeTitleInput.placeholder = "Enter Notice Title";

        noticeDetailsInput.id = "noticeDetails";
        noticeDetailsInput.placeholder = "Enter Notice Details";

        noticeSubmitButton.id = "submitNotice";
        noticeSubmitButton.textContent = "Post Notice";

        postNoticeForm.appendChild(noticeTitleInput);
        postNoticeForm.appendChild(noticeDetailsInput);
        postNoticeForm.appendChild(noticeSubmitButton);
        document.body.appendChild(postNoticeForm);
    }

    initNoticeForm();

    // Open Sidebar
    menuButton.addEventListener("click", () => {
        sidebar.style.width = "250px";
    });

    // Close Sidebar
    closeButton.addEventListener("click", () => {
        sidebar.style.width = "0";
    });

    // Logout functionality
    logoutLink.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    });

    // Load initial 3 users and toggle user details section
    detailsButton.addEventListener("click", async () => {
        if (userDetails.style.display === "none") {
            userDetails.style.display = "block";
            await loadUsers();
        } else {
            userDetails.style.display = "none";
        }
    });

    async function loadUsers() {
        try {
            const usersRef = collection(db, "users");
            const usersSnapshot = await getDocs(usersRef);
            const users = usersSnapshot.docs.slice(0, 3); // Limit to 3 users

            userList.innerHTML = ""; // Clear existing content
            users.forEach((doc) => {
                const user = doc.data();
                const listItem = document.createElement("li");
                listItem.textContent = `${user.name} (${user.email})`;
                userList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error loading users:", error);
        }
    }

    // Show/Hide Notice Form
    postNoticeButton.addEventListener("click", () => {
        postNoticeForm.style.display =
            postNoticeForm.style.display === "none" ? "block" : "none";
    });

    // Handle Notice Form Submission
    noticeSubmitButton.addEventListener("click", async () => {
        const title = noticeTitleInput.value.trim();
        const details = noticeDetailsInput.value.trim();

        if (title && details) {
            try {
                // Add notice to Firestore
                await addDoc(collection(db, "notices"), {
                    title,
                    details,
                    timestamp: new Date(),
                });

                alert("Notice posted successfully!");
                updateIndexNotices(title, details); // Update the index.html notices
                noticeTitleInput.value = "";
                noticeDetailsInput.value = "";
                postNoticeForm.style.display = "none";
            } catch (error) {
                console.error("Error posting notice:", error);
            }
        } else {
            alert("Please fill out both fields before submitting.");
        }
    });

    // Update Notices Section on index.html
    function updateIndexNotices(title, details) {
        const noticesSection = document.getElementById("news-column");
        const newNotice = document.createElement("li");
        newNotice.textContent = `${title}: ${details}`;
        noticesSection.appendChild(newNotice);
    }

    // Load Profile Data
    async function loadProfileData() {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            
            // Update header profile
            if (headerProfilePic) {
                headerProfilePic.src = userProfile.photoURL || '/default-profile.png';
            }
            if (headerProfileName) {
                headerProfileName.textContent = userProfile.displayName || 'User';
            }
            
            // Update profile form
            if (profilePic) {
                profilePic.src = userProfile.photoURL || '/default-profile.png';
            }
            
            const aboutInput = document.getElementById('about');
            if (aboutInput) {
                aboutInput.value = userProfile.about || '';
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    }

    // Show/Hide Profile Section
    profileSection.addEventListener('click', () => {
        profileContainer.style.display = 'block';
        userDetails.style.display = 'none';
        postNoticeForm.style.display = 'none';
    });

    // Handle Profile Update
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in first');
            return;
        }

        try {
            const profileImage = document.getElementById('profileImage').files[0];
            const about = document.getElementById('about').value;

            let photoURL = user.photoURL;
            if (profileImage) {
                const formData = new FormData();
                formData.append('file', profileImage);
                formData.append('upload_preset', 'my_upload_preset');

                const response = await fetch('https://api.cloudinary.com/v1_1/dra4ykviv/image/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error('Upload failed');
                const data = await response.json();
                photoURL = data.secure_url;
                
                // Store in localStorage for persistence
                localStorage.setItem('userProfilePic', photoURL);
            }

            // Update Firestore
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                photoURL,
                about
            });

            // Update UI across all elements
            headerProfilePic.src = photoURL;
            profilePic.src = photoURL;
            document.getElementById("profilePage").src = photoURL;

            // Update auth profile
            await updateProfile(user, {
                photoURL: photoURL
            });

            alert('Profile updated successfully!');
            
            // Reload profile data to ensure everything is in sync
            await loadProfileData();
            
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    });

    // Cloudinary Upload Function
    async function uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my_upload_preset');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dra4ykviv/image/upload', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error('Cloudinary Upload Error:', error);
            throw error;
        }
    }

    // Load profile data when page loads
    loadProfileData();
});
