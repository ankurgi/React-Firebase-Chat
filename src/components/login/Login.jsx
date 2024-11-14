import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; // Import necessary Firestore functions
 
 
const Login = () => {
  const DEFAULT_AVATAR_URL = "https://i.pravatar.cc/150?img=2"; // Fixed avatar URL for all users
  const [loading, setLoading] = useState(false);
 
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
 
    const { username, email, password } = Object.fromEntries(formData);
 
    // VALIDATE INPUTS
    if (!username || !email || !password) {
      toast.warn("Please enter all required inputs!");
      setLoading(false);
      return;
    }
 
    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      toast.warn("Select another username");
      setLoading(false);
      return;
    }
 
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
 
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: DEFAULT_AVATAR_URL, // Use fixed avatar URL
        id: res.user.uid,
        blocked: [],
      });
 
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
 
      toast.success("Account created! You can login now!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
 
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            disabled // Disable the upload input as it's not needed
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};
 
export default Login;
 