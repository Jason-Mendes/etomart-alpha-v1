import React, { useState, createContext, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

// Simulated auth service
const authService = {
  currentUser: null,
  login: (email, password) => {
    // Simulated login logic
    if (email === "makosaisaac@gmail.com" && password === "Newpassword@12") {
      authService.currentUser = { email };
      return Promise.resolve(authService.currentUser);
    }
    return Promise.reject("Invalid credentials");
  },

  logout: () => {
    authService.currentUser = null;
    return Promise.resolve();
  },
  getCurrentUser: () => authService.currentUser,
};

// Auth context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setUser(user);
  };

  const signup = async (email, password) => {
    const user = await authService.signup(email, password);
    setUser(user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Components
const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-between">
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="text-white">
            Products
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <span className="text-white">{user.email}</span>
            </li>
            <li>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth" className="text-white">
              Login/Signup
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const Home = () => (
  <div className="p-4">
    <h1 className="mb-4 text-2xl font-bold">
      Welcome to Our Grocery Delivery App
    </h1>
    <p>Browse our products and get them delivered to your doorstep!</p>
  </div>
);

const Products = () => {
  const { user } = useAuth();
  const products = [
    { id: 1, name: "Apples", price: 1.99 },
    { id: 2, name: "Bread", price: 2.49 },
    { id: 3, name: "Milk", price: 3.99 },
  ];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Our Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            {product.name} - ${product.price}
            {user && (
              <button className="ml-2 rounded bg-green-500 px-2 py-1 text-white">
                Add to Cart
              </button>
            )}
          </li>
        ))}
      </ul>
      {!user && (
        <p className="mt-4 text-red-500">
          Please log in to add items to your cart.
        </p>
      )}
    </div>
  );
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate("/products");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500"
      >
        {isLogin ? "Need an account? Signup" : "Have an account? Login"}
      </button>
    </div>
  );
};

const LandingPageTest = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

// New Conditional Router Wrapper
const ConditionalRouterWrapper = ({ children }) => {
  try {
    useNavigate();
    // If useNavigate doesn't throw an error, we're already inside a Router
    return <>{children}</>;
  } catch (error) {
    // If useNavigate throws an error, we need to wrap children with Router
    return <Router>{children}</Router>;
  }
};

// Wrapped version of LandingPageTest
const WrappedLandingPageTest = () => {
  return (
    <ConditionalRouterWrapper>
      <LandingPageTest />
    </ConditionalRouterWrapper>
  );
};

export { WrappedLandingPageTest as default, LandingPageTest };