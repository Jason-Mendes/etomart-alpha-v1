import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';

function UserProfile() {
    const [userProfile, setUserProfile] = useState({ name: '', email: '', address: '' });
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef).then(docSnap => {
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                ...userProfile,
            });
            alert("Profile updated successfully");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    name="name"
                    value={userProfile.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    name="email"
                    value={userProfile.email}
                    onChange={handleChange}
                    readOnly // Consider making the email read-only if it shouldn't be changed here
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    name="address"
                    value={userProfile.address}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default UserProfile;

