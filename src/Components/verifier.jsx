import React, { useEffect, useState } from "react";
import { auth } from "../Services/firebase";
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import axios from "axios";

const Verifier = () => {
    const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [error, setError] = useState('');

  // Function to validate university email
  const isUniversityEmail = (email) => {
    // Replace with your university domain
    return email.endsWith('@cuchd.in');
  };

  // Send verification email
  const sendVerificationEmail = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    if (!isUniversityEmail(email)) {
      setError('Please use your university email address');
      return;
    }

    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setVerificationSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  // Check if the user is coming back from email verification
  React.useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          
          // Get the user ID token
          return result.user.getIdToken();
        })
        .then((idToken) => {
          // Send the token to your backend
          return axios.post('http://localhost:8000/api/verify-university-email', {
            idToken,
            email
          });
        })
        .then(() => {
          setVerificationComplete(true);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, []);

  if (verificationComplete) {
    return (
      <div className="verification-success">
        <h2>Email Verified Successfully!</h2>
        <p>Your university email has been verified. You can now access the placement portal.</p>
      </div>
    );
  }

  return (
    <div className="email-verification">
      <h2>University Email Verification</h2>
      
      {verificationSent ? (
        <div className="verification-sent">
          <p>Verification link has been sent to {email}.</p>
          <p>Please check your email and click on the verification link.</p>
        </div>
      ) : (
        <form onSubmit={sendVerificationEmail}>
          <div className="form-group">
            <label htmlFor="email">University Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@university.edu"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="verify-button">
            Send Verification Link
          </button>
        </form>
      )}
    </div>
  );
};

export default Verifier;