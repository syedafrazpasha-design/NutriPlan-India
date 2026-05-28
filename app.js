// State Management
const State = {
  user: JSON.parse(localStorage.getItem('nutriplan_user')) || null,
  childReport: JSON.parse(localStorage.getItem('nutriplan_child')) || null,
  
  saveUser: (user) => {
    State.user = user;
    localStorage.setItem('nutriplan_user', JSON.stringify(user));
  },
  
  saveChildReport: (report) => {
    State.childReport = report;
    localStorage.setItem('nutriplan_child', JSON.stringify(report));
  },
  
  logout: () => {
    State.user = null;
    localStorage.removeItem('nutriplan_user');
    Router.navigate('/login');
  }
};

const FoodDB = [
  { id: 1, name: "Maggi", time: "10 mins", type: "General", tags: ["Kids Favorite", "Veggies"], image: "./maggi.png", ingredients: ["1 Pack Noodles", "Mixed Veggies", "Tastemaker"], recipe: "1. Boil water in a pan. 2. Add veggies and cook. 3. Add noodles and tastemaker." },
  { id: 2, name: "Aloo Paratha", time: "20 mins", type: "General", tags: ["Energy", "Carbs"], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/1280px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg", ingredients: ["Wheat Flour Dough", "Boiled Potato", "Mild Spices", "Ghee"], recipe: "1. Mash potato with spices. 2. Stuff into dough and roll flat. 3. Cook on a tawa with ghee." },
  { id: 3, name: "Poha", time: "15 mins", type: "General", tags: ["Iron", "Light Breakfast"], image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Poha.jpg", ingredients: ["1 cup Poha", "Peanuts", "Onion", "Turmeric"], recipe: "1. Wash poha. 2. Sauté peanuts and veggies with turmeric. 3. Mix poha and cook for 2 mins." },
  { id: 4, name: "Palak Paneer Bites", time: "20 mins", type: "General", tags: ["Calcium", "Iron", "Vitamins"], image: "./palak_paneer.png", ingredients: ["Paneer Cubes", "Spinach Puree", "Mild Spices", "Olive Oil"], recipe: "1. Blanch and puree spinach. 2. Pan-sear paneer cubes with mild spices. 3. Pour spinach puree over paneer and simmer for 5 mins." },
  { id: 5, name: "Ragi Dosa", time: "15 mins", type: "General", tags: ["Calcium", "Fiber", "Gluten Free"], image: "./ragi_dosa.png", ingredients: ["Ragi Flour", "Urad Dal Batter", "Salt", "Water"], recipe: "1. Mix ragi flour with standard dosa batter and water. 2. Spread thin on a hot greased tawa. 3. Cook until crispy on both sides." },
  { id: 6, name: "Oats Upma", time: "15 mins", type: "General", tags: ["Fiber", "Healthy Breakfast"], image: "./oats_upma.png", ingredients: ["Rolled Oats", "Mixed Veggies", "Mustard Seeds", "Curry Leaves"], recipe: "1. Dry roast oats for 2 mins. 2. Sauté mustard seeds, curry leaves, and veggies. 3. Add roasted oats and warm water, cook covered for 5 mins." },
  { id: 7, name: "Moong Dal Khichdi", time: "20 mins", type: "Personalized", tags: ["Protein", "Easy Digestion", "Comfort Food"], image: "./moong_dal_khichdi.png", ingredients: ["Yellow Moong Dal", "Rice", "Turmeric", "Ghee"], recipe: "1. Wash rice and dal thoroughly. 2. Sauté with turmeric and ghee in a pressure cooker. 3. Cook with water for 3 whistles." },
  { id: 8, name: "Curd Rice", time: "10 mins", type: "Personalized", tags: ["Calcium", "Probiotics"], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Curd_Rice.jpg/1280px-Curd_Rice.jpg", ingredients: ["1/2 cup Soft Cooked Rice", "3 tbsp Fresh Curd", "Salt"], recipe: "1. Mash the warm cooked rice. 2. Mix in fresh curd and salt. 3. Serve cool." },
  { id: 9, name: "Tomato Soup", time: "15 mins", type: "Personalized", tags: ["Vitamins", "Light Food"], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tomato_soup%2C_plant-based_%2844040252791%29.jpg/1280px-Tomato_soup%2C_plant-based_%2844040252791%29.jpg", ingredients: ["3 Tomatoes", "1 Carrot", "Salt"], recipe: "1. Boil tomatoes and carrot until soft. 2. Blend into a smooth puree. 3. Serve warm." },
  { id: 10, name: "Upma", time: "15 mins", type: "Personalized", tags: ["Carbs", "Light Breakfast"], image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_photo_of_Upma.jpg/1280px-A_photo_of_Upma.jpg", ingredients: ["1/2 cup Suji", "Ghee", "Curry Leaves", "Water"], recipe: "1. Roast suji. 2. Boil water. 3. Sauté curry leaves, mix hot water into suji slowly." },
  { id: 11, name: "Dal Soup", time: "20 mins", type: "Personalized", tags: ["Protein", "Very Light"], image: "https://upload.wikimedia.org/wikipedia/commons/6/61/EgFoodLentilSoup.jpg", ingredients: ["2 tbsp Yellow Moong Dal", "Turmeric", "Salt", "Water"], recipe: "1. Wash dal and pressure cook. 2. Mash into a smooth liquid soup. 3. Serve warm." },
  { id: 12, name: "Apple Mash", time: "10 mins", type: "Personalized", tags: ["Vitamins", "Soft"], image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Applesauce.jpg", ingredients: ["1 Apple", "Water"], recipe: "1. Peel and core the apple. 2. Steam until soft. 3. Mash completely with a fork." },
  { id: 13, name: "Atta Noodles", time: "12 mins", type: "General", tags: ["Kids Favorite", "Veggies", "Whole Wheat"], image: "./atta_noodles.png", ingredients: ["Whole Wheat Atta Noodles Pack", "Chopped Carrots & Peas", "Mild Spices"], recipe: "1. Boil atta noodles. 2. Sauté chopped veggies and mild spices in olive oil. 3. Toss boiled noodles with veggies." }
];

// Router setup
const Router = {
  routes: {},
  currentPath: '',
  
  add: (path, component) => {
    Router.routes[path] = component;
  },
  
  navigate: (path) => {
    history.pushState(null, null, '#' + path);
    Router.render(path);
  },
  
  render: (pathWithQuery) => {
    const path = pathWithQuery.split('?')[0];
    Router.currentPath = path;
    const app = document.getElementById('app');
    
    // Auth Check
    if (!State.user && path !== '/login') {
      Router.navigate('/login');
      return;
    }
    
    const component = Router.routes[path] || Router.routes['/dashboard'];
    app.innerHTML = '';
    
    // Render Navbar if not login
    if (path !== '/login') {
      app.appendChild(Components.Navbar());
    }
    
    // Render Main Content
    const main = document.createElement('main');
    main.className = 'container mt-4 animate-fade-in';
    main.appendChild(component());
    app.appendChild(main);
    
    // Re-initialize Icons
    if(window.lucide) {
      window.lucide.createIcons();
    }
  },
  
  init: () => {
    window.addEventListener('popstate', () => {
      Router.render(window.location.hash.slice(1) || '/dashboard');
    });
    Router.render(window.location.hash.slice(1) || '/dashboard');
  }
};

// UI Components
const Components = {
  Navbar: () => {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
      <div class="container">
        <a href="#/dashboard" class="navbar-brand">
          <img src="./logo.png" alt="NutriPlan Logo" style="width: 32px; height: 32px; border-radius: 6px; object-fit: cover;">
          NutriPlan India
        </a>
        <div class="navbar-nav">
          <a href="#/dashboard" class="nav-link ${Router.currentPath === '/dashboard' ? 'active' : ''}">Dashboard</a>
          <a href="#/general-food" class="nav-link ${Router.currentPath === '/general-food' ? 'active' : ''}">General Foods</a>
          <a href="#/personalized" class="nav-link ${Router.currentPath === '/personalized' ? 'active' : ''}">For Your Child</a>
          <a href="#/recipe-gen" class="nav-link ${Router.currentPath === '/recipe-gen' ? 'active' : ''}">Recipe Gen</a>
          <a href="#/profile" class="nav-link ${Router.currentPath === '/profile' ? 'active' : ''}">Profile</a>
          <button id="logout-btn" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;">Logout</button>
        </div>
      </div>
    `;
    nav.querySelector('#logout-btn').addEventListener('click', () => {
      State.logout();
    });
    return nav;
  },

  RecipeCard: (recipe) => {
    const div = document.createElement('div');
    div.className = 'card card-hover';
    div.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img">
      <h3 class="mb-2">${recipe.name}</h3>
      <div class="flex gap-2 mb-2 flex-wrap">
        ${recipe.tags.map(tag => `<span class="badge ${tag.includes('Iron') || tag.includes('Vitamin') ? 'orange' : ''}">${tag}</span>`).join('')}
      </div>
      <div class="recipe-meta mb-4">
        <span><i data-lucide="clock" style="width:16px; height:16px;"></i> ${recipe.time}</span>
      </div>
      <button class="btn btn-primary" style="width: 100%" onclick="window.location.hash='/recipe-gen?id=${recipe.id}'">View Recipe</button>
    `;
    return div;
  }
};

// Pages
const Pages = {
  Login: () => {
    const div = document.createElement('div');
    div.className = 'auth-container animate-fade-in';
    div.innerHTML = `
      <div class="card auth-card">
        <div class="text-center mb-6">
          <img src="./logo.png" alt="NutriPlan Logo" style="width: 72px; height: 72px; border-radius: 12px; margin-bottom: 1rem; object-fit: cover; box-shadow: var(--shadow-sm);">
          <h2>Welcome to NutriPlan</h2>
          <p class="text-muted">Healthy food for your little ones</p>
        </div>
        <form id="login-form">
          <div class="input-group">
            <label>Your Name</label>
            <input type="text" id="name-input" required placeholder="Enter your name">
          </div>
          <div class="input-group">
            <label>Email Address</label>
            <input type="email" id="email-input" required placeholder="parent@example.com">
          </div>
          <div class="input-group">
            <label>Password</label>
            <div style="position: relative;">
              <input type="password" required id="password-input" style="padding-right: 40px; width: 100%;">
              <button type="button" id="toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 0;">
                <i data-lucide="eye" style="width: 18px; height: 18px;" id="eye-icon"></i>
              </button>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-4" style="width: 100%">Sign In</button>
        </form>
      </div>
    `;
    
    div.querySelector('#toggle-password').addEventListener('click', () => {
      const pwdInput = div.querySelector('#password-input');
      const eyeIcon = div.querySelector('#eye-icon');
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
      } else {
        pwdInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
      }
      if(window.lucide) window.lucide.createIcons({ root: div.querySelector('#toggle-password') });
    });

    div.querySelector('#login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = div.querySelector('#name-input').value;
      const email = div.querySelector('#email-input').value;
      State.saveUser({ name: name, email: email });
      Router.navigate('/dashboard');
    });
    return div;
  },

  Dashboard: () => {
    const div = document.createElement('div');
    const childName = State.childReport ? State.childReport.name : 'your child';
    
    div.innerHTML = `
      <div class="mb-6">
        <h1>Hello, ${State.user.name} 👋</h1>
        <p class="text-muted">Here is the nutritional overview for ${childName}.</p>
      </div>
      
      ${!State.childReport ? `
        <div class="card mb-6" style="background: rgba(249, 115, 22, 0.1); border-color: rgba(249, 115, 22, 0.2);">
          <h3>Action Required</h3>
          <p class="mb-4">Please complete your child's health report to get personalized suggestions.</p>
          <button class="btn btn-secondary" onclick="window.location.hash='/profile'">Complete Profile</button>
        </div>
      ` : ''}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card card-hover cursor-pointer" onclick="window.location.hash='/general-food'">
          <div class="flex items-center gap-4 mb-4">
            <div style="padding: 1rem; background: rgba(74, 222, 128, 0.2); border-radius: 50%;">
              <i data-lucide="apple" style="color: var(--primary-dark)"></i>
            </div>
            <div>
              <h3>General Suggestions</h3>
              <p class="text-muted text-sm">Everyday healthy meals</p>
            </div>
          </div>
        </div>
        
        <div class="card card-hover cursor-pointer" onclick="window.location.hash='/personalized'">
          <div class="flex items-center gap-4 mb-4">
            <div style="padding: 1rem; background: rgba(249, 115, 22, 0.2); border-radius: 50%;">
              <i data-lucide="activity" style="color: var(--secondary-dark)"></i>
            </div>
            <div>
              <h3>Personalized for ${childName}</h3>
              <p class="text-muted text-sm">Based on health report</p>
            </div>
          </div>
        </div>
      </div>
      
      <h2 class="mt-4 mb-4">Quick Recipes</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${FoodDB.slice(0, 3).map(recipe => Components.RecipeCard(recipe).outerHTML).join('')}
      </div>
    `;
    return div;
  },

  Profile: () => {
    const div = document.createElement('div');
    const report = State.childReport || { name: '', age: '', weight: '', allergies: '', deficiencies: '' };
    
    div.innerHTML = `
      <div class="mb-6">
        <h1>Profile & Health Report</h1>
        <p class="text-muted">Manage your details and child's health metrics.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card">
          <h3 class="mb-4">Child Health Report</h3>
          <form id="health-form">
            <div class="input-group">
              <label>Child's Name</label>
              <input type="text" id="c_name" required value="${report.name}">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="input-group">
                <label>Age (years)</label>
                <input type="number" id="c_age" required value="${report.age}">
              </div>
              <div class="input-group">
                <label>Weight (kg)</label>
                <input type="number" id="c_weight" value="${report.weight}">
              </div>
            </div>
            <div class="input-group">
              <label>Allergies (comma separated)</label>
              <input type="text" id="c_allergies" placeholder="e.g., Peanuts, Dairy" value="${report.allergies}">
            </div>
            <div class="input-group">
              <label>Known Deficiencies / Focus</label>
              <select id="c_def">
                <option value="None" ${report.deficiencies === 'None' ? 'selected' : ''}>None</option>
                <option value="Iron" ${report.deficiencies === 'Iron' ? 'selected' : ''}>Iron Deficiency</option>
                <option value="Calcium" ${report.deficiencies === 'Calcium' ? 'selected' : ''}>Calcium (Bone Strength)</option>
                <option value="Protein" ${report.deficiencies === 'Protein' ? 'selected' : ''}>Protein (Growth)</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Save Report</button>
          </form>
        </div>
        
        <div class="card">
          <h3 class="mb-4">Parent Details</h3>
          <form id="parent-form">
            <div class="input-group">
              <label>Name</label>
              <input type="text" id="p_name" required value="${State.user.name}">
            </div>
            <div class="input-group">
              <label>Email</label>
              <input type="email" id="p_email" required value="${State.user.email}">
            </div>
            <button type="submit" class="btn btn-secondary mt-2">Update Details</button>
          </form>
        </div>
      </div>
    `;
    
    div.querySelector('#health-form').addEventListener('submit', (e) => {
      e.preventDefault();
      State.saveChildReport({
        name: div.querySelector('#c_name').value,
        age: div.querySelector('#c_age').value,
        weight: div.querySelector('#c_weight').value,
        allergies: div.querySelector('#c_allergies').value,
        deficiencies: div.querySelector('#c_def').value
      });
      alert('Child Health Report Saved!');
      Router.navigate('/dashboard');
    });

    div.querySelector('#parent-form').addEventListener('submit', (e) => {
      e.preventDefault();
      State.saveUser({
        name: div.querySelector('#p_name').value,
        email: div.querySelector('#p_email').value
      });
      alert('Parent Details Updated!');
      // Update the navbar by re-rendering the current path to reflect name changes if any
      Router.render(Router.currentPath);
    });
    return div;
  },

  GeneralFood: () => {
    const div = document.createElement('div');
    const generals = FoodDB.filter(f => f.type === 'General' || f.type === 'Healthy');
    
    div.innerHTML = `
      <div class="mb-6">
        <h1>General Food Suggestions</h1>
        <p class="text-muted">Healthy, easy-to-prepare meals suitable for most children.</p>
        <div class="mt-4" style="position: relative; max-width: 400px;">
          <input type="text" id="search-input" placeholder="Search foods by name or tag..." style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface);">
          <i data-lucide="search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #94a3b8;"></i>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="general-grid">
      </div>
    `;
    
    const grid = div.querySelector('#general-grid');
    const input = div.querySelector('#search-input');
    
    const renderGrid = (items) => {
      grid.innerHTML = '';
      items.forEach(f => grid.appendChild(Components.RecipeCard(f)));
      if(window.lucide) window.lucide.createIcons();
    };
    
    input.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = generals.filter(f => f.name.toLowerCase().includes(term) || f.tags.some(t => t.toLowerCase().includes(term)));
      renderGrid(filtered);
    });
    
    renderGrid(generals);
    return div;
  },

  PersonalizedFood: () => {
    const div = document.createElement('div');
    
    if(!State.childReport) {
      div.innerHTML = `
        <div class="text-center mt-4">
          <i data-lucide="alert-circle" style="width: 48px; height: 48px; color: var(--secondary); margin-bottom: 1rem;"></i>
          <h2>No Health Report Found</h2>
          <p class="text-muted mb-4">Please fill out the child's health report first.</p>
          <button class="btn btn-primary" onclick="window.location.hash='/profile'">Go to Profile</button>
        </div>
      `;
      return div;
    }

    const focus = State.childReport.deficiencies;
    // Simple mock logic: filter foods based on tags matching the deficiency, or just show 'Personalized' marked foods.
    let filtered = FoodDB.filter(f => f.type === 'Personalized' || f.tags.some(t => t.includes(focus)));
    if (filtered.length === 0) filtered = FoodDB; // fallback

    div.innerHTML = `
      <div class="mb-6">
        <h1>Foods for ${State.childReport.name}</h1>
        <p class="text-muted">Curated suggestions based on age ${State.childReport.age} and focus: <span class="badge orange">${focus}</span></p>
        <div class="mt-4" style="position: relative; max-width: 400px;">
          <input type="text" id="search-input" placeholder="Search personalized foods..." style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border-radius: 8px; border: 1px solid var(--border); background: var(--surface);">
          <i data-lucide="search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: #94a3b8;"></i>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="personalized-grid">
      </div>
    `;
    
    const grid = div.querySelector('#personalized-grid');
    const input = div.querySelector('#search-input');
    
    const renderGrid = (items) => {
      grid.innerHTML = '';
      items.forEach(f => grid.appendChild(Components.RecipeCard(f)));
      if(window.lucide) window.lucide.createIcons();
    };
    
    input.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filteredResults = filtered.filter(f => f.name.toLowerCase().includes(term) || f.tags.some(t => t.toLowerCase().includes(term)));
      renderGrid(filteredResults);
    });
    
    renderGrid(filtered);
    return div;
  },

  RecipeGen: () => {
    const div = document.createElement('div');
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const recipeId = parseInt(urlParams.get('id'));
    
    let recipe = FoodDB.find(f => f.id === recipeId);

    if(!recipe) {
      // Show list of recipes to choose from
      div.innerHTML = `
        <div class="mb-6">
          <h1>Recipe Generator</h1>
          <p class="text-muted">Select a food item to generate a step-by-step recipe.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${FoodDB.map(f => Components.RecipeCard(f).outerHTML).join('')}
        </div>
      `;
      return div;
    }

    div.innerHTML = `
      <button class="btn btn-outline mb-4" onclick="window.history.back()">
        <i data-lucide="arrow-left" style="width: 16px; height: 16px"></i> Back
      </button>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-1">
          <img src="${recipe.image}" alt="${recipe.name}" class="img-responsive mb-4" style="width: 100%; height: 300px; object-fit: cover;">
          <div class="card">
            <h3 class="mb-4">Preparation Duration</h3>
            <div class="flex items-center gap-2" style="font-size: 1.5rem; font-weight: 600; color: var(--primary-dark);">
              <i data-lucide="clock" style="width: 24px; height: 24px;"></i> ${recipe.time}
            </div>
          </div>
        </div>
        <div class="md:col-span-2 card">
          <h1 class="mb-2">${recipe.name}</h1>
          <div class="flex gap-2 mb-6">
            ${recipe.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
          </div>
          
          <h3 class="mb-4 flex items-center gap-2"><i data-lucide="list"></i> Food List (Ingredients)</h3>
          <ul style="list-style-position: inside; margin-bottom: 2rem;" class="text-muted">
            ${recipe.ingredients.map(ing => `<li class="mb-2">${ing}</li>`).join('')}
          </ul>
          
          <h3 class="mb-4 flex items-center gap-2"><i data-lucide="chef-hat"></i> Step-by-Step Recipe</h3>
          <div class="text-muted" style="line-height: 1.8;">
            ${recipe.recipe.split('. ').map(step => step ? `<p class="mb-2">${step.trim()}.</p>` : '').join('')}
          </div>
        </div>
      </div>
    `;
    return div;
  }
};

// Register Routes
Router.add('/login', Pages.Login);
Router.add('/dashboard', Pages.Dashboard);
Router.add('/profile', Pages.Profile);
Router.add('/general-food', Pages.GeneralFood);
Router.add('/personalized', Pages.PersonalizedFood);
Router.add('/recipe-gen', Pages.RecipeGen);

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  Router.init();
  
  // Manage the loading screen delay
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('fade-out');
      // Remove loader from DOM after transition completes (matching CSS 0.5s transition)
      setTimeout(() => {
        loader.remove();
      }, 500);
    }
  }, 3000); // 3 seconds delay
});
