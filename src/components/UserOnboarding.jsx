import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserOnboarding.css';

// import { saveUserPreferences } from '../services/firebase/firestore'; // You'll get this from your teammate

const UserOnboarding = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dietaryRestrictions: [],
    weeklyBudget: '',
    zipCode: '',
  });

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Kosher',
    'Halal',
    'None'
  ];

  const handleDietaryChange = (restriction) => {
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveUserPreferences(user.sub, formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Let's Personalize Your Experience
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dietary Restrictions */}
          <div>
            <label className="text-lg font-medium text-gray-700 block mb-2">
              Dietary Restrictions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.dietaryRestrictions.includes(option)}
                    onChange={() => handleDietaryChange(option)}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Weekly Budget */}
          <div>
            <label className="text-lg font-medium text-gray-700 block mb-2">
              Weekly Budget ($)
            </label>
            <input
              type="number"
              value={formData.weeklyBudget}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                weeklyBudget: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your weekly budget"
              required
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="text-lg font-medium text-gray-700 block mb-2">
              Zip Code
            </label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                zipCode: e.target.value
              }))}
              pattern="[0-9]{5}"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your zip code"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-4 rounded-md hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserOnboarding;