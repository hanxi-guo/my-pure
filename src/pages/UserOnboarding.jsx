import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserOnboarding.css';

const UserOnboarding = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h2>Let's Personalize Your Experience</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Dietary Restrictions */}
        <div className="card">
          <label>Dietary Restrictions</label>
          <div className="grid grid-cols-2 gap-2 dietary-options">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.dietaryRestrictions.includes(option)}
                  onChange={() => handleDietaryChange(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Weekly Budget */}
        <div className="card">
          <label>Weekly Budget ($)</label>
          <input
            type="number"
            value={formData.weeklyBudget}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              weeklyBudget: e.target.value
            }))}
            placeholder="Enter your weekly budget"
            required
          />
        </div>

        {/* Zip Code */}
        <div className="card">
          <label>Zip Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              zipCode: e.target.value
            }))}
            pattern="[0-9]{5}"
            placeholder="Enter your zip code"
            required
          />
        </div>

        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default UserOnboarding;
