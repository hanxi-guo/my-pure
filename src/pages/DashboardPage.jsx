import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserData } from '../hooks/useUserData';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
    const { user, logout } = useAuth0();
    const { userData, loading, error, toggleGroceryItem } = useUserData();

  const handleToggleItem = async (itemId, checked) => {
    await toggleGroceryItem(itemId, checked);
  };

    const handleViewRecipe = async (recipeId) => {
        try {
          // Call your recipe API or Firebase function
          const recipeDetails = await getRecipeDetails(recipeId);
          // Show recipe details (maybe in a modal?)
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };
      
    //   const handleToggleItem = async (itemId) => {
    //     try {
    //       // Update item status in Firebase
    //       await updateGroceryItem(user.sub, itemId);
    //       // Refresh user data or update local state
    //     } catch (error) {
    //       console.error('Error updating item:', error);
    //     }
    //   };
  
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
  
    if (error) {
      return <div className="error">Error: {error}</div>;
    }
  
    return (
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src="/logo.PNG" alt="Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li className="active">Projects</li>
            <li className="active">Calendar</li>
            <li className="active">Reports</li>
            <li className="active">Settings</li>
          </ul>
        </nav>
      </aside>
  
        <main className="dashboard-main">
          <header className="dashboard-header">
            <div className="header-search">
              <input type="search" placeholder="Search recipes..." />
            </div>
            <div className="header-user">
              <img src={user?.picture} alt="Profile" className="user-avatar" />
              <span className="user-name">{user?.name}</span>
              <button className="logout-button" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </button>
            </div>
          </header>
  
          <div className="dashboard-content">
            <div className="dashboard-grid">
              {/* Budget Stats */}
              <div className="stat-card">
                <h3>Weekly Budget</h3>
                <p className="stat-number">${userData?.weeklyBudget}</p>
                <p className="stat-trend positive">${userData?.remainingBudget} remaining</p>
              </div>
              <div className="stat-card">
                <h3>Dietary Preferences</h3>
                <div className="diet-tags">
                  {userData?.dietaryRestrictions.map((diet) => (
                    <span key={diet} className="diet-tag">{diet}</span>
                  ))}
                </div>
              </div>
              <div className="stat-card">
                <h3>Location</h3>
                <p className="stat-number">{userData?.zipCode}</p>
                <p className="location-text">{userData?.cityState}</p>
              </div>
  
              {/* Meal Plan Card */}
              <div className="activity-card">
                <h3>This Week's Meal Plan</h3>
                <ul className="meal-list">
                  {userData?.mealPlan?.map((meal) => (
                    <li key={meal.day}>
                      <span className="meal-day">{meal.day}</span>
                      <span className="meal-text">{meal.recipe}</span>
                      <button 
                        className="view-recipe-btn"
                        onClick={() => handleViewRecipe(meal.recipeId)}
                      >
                        View Recipe
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* Grocery Card */}
              <div className="projects-card">
                <h3>Grocery Recommendations</h3>
                <div className="grocery-list">
                  {userData?.groceryStores?.map((store) => (
                    <div key={store.name} className="store-section">
                      <h4>{store.name}</h4>
                      <ul>
                        {store.items.map((item) => (
                          <li key={item.id}>
                            <input 
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => handleToggleItem(item.id)}
                            />
                            <span>{item.name} - ${item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default DashboardPage;