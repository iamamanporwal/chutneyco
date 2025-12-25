/**
 * Client-Side Auth Simulation with Google Login & Address Management
 */

const AUTH_KEY = 'chutney_auth_user';

const auth = {
    // --- Authentication ---
    
    // Standard Login
    login: (username, password) => {
        if (username === 'admin' && password === 'admin123') {
            const user = { 
                id: 'u_admin', 
                username: 'Admin', 
                role: 'admin', 
                email: 'admin@chutney.co',
                addresses: [] 
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return { success: true, user };
        } 
        else if (username === 'user' && password === 'user123') {
            // Simulate existing user with saved address
            const user = { 
                id: 'u_sarah', 
                username: 'Sarah J.', 
                role: 'user', 
                email: 'sarah@example.com',
                addresses: [
                    {
                        type: 'Shipping',
                        line1: '123 Spice Lane',
                        city: 'Mumbai',
                        state: 'MH',
                        zip: '400001',
                        country: 'India'
                    }
                ]
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    },

    // Google Login Simulation
    loginWithGoogle: () => {
        return new Promise((resolve) => {
            // Simulate popup delay
            setTimeout(() => {
                const user = {
                    id: 'u_google_' + Date.now(),
                    username: 'Google User',
                    role: 'user',
                    email: 'user@gmail.com',
                    provider: 'google',
                    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIq8dJ...', // Mock avatar
                    addresses: []
                };
                localStorage.setItem(AUTH_KEY, JSON.stringify(user));
                resolve({ success: true, user });
            }, 1500);
        });
    },

    logout: () => {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = 'login.html';
    },

    getUser: () => {
        const userStr = localStorage.getItem(AUTH_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    // --- Profile Management ---

    saveAddress: (address) => {
        const user = auth.getUser();
        if (user) {
            user.addresses = user.addresses || [];
            user.addresses.push(address);
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return true;
        }
        return false;
    },

    // --- Guards & UI ---

    requireAdmin: () => {
        const user = auth.getUser();
        if (!user || user.role !== 'admin') {
            window.location.href = 'login.html';
        }
    },

    initNav: () => {
        const user = auth.getUser();
        const navContainer = document.querySelector('nav .flex.items-center.gap-4');
        
        // Find existing Auth component to replace or verify position
        let authDiv = document.getElementById('auth-component');
        if (authDiv) authDiv.remove();

        authDiv = document.createElement('div');
        authDiv.id = 'auth-component';
        authDiv.className = 'flex items-center gap-4';

        if (user) {
            // Logged In State
            authDiv.innerHTML = `
                <div class="relative group/auth">
                    <button class="flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors">
                        ${user.avatar ? `<img src="${user.avatar}" class="w-6 h-6 rounded-full">` : '<span class="material-symbols-outlined">person</span>'}
                        <span class="hidden md:inline">${user.username}</span>
                    </button>
                    <!-- Dropdown -->
                    <div class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-card-dark rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover/auth:opacity-100 group-hover/auth:visible transition-all duration-200 z-50 overflow-hidden">
                        ${user.role === 'admin' ? `
                            <a href="admin.html" class="block px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Dashboard
                            </a>
                        ` : ''}
                        <a href="profile.html" class="block px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            My Profile
                        </a>
                        <button onclick="auth.logout()" class="block w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Logged Out State
            authDiv.innerHTML = `
                <a href="login.html" class="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors">
                    Login
                </a>
            `;
        }

        if (navContainer) {
            navContainer.prepend(authDiv);
        }
    },

    showAdminControls: () => {
        const user = auth.getUser();
        if (user && user.role === 'admin') {
            document.body.classList.add('is-admin');
            document.querySelectorAll('.admin-only').forEach(el => {
                el.classList.remove('hidden');
            });
        }
    }
};

// Auto-run on load
document.addEventListener('DOMContentLoaded', () => {
    auth.initNav();
    auth.showAdminControls();
});
