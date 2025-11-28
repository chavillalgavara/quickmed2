import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

// Default profile structure
const defaultProfile = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  dateOfBirth: '',
  age: '',
  gender: '',
  profilePhoto: null,
  lastUpdated: ''
};

export const ProfileProvider = ({ children, user }) => {
  const [profile, setProfile] = useState(() => {
    try {
      // First priority: user data from props (login data)
      if (user && user.email) {
        console.log('Initializing profile from user props:', user);
        const userProfile = {
          fullName: user.fullName || user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          pincode: user.pincode || '',
          dateOfBirth: user.dateOfBirth || '',
          age: user.age || '',
          gender: user.gender || '',
          profilePhoto: user.profilePhoto || null,
          lastUpdated: user.lastUpdated || new Date().toISOString()
        };
        
        // Save user data to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        return userProfile;
      }
      
      // Second priority: localStorage data
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        console.log('Initializing profile from localStorage');
        return JSON.parse(saved);
      }
      
      // Fallback: default profile
      console.log('Initializing with default profile');
      return defaultProfile;
    } catch (error) {
      console.error('Error loading profile:', error);
      return defaultProfile;
    }
  });

  // Sync profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      console.log('Profile saved to localStorage:', profile.fullName);
    } catch (error) {
      console.error('Error saving profile to localStorage:', error);
    }
  }, [profile]);

  // Update profile when user prop changes (login/logout) - IMMEDIATE UPDATE
  useEffect(() => {
    if (user && user.email) {
      console.log('User data received in ProfileProvider - UPDATING PROFILE:', user);
      setProfile(prevProfile => {
        const updatedProfile = {
          ...prevProfile,
          fullName: user.fullName || user.name || prevProfile.fullName,
          email: user.email || prevProfile.email,
          phone: user.phone || prevProfile.phone,
          address: user.address || prevProfile.address,
          city: user.city || prevProfile.city,
          pincode: user.pincode || prevProfile.pincode,
          dateOfBirth: user.dateOfBirth || prevProfile.dateOfBirth,
          age: user.age || prevProfile.age,
          gender: user.gender || prevProfile.gender,
          profilePhoto: user.profilePhoto || prevProfile.profilePhoto,
          lastUpdated: new Date().toISOString()
        };
        
        console.log('Profile updated from user data:', updatedProfile);
        return updatedProfile;
      });
    }
  }, [user]); // This will trigger immediately when user prop changes

  // Enhanced updateProfile function
  const updateProfile = (newProfileData) => {
    console.log('Updating profile with new data:', newProfileData);
    setProfile(prevProfile => {
      const updatedProfile = {
        ...prevProfile,
        ...newProfileData,
        lastUpdated: new Date().toISOString()
      };
      
      // Auto-calculate age if dateOfBirth is provided and changed
      if (newProfileData.dateOfBirth && newProfileData.dateOfBirth !== prevProfile.dateOfBirth) {
        const calculatedAge = calculateAge(newProfileData.dateOfBirth);
        updatedProfile.age = calculatedAge.toString();
      }
      
      console.log('Final updated profile:', updatedProfile);
      return updatedProfile;
    });
  };

  const updateProfilePhoto = (photoUrl) => {
    console.log('Updating profile photo:', photoUrl);
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: photoUrl,
      lastUpdated: new Date().toISOString()
    }));
  };

  const removeProfilePhoto = () => {
    console.log('Removing profile photo');
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: null,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Helper function to calculate age from date of birth
  const calculateAge = (birthDate) => {
    try {
      const dob = new Date(birthDate);
      const today = new Date();
      
      if (dob > today) {
        return 0;
      }

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return age > 0 ? age : 0;
    } catch (error) {
      console.error('Error calculating age:', error);
      return 0;
    }
  };

  // Clear profile (for logout)
  const clearProfile = () => {
    console.log('Clearing profile data');
    localStorage.removeItem('userProfile');
    setProfile(defaultProfile);
  };

  // Check if profile is complete
  const isProfileComplete = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'pincode', 'dateOfBirth', 'gender'];
    return requiredFields.every(field => profile[field] && profile[field].toString().trim() !== '');
  };

  // Force immediate profile sync (useful after login)
  const forceProfileUpdate = (userData) => {
    console.log('Force updating profile:', userData);
    if (userData) {
      updateProfile(userData);
    }
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      updateProfile,
      updateProfilePhoto,
      removeProfilePhoto,
      clearProfile,
      isProfileComplete,
      forceProfileUpdate // Add this new function
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;