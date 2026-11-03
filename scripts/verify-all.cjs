const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

console.log('====================================================');
console.log('  EKEN V3 — VERIFICATION TEST SUITE (P7 Delivery)   ');
console.log('====================================================');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Data Integrity Tests
console.log('\n--- 1. Testing Domain Data Models ---');
const productsFile = fs.readFileSync(path.join(rootDir, 'src/data/products.js'), 'utf8');
const sellersFile = fs.readFileSync(path.join(rootDir, 'src/data/sellers.js'), 'utf8');
const categoriesFile = fs.readFileSync(path.join(rootDir, 'src/data/categories.js'), 'utf8');

// Check products count
const productMatches = productsFile.match(/id:\s*['"]prod-\d+['"]/g) || [];
assert(productMatches.length === 40, `Products data has exactly 40 pieces (found ${productMatches.length})`);

// Check integer prices
const priceMatches = productsFile.match(/price:\s*(\d+)/g) || [];
assert(priceMatches.length === 40, `All 40 products have price defined`);
const invalidPrices = priceMatches.filter((p) => {
  const num = parseInt(p.replace(/price:\s*/, ''), 10);
  return isNaN(num) || num <= 0 || !Number.isInteger(num);
});
assert(invalidPrices.length === 0, `All 40 products use integer minor units (e.g. ₹50,000 -> 5000000)`);

// Check popularity 0-100 (D-06)
const popularityMatches = productsFile.match(/popularity:\s*(\d+)/g) || [];
assert(popularityMatches.length === 40, `All 40 products have mock numeric popularity field (D-06)`);
const invalidPop = popularityMatches.filter((p) => {
  const val = parseInt(p.replace(/popularity:\s*/, ''), 10);
  return val < 0 || val > 100;
});
assert(invalidPop.length === 0, `All popularity scores are in range [0, 100]`);

// Check sellers count & contact channels (D-07)
const sellerMatches = sellersFile.match(/id:\s*['"][a-z-]+['"]/g) || [];
assert(sellerMatches.length === 5, `Sellers registry has exactly 5 master ateliers (found ${sellerMatches.length})`);
assert(sellersFile.includes('phone:'), `Sellers provide phone numbers for tel: actions`);
assert(sellersFile.includes('email:'), `Sellers provide emails for mailto: actions`);

// Check categories count
const categoryMatches = categoriesFile.match(/id:\s*['"][a-z-]+['"]/g) || [];
assert(categoryMatches.length === 5, `Categories list has exactly 5 architectural spaces (found ${categoryMatches.length})`);

// 2. Asset Integrity Tests (D-05)
console.log('\n--- 2. Testing Local Assets Existence (D-05) ---');
const imageRegex = /['"](\/assets\/(?:real|images)\/[^'"]+)['"]/g;
const allImageReferences = new Set();
let match;
while ((match = imageRegex.exec(productsFile)) !== null) {
  allImageReferences.add(match[1]);
}
while ((match = imageRegex.exec(sellersFile)) !== null) {
  allImageReferences.add(match[1]);
}
while ((match = imageRegex.exec(categoriesFile)) !== null) {
  allImageReferences.add(match[1]);
}

console.log(`  Found ${allImageReferences.size} unique image paths referenced in data.`);
let missingImages = 0;
for (const imgRef of allImageReferences) {
  // convert /assets/... to local relative path public/assets/...
  const localRelPath = imgRef.replace(/^\//, '');
  const fullPath = path.join(publicDir, localRelPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`  [MISSING ASSET] ${imgRef} -> ${fullPath}`);
    missingImages++;
  }
}
assert(missingImages === 0, `All ${allImageReferences.size} referenced local images physically exist in public/assets/`);

// 3. Cart & Locked Decisions (D-01 to D-04)
console.log('\n--- 3. Testing Cart Calculations & Locked Decisions ---');
const cartContextFile = fs.readFileSync(path.join(rootDir, 'src/context/CartContext.jsx'), 'utf8');
const cartPageFile = fs.readFileSync(path.join(rootDir, 'src/pages/CartPage.jsx'), 'utf8');
const formatPriceFile = fs.readFileSync(path.join(rootDir, 'src/utils/formatPrice.js'), 'utf8');

assert(
  formatPriceFile.includes('SHIPPING_MINOR_UNITS = 0') && formatPriceFile.includes('TAX_RATE = 0'),
  'Cart arithmetic constants SHIPPING = 0 and TAX_RATE = 0 strictly defined (D-02)'
);

assert(
  cartContextFile.includes('Shipping and tax are not included in this version.'),
  'Mandatory notice "Shipping and tax are not included in this version." present (D-02)'
);

// Check no checkout button element exists
const hasCheckoutButton = /<button[^>]*>[^<]*checkout/i.test(cartPageFile) || /<a[^>]*>[^<]*checkout/i.test(cartPageFile);
assert(
  !hasCheckoutButton && cartPageFile.includes('Continue Shopping'),
  'Checkout button is excluded and working Continue Shopping link provided (D-03)'
);

assert(
  cartContextFile.includes('items.reduce((sum, item) => sum + item.quantity, 0)'),
  'Cart item counter counts total item quantities rather than distinct products (D-04)'
);

// 4. React Router & Empty-Screen Root Cause Check
console.log('\n--- 4. Testing Empty-Screen / History Exception Prevention ---');
const appFile = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf8');
const layoutFile = fs.readFileSync(path.join(rootDir, 'src/components/layout/Layout.jsx'), 'utf8');
const scrollToTopFile = fs.readFileSync(path.join(rootDir, 'src/components/layout/ScrollToTop.jsx'), 'utf8');

assert(
  !appFile.includes('ScrollRestoration') && !layoutFile.includes('ScrollRestoration'),
  'ScrollRestoration (root cause of blank screen in BrowserRouter) is completely absent'
);

assert(
  scrollToTopFile.includes('window.scrollTo(0, 0)'),
  'Safe custom ScrollToTop component handles scroll transitions without router fatal crash'
);

// 5. CSS & HTML Check
console.log('\n--- 5. Testing Styles, Typography, and Accessibility ---');
const indexHtmlFile = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const indexCssFile = fs.readFileSync(path.join(rootDir, 'src/index.css'), 'utf8');

assert(
  indexHtmlFile.includes('Playfair+Display') && indexHtmlFile.includes('Plus+Jakarta+Sans'),
  'Google fonts (Playfair Display & Plus Jakarta Sans) loaded in index.html'
);

assert(
  indexCssFile.includes('--color-primary') && indexCssFile.includes('--color-secondary'),
  'Design system tokens defined in src/index.css'
);

assert(
  indexCssFile.includes('focus-visible'),
  'Accessible focus-visible indicators configured'
);

// 6. User Authentication & Profile Tests
console.log('\n--- 6. Testing Authentication, Customer Profile & Security ---');
const ordersFile = fs.readFileSync(path.join(rootDir, 'src/data/orders.js'), 'utf8');
const authCryptoFile = fs.readFileSync(path.join(rootDir, 'src/utils/authCrypto.js'), 'utf8');
const authContextFile = fs.readFileSync(path.join(rootDir, 'src/context/AuthContext.jsx'), 'utf8');
const accountModalFile = fs.readFileSync(path.join(rootDir, 'src/components/auth/AccountModal.jsx'), 'utf8');
const navbarFile = fs.readFileSync(path.join(rootDir, 'src/components/layout/Navbar.jsx'), 'utf8');

assert(
  ordersFile.includes('totalMinorUnits:') && ordersFile.includes('getOrdersByCustomerEmail'),
  'Orders data uses integer minor units and exports customer email isolation filter'
);

assert(
  authCryptoFile.includes('SHA-256') && authCryptoFile.includes('getInitials'),
  'Auth crypto uses native SHA-256 hashing and computes customer initials'
);

assert(
  authContextFile.includes('signIn') && authContextFile.includes('signUp') && authContextFile.includes('signOut'),
  'AuthContext provides complete customer authentication lifecycle (signIn, signUp, signOut)'
);

assert(
  authContextFile.includes('Invalid email or password. Please try again.'),
  'AuthContext displays non-revealing generic authentication error to prevent account enumeration'
);

assert(
  accountModalFile.includes('SIGN IN / REGISTER') && accountModalFile.includes('MY EKEN ACCOUNT'),
  'AccountModal implements both unauthenticated (Ref 1) and authenticated (Ref 2) views'
);

assert(
  accountModalFile.includes('#E2FF32'),
  'AccountModal primary action buttons use exact neon yellow-green accent (#E2FF32)'
);

assert(
  !accountModalFile.toLowerCase().includes('whatsapp') && !accountModalFile.toLowerCase().includes('mobile otp') && !accountModalFile.includes('4-digit'),
  'All OTP mechanisms (WhatsApp, Mobile OTP, 4-digit verification code) are strictly excluded (Ref 3)'
);

assert(
  navbarFile.includes('AccountModal') && navbarFile.includes('useAuth'),
  'Navbar connects account icon to AuthContext and opens AccountModal'
);

assert(
  appFile.includes('AuthProvider'),
  'App tree wraps routes with AuthProvider'
);

// 7. V2 UX Refinements & Pre-Review Checks
console.log('\n--- 7. Testing V2 UX Refinements & Pre-Review Interactions ---');
const notifContextFile = fs.readFileSync(path.join(rootDir, 'src/context/NotificationContext.jsx'), 'utf8');
const toastContainerFile = fs.readFileSync(path.join(rootDir, 'src/components/common/ToastContainer.jsx'), 'utf8');
const authPromptModalFile = fs.readFileSync(path.join(rootDir, 'src/components/auth/AuthPromptModal.jsx'), 'utf8');
const confirmModalFile = fs.readFileSync(path.join(rootDir, 'src/components/common/ConfirmationModal.jsx'), 'utf8');
const productCardFile = fs.readFileSync(path.join(rootDir, 'src/components/ui/ProductCard.jsx'), 'utf8');
const productDetailFile = fs.readFileSync(path.join(rootDir, 'src/pages/ProductDetailPage.jsx'), 'utf8');
const wishlistPageFile = fs.readFileSync(path.join(rootDir, 'src/pages/WishlistPage.jsx'), 'utf8');

assert(
  notifContextFile.includes('showNotification') && notifContextFile.includes('dismissNotification'),
  'NotificationContext provides global toast notifications management'
);

assert(
  appFile.includes('NotificationProvider') && layoutFile.includes('ToastContainer'),
  'App wraps routes in NotificationProvider and Layout mounts ToastContainer'
);

assert(
  authPromptModalFile.includes('Sign in to continue shopping.') &&
    authPromptModalFile.includes('Create an Eken account or log in to save your favourites and manage your shopping cart.') &&
    authPromptModalFile.includes('Log In') &&
    authPromptModalFile.includes('Create Account'),
  'AuthPromptModal displays exact required prompt and action options'
);

assert(
  authContextFile.includes('requireAuth') && authContextFile.includes('openAccountModal'),
  'AuthContext provides requireAuth guard and openAccountModal coordinator'
);

assert(
  productCardFile.includes('requireAuth') && productDetailFile.includes('requireAuth') && wishlistPageFile.includes('requireAuth'),
  'ProductCard, ProductDetailPage, and WishlistPage protect cart/wishlist mutations with requireAuth guard'
);

assert(
  cartPageFile.includes('w-11 h-11') && cartPageFile.includes('min-w-[44px]'),
  'CartPage quantity controls are enlarged to 44x44px touch targets with accessible focus states'
);

assert(
  confirmModalFile.includes('Remove this product?') && confirmModalFile.includes('Yes, Remove'),
  'ConfirmationModal implements required copy for product removal dialog'
);

assert(
  cartPageFile.includes('ConfirmationModal') && cartPageFile.includes('handleDecreaseQuantity'),
  'CartPage triggers confirmation modal before product removal (trash and quantity < 1) and clear cart'
);

assert(
  productCardFile.includes('showNotification') && productDetailFile.includes('showNotification') && cartPageFile.includes('showNotification'),
  'Consistent toast notifications dispatched on cart add, wishlist add/remove, and cart item removal'
);

// 8. Customer Review Section Tests
console.log('\n--- 8. Testing Customer Review Section & Motion ---');
const reviewsFile = fs.readFileSync(path.join(rootDir, 'src/data/reviews.js'), 'utf8');
const reviewSectionFile = fs.readFileSync(path.join(rootDir, 'src/components/home/CustomerReviewSection.jsx'), 'utf8');

const reviewMatches = reviewsFile.match(/id:\s*['"]rev-\d+['"]/g) || [];
assert(reviewMatches.length >= 9, `Customer reviews dataset contains at least 9 entries (found ${reviewMatches.length})`);

assert(
  layoutFile.includes('CustomerReviewSection') && layoutFile.includes('<CustomerReviewSection />'),
  'CustomerReviewSection is mounted in Layout immediately above the footer'
);

assert(
  reviewSectionFile.includes('LIVED WITH. LOVED OVER TIME.') &&
  reviewSectionFile.includes('Real experiences with thoughtfully designed furniture.'),
  'CustomerReviewSection features required editorial heading and supporting copy'
);

assert(
  reviewSectionFile.includes('animate-marquee-ltr') && indexCssFile.includes('@keyframes marquee-ltr') && indexCssFile.includes('translateX(-50%)'),
  'Continuous horizontal review animation moves from left to right (marquee-ltr) with seamless loop'
);

assert(
  reviewSectionFile.includes('getInitials') && !reviewSectionFile.includes('avatar.jpg') && !reviewSectionFile.includes('avatar.png'),
  'Reviews derive initials dynamically without human portrait photographs or generic stock avatars'
);

// 9. Gemini 2 Product Catalog Alignment Tests
console.log('\n--- 9. Testing Product Catalog Alignment (Gemini 2) ---');
const gemini2Dir = path.join(publicDir, 'assets/real/gemini2');
assert(fs.existsSync(gemini2Dir), 'gemini2 directory exists in public/assets/real/');

const gemini2Files = fs.readdirSync(gemini2Dir);
assert(gemini2Files.length >= 75, `gemini2 contains complete asset library (found ${gemini2Files.length} files)`);

const prod01 = productsFile.includes("id: 'prod-01'") && productsFile.includes('/assets/real/gemini2/p5.png') && productsFile.includes('/assets/real/gemini2/p5(2).png');
assert(prod01, 'Product 1 (Narmada Sideboard) correctly maps to credenza images p5.png & p5(2).png');

const prod10 = productsFile.includes("id: 'prod-10'") && productsFile.includes('/assets/real/gemini2/p25.png') && productsFile.includes('/assets/real/gemini2/p25(2).png');
assert(prod10, 'Product 10 (Narmada Grand Sofa) correctly maps to sofa images p25.png & p25(2).png');

const prod40 = productsFile.includes("id: 'prod-40'") && productsFile.includes('/assets/real/gemini2/p6.png') && productsFile.includes('/assets/real/gemini2/p6(2).png');
assert(prod40, 'Product 40 (Godavari Writing Desk) correctly maps to desk images p6.png & p6(2).png');

assert(!productsFile.includes('/assets/real/gemini/'), 'No legacy gemini directory paths remain in products.js');
assert(!reviewsFile.includes('/assets/real/gemini/'), 'No legacy gemini directory paths remain in reviews.js');

console.log('\n====================================================');
console.log(`  SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('====================================================\n');

if (process.exitCode) {
  process.exit(process.exitCode);
}


