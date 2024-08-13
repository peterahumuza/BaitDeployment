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

const TermsOfUse = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading1}>Terms of Use</h1>

      <p style={styles.paragraph}>Last updated: [12th August,2024]</p>

      <h2 style={styles.heading2}>1. Acceptance of Terms</h2>
      <p style={styles.paragraph}>
        By accessing and using the MOOVE4BAIT platform, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use this platform.
      </p>

      <h2 style={styles.heading2}>2. Responsible Use and Consent</h2>
      <p style={styles.paragraph}>
        As we explore biases in AI and healthcare, it is crucial that all participants engage responsibly and ethically with the MOOVE4BAIT platform. By using the platform, you consent to follow these guidelines:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Student Consent:</strong> All students are required to agree to our terms of use, which emphasize integrity and responsible engagement with the platform.</li>
        <li style={styles.listItem}><strong>Ethical Conduct:</strong> While exploring biases, maintain professional conduct. Avoid extreme or inappropriate content that could be harmful or offensive.</li>
        <li style={styles.listItem}><strong>Collaborative Respect:</strong> Respect diverse viewpoints and experiences. Engage in constructive dialogue to foster a positive learning environment.</li>
        <li style={styles.listItem}><strong>Content Moderation:</strong> Our platform includes moderation to ensure content aligns with educational goals and ethical standards.</li>
      </ul>

      <h2 style={styles.heading2}>3. User Responsibilities</h2>
      <p style={styles.paragraph}>
        You are responsible for your use of the platform and agree not to misuse it. This includes, but is not limited to:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}>Not engaging in any activity that could harm the platform, its users, or its content.</li>
        <li style={styles.listItem}>Not attempting to access unauthorized areas of the platform or its servers.</li>
        <li style={styles.listItem}>Not using the platform to engage in any illegal activity or violate any laws.</li>
        <li style={styles.listItem}>Not sharing your account details with others or using another user's account without permission.</li>
      </ul>

      <h2 style={styles.heading2}>4. Intellectual Property</h2>
      <p style={styles.paragraph}>
        All content on the MOOVE4BAIT platform, including text, images, logos, and software, is the intellectual property of MOOVE4BAIT or its licensors and is protected by copyright and other intellectual property laws. You may not use, copy, or distribute any content without explicit permission.
      </p>

      <h2 style={styles.heading2}>5. Termination</h2>
      <p style={styles.paragraph}>
        MOOVE4BAIT reserves the right to suspend or terminate your access to the platform at any time, without notice, if you violate these Terms of Use or engage in any behavior that could harm the platform or its users.
      </p>

      <h2 style={styles.heading2}>6. Disclaimer of Warranties</h2>
      <p style={styles.paragraph}>
        The MOOVE4BAIT platform is provided "as is" without any warranties of any kind, either express or implied. We do not guarantee that the platform will be available at all times, secure, or free from errors or viruses.
      </p>

      <h2 style={styles.heading2}>7. Limitation of Liability</h2>
      <p style={styles.paragraph}>
        In no event shall MOOVE4BAIT or its affiliates be liable for any damages, including but not limited to, direct, indirect, incidental, punitive, and consequential damages, arising from your use of the platform.
      </p>

      <h2 style={styles.heading2}>7. Governing Law</h2>
      <p style={styles.paragraph}>
        These Terms of Use shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms shall be resolved in the courts of the United States.
      </p>

      <h2 style={styles.heading2}>9. Changes to Terms</h2>
      <p style={styles.paragraph}>
        MOOVE4BAIT reserves the right to update these Terms of Use at any time. We will notify you of any changes by posting the new Terms of Use on our platform. Your continued use of the platform after any changes constitutes your acceptance of the new terms.
      </p>

      <h2 style={styles.heading2}>10. Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions about these Terms of Use, please contact us at:
      </p>
      <ul style={styles.list}>
        <li style={styles.listItem}><strong>Address:</strong>100 College StNew Haven, CT 06510</li>
      </ul>
    </div>
  );
};

export default TermsOfUse;
