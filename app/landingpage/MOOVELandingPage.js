import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaChartLine, FaUsers, FaLaptopCode, FaSearch, FaBrain, FaGlobe, FaMicrochip, FaExternalLinkAlt, FaUserPlus, FaClipboardCheck, FaUserShield, FaBalanceScale, FaHandshake } from 'react-icons/fa';
import { BsChatDots, BsController, BsClock } from 'react-icons/bs';
import LoginModal from '@/app/login/loginModal';
import SignUpModal from '@/app/login/moove4bait-signup';
import ModifyStudent from '@/components/students/ModifyStudent';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { Box, Container, Text, HStack, useColorModeValue, Tooltip} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Route } from 'lucide-react';


const NavLink = ({ href, children }) => (
  <a href={href} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
    {children}
  </a>
);

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Button_ = ({ children, primary = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full transition-colors duration-300 ${
      primary
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-white text-blue-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const JourneyStep = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <Icon className="h-8 w-8 text-blue-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);


const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">{children}</h2>
);

const FeatureCard = ({ iconSrc, title, description }) => (
  <div className="flex flex-col items-center text-center mb-12">
    <img src={iconSrc} alt={title} className="w-40 h-40 mb-10 object-contain" />
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 max-w-sm">{description}</p>
  </div>
);

const InfoCard = ({ icon: Icon, title, description }) => (
  <div className="flex items-start mb-8">
    <Icon className="w-8 h-8 mr-4 text-blue-600 flex-shrink-0" />
    <div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const EthicalPoint = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 mb-6">
    <div className="flex-shrink-0">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const MOOVELandingPage = () => {

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/assets/logos/moove4bait.svg" 
              alt="MOOVE4BAIT Logo" 
              className="h-8 w-auto"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#what-is-moove">About</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
          </div>
          <div className="flex space-x-4">
            <Button_ onClick={onLoginOpen}>Log In</Button_>
            <Button_ primary  onClick={onSignUpOpen}>Sign Up</Button_>

            <LoginModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        onSignUpOpen={onSignUpOpen} 
        initialRef={initialRef}
        finalRef={finalRef}
        title="Login"
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={onSignUpClose}
        onOpen={onSignUpOpen}
        initialRef={initialRef}
        finalRef={finalRef}
        title="Sign Up"
        isNewUser = {true}
      />
          </div>
        </div>
      </nav>

      
      {/* Hero Section */}
<motion.section 
  className="relative"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <img 
    src="\assets\images\hero-banner.webp" 
    alt="AI in Healthcare" 
    className="w-full h-auto max-h-[60vh] object-cover" 
  />
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-6 md:px-8">
    <motion.div 
      className="text-center text-white"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
        Unmasking AI Bias in Healthcare
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-8">
        Join MOOVE: Embark on a revolutionary learning experience that prepares you for the future of medicine.
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button_ 
          primary 
          className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4" 
          onClick={onSignUpOpen}
        >
          Get Started
        </Button_>
      </motion.div>
    </motion.div>
  </div>
</motion.section>

{/* Features Section */}
<section id="features" className="py-20">
  <div className="container mx-auto px-6">
    <SectionTitle>Features</SectionTitle>
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {[
        {
          iconSrc: "\\assets\\images\\bait.svg",
          title: "Bait Check",
          description: "Engage in real-world scenarios to identify AI biases. Input prompts, analyze AI responses, and vote on which output shows more bias."
        },
        {
          iconSrc: "\\assets\\images\\collab.svg",
          title: "Collaborative Learning Groups",
          description: "Join forces with your peers in customized study groups. Tackle complex bias detection challenges together and learn from diverse perspectives."
        },
        {
          iconSrc: "\\assets\\images\\dashboard.svg",
          title: "Personalized Learning Dashboard",
          description: "Track your progress, access tailored learning materials, and receive feedback on your bias detection skills."
        },
        {
          iconSrc: "\\assets\\images\\system-prompt.svg",
          title: "System Prompts",
          description: "Experience how biases can subtly influence AI outputs. Access curated prompts designed to explore various aspects of AI bias in medical contexts."
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <FeatureCard
            iconSrc={feature.iconSrc}
            title={feature.title}
            description={feature.description}
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* What is MOOVE? Section */}
<section id="what-is-moove" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
  <div className="container mx-auto px-6">
    <motion.h2 
      className="text-3xl md:text-4xl font-bold text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      What is MOOVE?
    </motion.h2>
    <motion.p 
      className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      MOOVE (Massive Open Online Validation & Evaluation) is a groundbreaking collaborative platform where medical professionals unite to align AI with real-world medical standards. It facilitates transparent, community-driven expert validation of open-source medical AI models on a massive scale.
    </motion.p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white p-8 rounded-full shadow-lg">
          <img src="\assets\logos\LOGO_MOOVE_B.svg" alt="MOOVE Icon" className="w-64 h-64" />
        </div>
      </motion.div>
      <div className="space-y-6">
        {[
          { icon: FaSearch, title: "Transparent Validation", description: "Unlike commercial AI models, MOOVE focuses on accessible open-source medical AI, ensuring transparency in the validation process." },
          { icon: FaChartLine, title: "Beyond Accuracy", description: "MOOVE's evaluations go beyond simple accuracy metrics, assessing contextual appropriateness, empathy, and alignment with diverse clinical settings." },
          { icon: FaGlobe, title: "Global Collaboration", description: "The platform brings together medical experts worldwide, fostering a rich, diverse pool of knowledge and experiences." },
          { icon: FaMicrochip, title: "Meditron Integration", description: "MOOVE works with Meditron, a suite of state-of-the-art open medical Large Language Models (LLMs), trained on expert-curated medical literature and global clinical guidelines." }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          >
            <FeatureItem icon={item.icon} title={item.title} description={item.description} />
          </motion.div>
        ))}
      </div>
    </div>
    <motion.div 
      className="text-center mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.a 
        href="https://jointhemoove.org/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Visit MOOVE</span>
        <FaExternalLinkAlt className="ml-2" />
      </motion.a>
    </motion.div>
  </div>
</section>
        {/* Adapting moove4bait Section */}
    <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
        <SectionTitle >MOOVE4BAIT: Adapting MOOVE for Education</SectionTitle>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            MOOVE-4-BAIT is a specialized adaptation of the MOOVE platform, tailored for students enrolled in the Biases in AI Usages and Testing (BAIT) course. 
            This educational version maintains the core principles of MOOVE while providing a structured learning environment for students to explore AI biases in healthcare.
          </p>

          <h3 className="text-2xl font-bold text-center mb-8">How It Works: Your MOOVE4BAIT Journey</h3>
          
          {/* Placeholder for animation */}
          <div className="bg-gray-200 p-8 rounded-lg mb-12 text-center">
            [Animation Placeholder: Journey Steps]
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <JourneyStep 
              icon={FaUserPlus}
              title="Sign Up and Create Your Profile"
              description="Create your MOOVE4BAIT account, complete the student consent form, and customize your profile with your academic background and interests."
            />
            <JourneyStep 
              icon={FaUsers}
              title="Join a Collaborative Learning Group"
              description="Connect with peers from diverse backgrounds, form interdisciplinary teams, and engage in group discussions and projects."
            />
            <JourneyStep 
              icon={FaClipboardCheck}
              title="Engage with AI Bias Detection Exercises"
              description="Access the Bait Check feature to analyze AI responses, participate in real-world scenarios, and contribute to improving AI alignment with medical standards."
            />
            <JourneyStep 
              icon={FaChartLine}
              title="Track Your Progress"
              description="Monitor your contributions and skill development, view your dashboard for performance metrics, and earn badges and certifications as you advance."
            />
          </div>

      

          <p className="text-center text-gray-700 mt-8 mb-12">
            
          </p>

          <div className="text-center">
          <button 
          onClick={onLoginOpen} // Open login modal
          className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold"
        >
          MOOVE-4-BAIT
        </button>
          </div>
        </div>
      </section>

      {/* Responsible Use and Consent Section */}

      <section id="responsible-use" className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Responsible Use and Consent</h2>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            As we explore biases in AI and healthcare, it's crucial that all participants engage responsibly and ethically with the MOOVE4BAIT platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <EthicalPoint 
              icon={FaUserShield}
              title="Student Consent"
              description="All students are required to agree to our terms of use, which emphasize integrity and responsible engagement with the platform."
            />
            <EthicalPoint 
              icon={FaBalanceScale}
              title="Ethical Conduct"
              description="While exploring biases, maintain professional conduct. Avoid extreme or inappropriate content that could be harmful or offensive."
            />
            <EthicalPoint 
              icon={FaHandshake}
              title="Collaborative Respect"
              description="Respect diverse viewpoints and experiences. Engage in constructive dialogue to foster a positive learning environment."
            />
            <EthicalPoint 
              icon={FaClipboardCheck}
              title="Content Moderation"
              description="Our platform includes moderation to ensure content aligns with educational goals and ethical standards."
            />
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">Our Commitment</h3>
            <p className="text-gray-700 text-center">
              MOOVE4BAIT is committed to providing a safe, ethical, and educational environment. We continuously monitor and improve our platform to ensure it serves its educational purpose while maintaining the highest ethical standards.
            </p>
          </div>

          <p className="text-center text-gray-600 mt-8">
            By participating in MOOVE4BAIT, you agree to uphold these principles and contribute to a respectful, insightful learning experience for all.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to shape the future of AI in healthcare?</h2>
          <p className="text-xl mb-8">Join MOOVE today and become a leader in ethical AI application in medicine.</p>
          <Button_ onClick={onSignUpOpen}>Sign Up Now</Button_>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <Tooltip label="Yale University" hasArrow>
              <img src="/assets/logos/yale..png" alt="Yale University" className="h-16 object-contain" />
            </Tooltip>
            <Tooltip label="EPFL" hasArrow>
              <img src="/assets/logos/epfl..png" alt="EPFL" className="h-16 object-contain" />
            </Tooltip>
            <Tooltip label="MOOVE" hasArrow>
              <img src="/assets/logos/moove_h.svg" alt="MOOVE" className="h-16 object-contain" />
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Box as="footer" bg={useColorModeValue('gray.100', 'gray.900')} py={8}>
        <Container maxW="container.xl">
          <Text textAlign="center" fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            &copy; 2024 MOOVE4BAIT. All rights reserved.
          </Text>
          <HStack justify="center" spacing={4} mt={4}>
            <Link href="/PrivacyPolicy" passHref >
              <Text as="a" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                Privacy Policy
              </Text>
            </Link>
            <Link href="/TermsOfUse" passHref >
              <Text as="a" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                Terms of Use
              </Text>
            </Link>
            <Tooltip
        label={
          <>
            <Text><strong>Address:</strong> 100 College StNew Haven, CT 06510</Text>
          </>
        }
        placement="top"
        hasArrow
        bg="gray.700"
        color="white"
      >
        <Text as="a" color="blue.500" _hover={{ textDecoration: 'underline' }}>
          Contact Us
        </Text>
      </Tooltip>
            {/* <Text color={useColorModeValue('gray.600', 'gray.400')}>|</Text>
            <Link href="/terms-of-service" passHref>
              <Text as="a" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                Terms of Service
              </Text>
            </Link>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>|</Text>
            <Link href="/contact" passHref>
              <Text as="a" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                Contact Us
              </Text>
            </Link> */}
          </HStack>
        </Container>
      </Box>
    </div>
  );
}

export default MOOVELandingPage;
