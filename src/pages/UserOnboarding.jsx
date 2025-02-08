// import React, { useState } from 'react';
// import '../styles/UserOnboarding.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
// import { createUserProfile } from '../service/firebase/firestore';

// const UserOnboarding = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth0();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const [formData, setFormData] = useState({
//     dietaryRestrictions: [],
//     weeklyBudget: '',
//     weeklyCook: '',
//     zipCode: '',
//   });

//   const dietaryOptions = [
//     'Vegetarian',
//     'Vegan',
//     'Gluten-Free',
//     'Dairy-Free',
//     'Kosher',
//     'Halal',
//     'None'
//   ];

//   const handleDietaryChange = (restriction) => {
//     console.log('Current restrictions:', formData.dietaryRestrictions);
//     setFormData(prev => {
//       const newRestrictions = prev.dietaryRestrictions.includes(restriction)
//         ? prev.dietaryRestrictions.filter(r => r !== restriction)
//         : [...prev.dietaryRestrictions, restriction];
//       console.log('New restrictions:', newRestrictions);
//       return {
//         ...prev,
//         dietaryRestrictions: newRestrictions
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // 创建用户配置文件对象
//       const userProfile = {
//         ...formData,
//         userId: user.sub,
//         email: user.email,
//         name: user.name,
//         createdAt: new Date(),
//         mealPlan: [], // 初始化空的餐饮计划
//         groceryStores: [], // 初始化空的购物清单
//       };

//       // 保存到 Firebase
//       await createUserProfile(user.sub, userProfile);
      
//       // 保存成功，跳转到仪表板
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message);
//       console.error('Error saving user preferences:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full">
//       <div className="animate-background absolute inset-0" />
      
//       <div className="relative z-10 max-w-2xl mx-auto pt-12 px-4">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h3 className="text-xl font-bold text-center mb-8">
//             Let's Personalize Your Experience
//           </h3>
          
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="card">
//               <h1>Dietary Restrictions</h1>
//               <div className="flex justify-center">
//                 <div className="flex-col space-y-4 min-w-[200px] dietary-options">
//                   {dietaryOptions.map((option) => (
//                     <label key={option} className="flex items-center justify-start space-x-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={formData.dietaryRestrictions.includes(option)}
//                         onChange={() => handleDietaryChange(option)}
//                         className="w-4 h-4"
//                       />
//                       <span className="text-gray-700 text-lg">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="card">
//               <h1>Weekly Budget ($)</h1>
//               <input
//                 type="number"
//                 value={formData.weeklyBudget}
//                 onChange={(e) => setFormData(prev => ({
//                   ...prev,
//                   weeklyBudget: e.target.value
//                 }))}
//                 placeholder="Enter your weekly budget"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="card">
//               <h1>Zip Code</h1>
//               <input
//                 type="text"
//                 value={formData.zipCode}
//                 onChange={(e) => setFormData(prev => ({
//                   ...prev,
//                   zipCode: e.target.value
//                 }))}
//                 pattern="[0-9]{5}"
//                 placeholder="Enter your zip code"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="card">
//               <h1>How often do you typically cook for yourself each week?</h1>
//               <input
//                 type="number"
//                 value={formData.weeklyCook}
//                 onChange={(e) => setFormData(prev => ({
//                   ...prev,
//                   weeklyCook: e.target.value
//                 }))}
//                 placeholder="Enter your weekly Cooking times"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>

//             <button 
//               type="submit"
//               disabled={loading}
//               className={`w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded font-semibold hover:from-blue-700 hover:to-teal-700 transition-colors ${
//                 loading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//             >
//               {loading ? 'Saving...' : 'Save Preferences'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserOnboarding;
import React, { useState } from 'react';
import '../styles/UserOnboarding.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { createUserProfile, getUserPreferences } from '../service/firebase/firestore';

const UserOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    dietaryRestrictions: [],
    weeklyBudget: '',
    weeklyCook: '',
    zipCode: '',
  });

  // ... 其他表单处理代码保持不变 ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. 创建用户配置文件对象
      const userProfile = {
        ...formData,
        userId: user.sub,
        email: user.email,
        name: user.name,
        createdAt: new Date(),
        mealPlan: [],
        groceryStores: [],
        // 添加注册标记
        isRegistered: true,
        registrationCompleted: new Date()
      };

      // 2. 保存到 Firebase
      console.log('Saving user profile...');
      await createUserProfile(user.sub, userProfile);
      
      // 3. 验证数据已保存
      console.log('Verifying registration...');
      const savedData = await getUserPreferences(user.sub);
      
      if (!savedData) {
        throw new Error('Failed to verify user registration');
      }
      
      console.log('Registration successful, navigating to dashboard...');
      
      // 4. 强制页面刷新以触发 AuthenticatedRoute 重新检查
      window.location.href = '/dashboard';
      
    } catch (err) {
      console.error('Error in submission:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="relative min-h-screen w-full">
          <div className="animate-background absolute inset-0" />
          
          <div className="relative z-10 max-w-2xl mx-auto pt-12 px-4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-center mb-8">
                Let's Personalize Your Experience
              </h3>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="card">
                  <h1>Dietary Restrictions</h1>
                  <div className="flex justify-center">
                    <div className="flex-col space-y-4 min-w-[200px] dietary-options">
                      {dietaryOptions.map((option) => (
                        <label key={option} className="flex items-center justify-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.dietaryRestrictions.includes(option)}
                            onChange={() => handleDietaryChange(option)}
                            className="w-4 h-4"
                          />
                          <span className="text-gray-700 text-lg">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
    
                <div className="card">
                  <h1>Weekly Budget ($)</h1>
                  <input
                    type="number"
                    value={formData.weeklyBudget}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      weeklyBudget: e.target.value
                    }))}
                    placeholder="Enter your weekly budget"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
    
                <div className="card">
                  <h1>Zip Code</h1>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      zipCode: e.target.value
                    }))}
                    pattern="[0-9]{5}"
                    placeholder="Enter your zip code"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
    
                <div className="card">
                  <h1>How often do you typically cook for yourself each week?</h1>
                  <input
                    type="number"
                    value={formData.weeklyCook}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      weeklyCook: e.target.value
                    }))}
                    placeholder="Enter your weekly Cooking times"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
    
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded font-semibold hover:from-blue-700 hover:to-teal-700 transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
};

export default UserOnboarding;