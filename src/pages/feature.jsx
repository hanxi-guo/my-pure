import React from 'react';
import '../styles/Features.css';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaWallet, FaTags, FaBookOpen } from 'react-icons/fa';

const Features = () => {
    const navigate = useNavigate();
  
    const featureList = [
      {
        title: 'Personalized Meal Plans',
        description: 'Get meal recommendations based on your dietary preferences and budget.',
        icon: <FaUtensils className="text-blue-500 text-3xl" />,
      },
      {
        title: 'Budget Tracking',
        description: 'Stay within your weekly grocery budget with our smart tracking system.',
        icon: <FaWallet className="text-green-500 text-3xl" />,
      },
      {
        title: 'Grocery Deals',
        description: 'Find the best deals near you to save money on groceries.',
        icon: <FaTags className="text-red-500 text-3xl" />,
      },
      {
        title: 'Recipe Suggestions',
        description: 'Discover new recipes tailored to your preferences and available ingredients.',
        icon: <FaBookOpen className="text-yellow-500 text-3xl" />,
      },
    ];
  
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold mb-6">Explore Our Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/onboarding')} 
          className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </div>
    );
};
  
export default Features;
