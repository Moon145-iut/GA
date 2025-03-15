// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
// //import { v2 as cloudinary } from 'cloudinary';

// const auth = getAuth();

// document.getElementById("videoUploadForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const videoTitle = document.getElementById("videoTitle").value;
//     const videoFile = document.getElementById("videoFile").files[0];
//     const videoCategory = document.getElementById("videoCategory").value;
//     const statusMessage = document.getElementById("statusMessage");

//     if (!videoFile) {
//         statusMessage.textContent = "Please select a video file.";
//         return;
//     }

//     // Check if user is authenticated
//     onAuthStateChanged(auth, async (user) => {
//         if (user) {
//             // User is authenticated, proceed with video upload
//             statusMessage.textContent = "Uploading video...";

//             try {
//                 // Create a FormData object to upload the video
//                 const formData = new FormData();
//                 formData.append('file', videoFile);
//                 formData.append('upload_preset', 'my_upload_preset'); // Replace with your actual Cloudinary upload preset name
             
// const formDataThumb = new FormData();
// formDataThumb.append("file", thumbnailFile);
// formDataThumb.append("upload_preset", "my_upload_preset"); // or whatever your preset is

// const response = await fetch('https://api.cloudinary.com/v1_1/dra4ykviv/video/upload', {
//     method: 'POST',
//     body: formData,
//   });
//   if (!response.ok) {
//     throw new Error('Failed to upload video.');
//   }

// const dataThumb = await responseThumb.json();
// const thumbnailUrl = dataThumb.secure_url;


//                 // Upload video using fetch API
//                 const response = await fetch(`https://api.cloudinary.com/v1_1/dra4ykviv/video/upload`, {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to upload video.");
//                 }

//                 const data = await response.json();
//                 console.log("Upload result:", data);
//                 console.log(`Cloudinary link: ${data.secure_url}`); // Add Cloudinary link to console log

//                 // Display success message
//                 statusMessage.textContent = `Video uploaded successfully! Public URL: ${data.secure_url}`;

//                 // Optimize delivery by resizing and applying auto-format and auto-quality
//                 const optimizeUrl = data.secure_url;

//                 console.log("Optimized URL:", optimizeUrl);

//                 // Store video metadata in localStorage
//                 const videoMetadata = {
//                     id: data.public_id,
//                     title: videoTitle,
//                     videoUrl: optimizeUrl,
//                     thumbnailUrl: data.secure_url.replace('.mp4', '.jpg'), // Assuming thumbnail URL
//                     uploadedAt: new Date().toISOString(),
//                     category: videoCategory, // Add category to metadata
//                     userId: user.uid // Add user ID to metadata
//                 };

//                 let uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos')) || [];
//                 uploadedVideos.push(videoMetadata);
//                 localStorage.setItem('uploadedVideos', JSON.stringify(uploadedVideos));

//                 // Send video metadata to backend to store in MongoDB
//                 await fetch('http://localhost:3000/uploadVideo', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(videoMetadata)
//                 });

//                 // Update video preview
//                 const videoSource = document.getElementById("videoSource");
//                 videoSource.src = optimizeUrl;
//                 document.getElementById("uploadedVideo").load();

//             } catch (error) {
//                 console.error("Error uploading video:", error);
//                 statusMessage.textContent = "An error occurred while uploading the video.";
//             }
//         } else {
//             // User is not authenticated, show error message
//             statusMessage.textContent = "You must be logged in to upload a video.";
//         }
//     });
// });
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';

const auth = getAuth();

document.getElementById('videoUploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const videoTitle = document.getElementById('videoTitle').value;
  const videoFile = document.getElementById('videoFile').files[0];
  const statusMessage = document.getElementById('statusMessage');

  if (!videoFile) {
    statusMessage.textContent = 'Please select a video file.';
    return;
  }

  // Check if user is authenticated
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is authenticated, proceed with video upload
      statusMessage.textContent = 'Uploading video...';

      try {
        // Create a FormData object to upload the video
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('upload_preset', 'my_upload_preset'); // Your Cloudinary upload preset

        // Upload video using fetch API
        const response = await fetch('https://api.cloudinary.com/v1_1/dra4ykviv/video/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload video.');
        }

        const data = await response.json();
        console.log('Upload result:', data);
        console.log(`Cloudinary link: ${data.secure_url}`); // Cloudinary URL of the uploaded video

        // Display success message
        statusMessage.textContent = `Video uploaded successfully! Public URL: ${data.secure_url}`;

        // Store video metadata in localStorage
        const videoMetadata = {
          id: data.public_id,
          title: videoTitle,
          videoUrl: data.secure_url,
          uploadedAt: new Date().toISOString(),
          userId: user.uid // Associate video with the authenticated user
        };

        let uploadedVideos = JSON.parse(localStorage.getItem('uploadedVideos')) || [];
        uploadedVideos.push(videoMetadata);
        localStorage.setItem('uploadedVideos', JSON.stringify(uploadedVideos));

        // Optionally, send video metadata to your backend server for further processing

      } catch (error) {
        console.error('Error uploading video:', error);
        statusMessage.textContent = 'An error occurred while uploading the video.';
      }
    } else {
      // User is not authenticated, show error message
      statusMessage.textContent = 'You must be logged in to upload a video.';
    }
  });
});
