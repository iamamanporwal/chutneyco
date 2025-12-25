/**
 * Mock Database Service
 * Handles persistence for Products, Orders, Promotions, and Cart using LocalStorage
 */

const DB_KEYS = {
    PRODUCTS: 'chutney_products',
    ORDERS: 'chutney_orders',
    PROMOTIONS: 'chutney_promotions',
    CART: 'chutney_cart'
};

// Initial Seed Data
const SEED_DATA = {
    PRODUCTS: [
        {
            id: 'p1',
            slug: 'smoky-tomato',
            name: 'Smoky Tomato',
            price: 450.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU13zD0jaEpr2ZYdFFUt9yvAPOl0kGLz0jFNO11hYG1N5RopH9l_5P1JAw4g7teQAhHrj0E05LHq9Bga7PD4ym-O-i1tTrLAn7L-QmOD79Igvt_M9U5J7O9ewd4dqVoxgqQiTI1_zLAv3zlHmvij93i9c_nfwC3cEHKjK3ONdwxrEDsBJTkrxvWizS9paX-CglhSp6BC9zkNWV6HQOSvjSZYsE7UqvjqGEt0tNxaMR8Q0Pq0xZ004gUkvHC6BhIgUkzicMzARMe7bH',
            spiceLevel: 'Mild',
            description: 'Charred tomatoes with a hint of chipotle. Perfect for burgers.',
            tags: ['Best Seller', 'Mild'],
            stock: 150
        },
        {
            id: 'p2',
            slug: 'zesty-coriander',
            name: 'Zesty Coriander',
            price: 450.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdH2jITDM68zf3BX0M1Nfx3k66JGlVoqLwTsyBbSBGEJ5pulZcCHZC58a_Cmt9BfgB00CwXdwSJrd9Wl7BbtnpHLIaNDS9P2tJ2dOwAU6Q69n7IdkVANGbvnu5asiljj8eqZpC9ndx4JHk87EYclqm3iKwe7s5a_cU0gwkAH96kZajJOO8kiWakkgN9o4pdJHsiySOLBe45wWXxkBaBYh61tKPW5XZdEnCDK_r7b0UpgDKCI_fhvwqzqMR3UIwzpqdYhltUA7lV7oo',
            spiceLevel: 'Medium',
            description: 'Fresh herbs, green chili, and a splash of lime.',
            tags: ['Medium'],
            stock: 85
        },
        {
            id: 'p3',
            slug: 'ghost-pepper-garlic',
            name: 'Ghost Pepper Garlic',
            price: 450.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEaLQ8EIhnI4ZqRd7MmH13zNcw_FGwDyngGB1JmyG6to-2h3mPOJsptP2c9tQPHJ-crJhE5DgFD_4HStqtSTub4n2od9w4cZKmg4GVmxPe1Woe4rj1Lmy2enQxp2BAX12LMXo3mDoLKUlE3nB6u_0L46zzXKXUn6vxaz8IUhE3e1sjoGRzJ5tp9DDlLsCIH93jQJLfrUgIhemBNtg5cwkksCcEpOzJD-EMlH6715pDgWc9GRpYNbGXJjmqmi-zj4ehaBAX0AJsUb_r',
            spiceLevel: 'Hot',
            description: 'Roasted garlic meets the legendary ghost pepper. Not for the weak.',
            tags: ['Hot AF 🔥'],
            stock: 40
        },
        {
            id: 'p4',
            slug: 'mango-ginger',
            name: 'Mango Ginger',
            price: 450.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDzzNrsav-_EMeKq90M23k4ZjriLO4qXBZ0c9Qq_WvegR9UGE7zuErDBCnkslKxySzB3pE2GWDnPhEMqYGngT5nyYpOjU4fv-6YnBYsyComsZzKxvuPvngzTC-VQo3jqPXAuR0SrmQMAKYhSjEKEL2xjShlEwzzAb0BBvs8SkOdhd4chaWeDGLLvHamwq0WhPLjEP3WpHMV9ikIpolm1GvJU6-djyQI5CSWWhZpFBVyG9cFHYwg3lWFwK0RebkBtHS4npv2aVkwujN',
            spiceLevel: 'Mild',
            description: 'Sweet mango with a spicy ginger kick.',
            tags: ['Mild'],
            stock: 100
        },
        {
            id: 'p5',
            slug: 'tamarind-date',
            name: 'Tamarind Date',
            price: 450.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU13zD0jaEpr2ZYdFFUt9yvAPOl0kGLz0jFNO11hYG1N5RopH9l_5P1JAw4g7teQAhHrj0E05LHq9Bga7PD4ym-O-i1tTrLAn7L-QmOD79Igvt_M9U5J7O9ewd4dqVoxgqQiTI1_zLAv3zlHmvij93i9c_nfwC3cEHKjK3ONdwxrEDsBJTkrxvWizS9paX-CglhSp6BC9zkNWV6HQOSvjSZYsE7UqvjqGEt0tNxaMR8Q0Pq0xZ004gUkvHC6BhIgUkzicMzARMe7bH',
            spiceLevel: 'Medium',
            description: 'Tart tamarind balanced with sweet dates.',
            tags: ['Medium'],
            stock: 60
        },
        {
            id: 'p6',
            slug: 'red-chili',
            name: 'Red Chili Classic',
            price: 450.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdH2jITDM68zf3BX0M1Nfx3k66JGlVoqLwTsyBbSBGEJ5pulZcCHZC58a_Cmt9BfgB00CwXdwSJrd9Wl7BbtnpHLIaNDS9P2tJ2dOwAU6Q69n7IdkVANGbvnu5asiljj8eqZpC9ndx4JHk87EYclqm3iKwe7s5a_cU0gwkAH96kZajJOO8kiWakkgN9o4pdJHsiySOLBe45wWXxkBaBYh61tKPW5XZdEnCDK_r7b0UpgDKCI_fhvwqzqMR3UIwzpqdYhltUA7lV7oo',
            spiceLevel: 'Hot',
            description: 'Roasted red chilies with garlic. Bold heat.',
            tags: ['Hot'],
            stock: 75
        }
    ],
    PROMOTIONS: [
        { code: 'WELCOME10', type: 'percent', value: 10, minOrder: 0, active: true },
        { code: 'SPICY50', type: 'fixed', value: 50, minOrder: 500, active: true }
    ],
    ORDERS: [
        {
            id: 'ORD-1001',
            date: '2023-10-24T10:30:00Z',
            customer: { name: 'Sarah J.', email: 'sarah@example.com' },
            items: [
                { productId: 'p1', name: 'Smoky Tomato', quantity: 2, price: 450.00 }
            ],
            total: 900.00,
            status: 'Delivered'
        },
        {
            id: 'ORD-1002',
            date: '2023-10-25T14:15:00Z',
            customer: { name: 'Mike T.', email: 'mike@example.com' },
            items: [
                { productId: 'p3', name: 'Ghost Pepper Garlic', quantity: 1, price: 450.00 }
            ],
            total: 450.00,
            status: 'Processing'
        }
    ]
};

