import React, { useState, useEffect } from 'react'
import Header from "../Header/Header";
import backgroundImage from "../../assets/Hero2.jpg"
import './TraineeProfile.css'
import {Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import ViewTrainers from "./ViewTrainers"
import Bookings from "./Bookings"

const TraineeProfile = () => {

        const [TraineeName, setTraineeName] = useState('');
        const location = useLocation();
        const navigate = useNavigate(); // Using useNavigate instead of useHistory
        const [showConfirmation, setShowConfirmation] = useState(false);
        const [showConfirmationdel, setShowConfirmationdel] = useState(false);

        useEffect(() => {
            //an HTTP request to fetch the user's name when the component mounts
            fetch('/api/user/name', { // insert the relevant url
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include the user's access token
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setTraineeName(data.name);  // // Set the user's name in state
            })
            .catch((error) => {
                console.log('Error fetching user name;', error);
            });
        }, []); // The empty array [] as the second argument ensures that the effect runs only once when the component mounts

        // Function to handle logout confirmation
  const handleLogout = () => {
    // Display the confirmation prompt
    setShowConfirmation(true);
  };

  // Function to confirm and perform the logout action
  const confirmLogout = () => {
    // Perform the logout action (e.g., clear user session)
    // Redirect to the logout route or perform any other necessary actions
    localStorage.removeItem('accessToken'); // Remove the access token
    navigate('/login'); // Redirect to the logout route
  };

  const confirmDelete = () => {
    navigate('/register');
  }

  const cancelDelete = () => {
    setShowConfirmationdel(false);
  }

  // Function to cancel logout
  const cancelLogout = () => {
    // Hide the confirmation prompt
    setShowConfirmation(false);
  };

  // Function to handle user deletion
  const handleDeleteUser = () => {
    setShowConfirmationdel(true);

    if (confirmDelete) {
      // Make an HTTP request to delete the user's account
      fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        if (response.ok) {
          // Redirect to the login page or perform any other action
          // after successful deletion
          window.location.href = '/login'; // Replace with the desired URL
        } else {
          console.log('Error deleting user account');
        }
      })
      .catch((error) => {
        console.log('Error deleting user account:', error);
      });
    }
  };

  return (
    

    <div className="traineeprofile">
        <div className='lefttp'>
            <div className="traineepheader"><Header/></div>
            
            <div className='tp-text'>
            <div><span className='stroke-text'>Hi Wishula </span>
            </div>
        
            </div>
        </div>
        <div className="style" style={{
        backgroundImage: `url(${backgroundImage})`}}
        ></div>
       {/* Logout confirmation prompt */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to logout?</p>
          <button className="btn" onClick={confirmLogout}>
            Yes
          </button>
          <button className="btn" onClick={cancelLogout}>
            No
          </button>
        </div>
      )}
      {showConfirmationdel && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete your account?</p>
          <button className="btn" onClick={confirmDelete}>
            Yes
          </button>
          <button className="btn" onClick={cancelDelete}>
            No
          </button>
        </div>
      )}
            <div className='container'>
                <ul className="listoflinks">
                    <li ><Link to="/viewtrainers" className={location.pathname === '/viewtrainers' ? 'active-link' : ''} style={{textDecoration: 'none', color:'brown'}}>Find Trainers</Link></li>
                    <li><Link to="/bookings" className={location.pathname === '/bookings' ? 'active-link' : ''} style={{textDecoration: 'none', color:'brown'}}>My Appointments</Link></li>
                    <li ><Link to="/traineesettings" className={location.pathname === '/traineesettings' ? 'active-link' : ''} style={{textDecoration: 'none', color:'brown'}}>Profile</Link></li>
                </ul>
                <br />
                <br />
                <div className="traineeprofilebuttons">
                <button className="btn" onClick={handleLogout}>Logout</button>
                <button className="btn" onClick={handleDeleteUser}>Delete Account</button>
                </div>
            </div>
            {/* Logout confirmation prompt */}
      
        
    </div>
  )
}

export default TraineeProfile;