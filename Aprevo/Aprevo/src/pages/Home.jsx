import React from 'react';
import bgVideo from '../assets/img/fv1.mp4';
import HomeNav from '../Components/HomeNav';

const Home = () => {
  return (
    <div style={styles.wrapper}>
      <HomeNav />
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div style={styles.content}>
        <h1 style={styles.heading}>𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 𝔸𝕡𝕣𝕖𝕧𝕠</h1>
        <p style={styles.subtext}>Manage flight safety with confidence</p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    fontFamily: 'Segoe UI, sans-serif',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    zIndex: 2,
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  buttons: {
    display: 'flex',
    gap: '12px',
  },
  btn: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #0d6efd, #0069d9)',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(255,255,255,0.3)',
    transition: '0.3s',
  },
  content: {
    flex: 1,
    zIndex: 2,
    position: 'relative',
    textAlign: 'center',
    paddingTop: '15vh',
    color: '#fff',
    textShadow: '2px 2px 4px #000',
  },
  heading: {
    fontSize: '2.8rem',
    marginBottom: '16px',
  },
  subtext: {
    fontSize: '1.2rem',
  }
};

export default Home;
