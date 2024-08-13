import React from 'react';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  heading1: {
    textAlign: 'center',
    color: '#2c5282',
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  heading2: {
    color: '#2c5282',
    fontSize: '1.8rem',
    marginTop: '30px',
    marginBottom: '15px',
    borderBottom: '2px solid #edf2f7',
    paddingBottom: '10px',
  },
  paragraph: {
    marginBottom: '15px',
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '15px',
  },
  listItem: {
    marginBottom: '10px',
  },
};

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading1}>Privacy Policy</h1>

      <p style={styles.paragraph}>Last updated: [12th August,2024]</p>

      <p style={styles.paragraph}>
        Welcome to MOOVE4BAIT. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully.
      </p>

      <h2 style={styles.heading2}>1. Information We Collect</h2>
      <p style={styles.paragraph}>
        We collect information that you voluntarily provide to us when you register on our site, subscribe to our newsletter, or interact with our services. This may include:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
        <li style={styles.listItem}><strong>Usage Data:</strong> IP address, browser type, pages visited, etc.</li>
        <li style={styles.listItem}><strong>Cookies and Tracking Technologies:</strong> We use cookies to track user activity and enhance your experience.</li>
      </ul>

      <h2 style={styles.heading2}>2. How We Use Your Information</h2>
      <p style={styles.paragraph}>
        We use the information we collect in the following ways:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>To provide, operate, and maintain our website and services.</li>
        <li style={styles.listItem}>To improve, personalize, and expand our services.</li>
        <li style={styles.listItem}>To understand and analyze how you use our site.</li>
        <li style={styles.listItem}>To communicate with you, including sending updates and promotional materials.</li>
        <li style={styles.listItem}>To process transactions and manage your orders.</li>
      </ul>

      <h2 style={styles.heading2}>3. How We Share Your Information</h2>
      <p style={styles.paragraph}>
        We may share your information with:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Third-Party Service Providers:</strong> Who assist us in operating our website and conducting business.</li>
        <li style={styles.listItem}><strong>Business Transfers:</strong> In the event of a merger, acquisition, or asset sale.</li>
        <li style={styles.listItem}><strong>Legal Requirements:</strong> If required by law or to protect our rights and safety.</li>
      </ul>

      <h2 style={styles.heading2}>4. Your Rights and Choices</h2>
      <p style={styles.paragraph}>
        You have the following rights regarding your information:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Access:</strong> You can request access to your personal data.</li>
        <li style={styles.listItem}><strong>Correction:</strong> You can request that we correct any inaccuracies in your data.</li>
        <li style={styles.listItem}><strong>Deletion:</strong> You can request that we delete your personal data.</li>
        <li style={styles.listItem}><strong>Opt-Out:</strong> You can opt out of receiving promotional emails from us.</li>
      </ul>

      <h2 style={styles.heading2}>5. Security of Your Information</h2>
      <p style={styles.paragraph}>
        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
      </p>

      <h2 style={styles.heading2}>6. Changes to This Privacy Policy</h2>
      <p style={styles.paragraph}>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our site. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2 style={styles.heading2}>7. Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Address:</strong>100 College StNew Haven, CT 06510</li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;