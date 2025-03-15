import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleProfileClick = () => {
    if (!user) {
      alert('Please log in first!');
      navigate('/login'); // Redirect to login page
      return;
    }

    const { role } = user;

    // Redirect based on role
    switch (role) {
      case 'admin':
        navigate('/admin-profile');
        break;
      case 'specialchild':
        navigate('/specialchild-profile');
        break;
      case 'parent':
        navigate('/parent-profile');
        break;
      case 'educator':
        navigate('/educator-profile');
        break;
      default:
        alert('Role not recognized. Redirecting to the home page.');
        navigate('/');
    }
  };

  return (
    <div
      id="profile-container"
      className="profile-container"
      onClick={handleProfileClick}
      style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
    >
      <img
        id="profile-pic"
        src={user?.photoURL || '/default-profile.png'}
        alt="Profile"
        className="profile-pic"
        style={{
          width: '40px', 
          height: '40px',
          borderRadius: '50%',
          objectFit: 'cover',
        }} // Ensure consistent styling
      />
    </div>
  );
};

export default Profile;