const db = {
    init: () => {
        if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
            localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(SEED_DATA.PRODUCTS));
        }
        if (!localStorage.getItem(DB_KEYS.PROMOTIONS)) {
            localStorage.setItem(DB_KEYS.PROMOTIONS, JSON.stringify(SEED_DATA.PROMOTIONS));
        }
        if (!localStorage.getItem(DB_KEYS.ORDERS)) {
            localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(SEED_DATA.ORDERS));
        }
    },

    // --- Products ---
    getProducts: () => JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS) || '[]'),
    getProduct: (id) => db.getProducts().find(p => p.id === id),
    getProductBySlug: (slug) => db.getProducts().find(p => p.slug === slug),
    
    saveProduct: (product) => {
        const products = db.getProducts();
        const index = products.findIndex(p => p.id === product.id);
        if (index >= 0) {
            products[index] = product;
        } else {
            product.id = 'p' + Date.now();
            products.push(product);
        }
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    },
    deleteProduct: (id) => {
        const products = db.getProducts().filter(p => p.id !== id);
        localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    },

    // --- Cart ---
    getCart: () => JSON.parse(localStorage.getItem(DB_KEYS.CART) || '[]'),
    addToCart: (productId, quantity = 1) => {
        const cart = db.getCart();
        const existing = cart.find(item => item.productId === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }
        localStorage.setItem(DB_KEYS.CART, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated')); // Notify UI
    },
    removeFromCart: (productId) => {
        const cart = db.getCart().filter(item => item.productId !== productId);
        localStorage.setItem(DB_KEYS.CART, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    },
    updateCartItem: (productId, quantity) => {
        const cart = db.getCart();
        const item = cart.find(i => i.productId === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                db.removeFromCart(productId);
                return;
            }
            localStorage.setItem(DB_KEYS.CART, JSON.stringify(cart));
            window.dispatchEvent(new Event('cart-updated'));
        }
    },
    clearCart: () => {
        localStorage.removeItem(DB_KEYS.CART);
        window.dispatchEvent(new Event('cart-updated'));
    },

    // --- Orders ---
    getOrders: () => JSON.parse(localStorage.getItem(DB_KEYS.ORDERS) || '[]'),
    createOrder: (order) => {
        const orders = db.getOrders();
        order.id = 'ORD-' + Math.floor(Math.random() * 100000);
        order.date = new Date().toISOString();
        order.status = 'Processing';
        orders.unshift(order);
        localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
        db.clearCart();
        return order;
    },
    updateOrderStatus: (id, status) => {
        const orders = db.getOrders();
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = status;
            localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
        }
    },

    // --- Promotions ---
    getPromotions: () => JSON.parse(localStorage.getItem(DB_KEYS.PROMOTIONS) || '[]'),
    checkDiscount: (code) => {
        const promos = db.getPromotions();
        return promos.find(p => p.code === code && p.active);
    },
    savePromotion: (promo) => {
        const promos = db.getPromotions();
        promos.push(promo);
        localStorage.setItem(DB_KEYS.PROMOTIONS, JSON.stringify(promos));
    },
    deletePromotion: (code) => {
        const promos = db.getPromotions().filter(p => p.code !== code);
        localStorage.setItem(DB_KEYS.PROMOTIONS, JSON.stringify(promos));
    }
};

db.init();
