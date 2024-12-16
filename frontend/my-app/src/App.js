import React from 'react';
import SignIn from './components/LoginForm'; // LoginForm component
import SignUp from './components/SignupForm'; // SignupForm component

function App() {
  return (
    <div
      // Main container with full height and centered content
      style={{
        background: 'linear-gradient(to bottom,rgb(97, 121, 164),rgb(141, 144, 149))', // White background
        height: '100vh', // Full height of the viewport
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        margin: 0, // No margin around the body
      }}
    >
     <h1 style={{ color: 'black', marginBottom: '5%', textAlign: 'center', marginTop: '5%' }}>
        Authentication App
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '5%' }}>
        <div
>
          <SignUp />
        </div>
        <div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}

export default App;
