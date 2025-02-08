import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './config';


export const createUserProfile = async (userId, userData) => {
  if (!userId) {
    console.error('createUserProfile: userId is missing');
    throw new Error('User ID is required');
  }

  if (!userData) {
    console.error('createUserProfile: userData is missing');
    throw new Error('User data is required');
  }

  try {
    console.log('Attempting to create user profile for:', userId);
    console.log('With data:', JSON.stringify(userData, null, 2));

    const userRef = doc(db, 'users', userId);
    
    const dataToSave = {
      ...userData,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    await setDoc(userRef, dataToSave);
    
    // 验证数据是否保存成功
    const savedDoc = await getDoc(userRef);
    if (!savedDoc.exists()) {
      throw new Error('Document was not saved successfully');
    }

    console.log('User profile created successfully');
    return true;
  } catch (error) {
    console.error('Detailed error in createUserProfile:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    
    if (error.code === 'permission-denied') {
      throw new Error('Firebase permission denied. Check your security rules.');
    }
    
    if (error.code === 'not-found') {
      throw new Error('Firebase project or collection not found. Check your configuration.');
    }
    
    throw new Error(`Failed to create user profile: ${error.message}`);
  }
};

// Get user preferences
export const getUserPreferences = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user preferences:', error);
    throw error;
  }
};

// Save user preferences
export const saveUserPreferences = async (userId, preferences) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, preferences, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
};

// Update grocery item status
export const updateGroceryItem = async (userId, itemId, checked) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`groceryList.${itemId}.checked`]: checked
    });
    return true;
  } catch (error) {
    console.error('Error updating grocery item:', error);
    throw error;
  }
};