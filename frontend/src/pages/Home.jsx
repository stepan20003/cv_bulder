import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Download, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero.png';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">CVGenie</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
          >
            Create a Professional <span className="text-blue-600">CV</span> in Minutes.
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-lg">
            Build your dream career with our professional CV builder. Beautiful templates, real-time preview, and instant PDF download.
          </p>
          <div className="flex space-x-4">
            <Link to="/register" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg">
              Build My CV Now
            </Link>
            <Link to="/login" className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition">
              View Examples
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={heroImage}
            alt="CV Templates Preview"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </header>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose CVGenie?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layout className="h-8 w-8 text-blue-600" />}
              title="Modern Templates"
              description="Hand-crafted templates designed by HR experts to pass ATS filters."
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-green-600" />}
              title="Live Preview"
              description="See changes instantly as you type. Real-time formatting and layout."
            />
            <FeatureCard
              icon={<Download className="h-8 w-8 text-purple-600" />}
              title="Instant PDF"
              description="Download high-quality PDFs ready for any job application."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
