import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aiAnimation from "../assets/ai.json";
import { BsArrowRight } from "react-icons/bs";
import {
  FaRocket,
  FaSearch,
  FaFileAlt,
  FaBrain,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#020c1b] text-white font-sans min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col-reverse md:flex-row justify-center items-center text-center md:text-left px-6 md:px-20">
        {/* Background Lottie Animation (only in Hero Section) */}
        <div className="absolute inset-0 z-10 flex justify-center items-center">
          <Lottie
            animationData={aiAnimation}
            loop
            autoplay
            className="w-full h-full opacity-40"
          />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-10 max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#64ffda] mb-6">
            AI Tax Document Parser
          </h1>
          <p className="text-lg md:text-2xl opacity-90 mb-6">
            <span className="text-[#52e0c4] font-semibold">
              Extract insights,{" "}
            </span>
            <span className="text-[#64ffda] font-semibold">
              verify compliance,{" "}
            </span>
            <span className="text-[#52e0c4] font-semibold">
              and analyze financial documents effortlessly.
            </span>
          </p>
          <motion.button
            className="flex items-center gap-2 mt-4 bg-[#64ffda] text-[#0a192f] font-bold px-6 py-3 rounded-full text-lg shadow-xl hover:bg-[#52e0c4] hover:scale-105 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/upload")}
          >
            Upload & Parse Now <BsArrowRight size={20} />
          </motion.button>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="py-28 px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-[#64ffda] mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          What We Do
        </motion.h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Our AI-powered system processes tax returns, bank statements, and
          other financial documents, extracting critical details like{" "}
          <span className="text-[#64ffda]">
            income, deductions, and compliance insights
          </span>
          . With built-in AI compliance checks, we ensure accuracy and provide
          optimization recommendations.
        </p>
      </section>

      {/* How It Works Section */}
      <section className="py-28 px-6 text-center bg-[#112240]">
        <motion.h2
          className="text-4xl font-bold text-[#64ffda] mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              icon: <FaFileAlt size={40} />,
              title: "Upload Your Document",
              description:
                "Upload PDFs, bank statements, or tax files securely.",
            },
            {
              icon: <FaBrain size={40} />,
              title: "AI Extraction & Analysis",
              description:
                "Our AI extracts key financial data and entities automatically.",
            },
            {
              icon: <FaShieldAlt size={40} />,
              title: "Compliance & Insights",
              description:
                "We validate your document for compliance and provide optimization suggestions.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="p-6 bg-[#0a192f] border border-gray-600 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="text-[#64ffda] mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#64ffda] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-28 px-6 text-center bg-[#0a192f]">
        <motion.h2
          className="text-4xl font-bold text-[#64ffda] mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaRocket size={40} />,
              title: "Fast AI Processing",
              description: "AI-powered analysis within seconds.",
            },
            {
              icon: <FaSearch size={40} />,
              title: "High Accuracy",
              description: "Advanced models ensure precise data extraction.",
            },
            {
              icon: <FaChartLine size={40} />,
              title: "Smart Compliance",
              description: "Built-in compliance checks and optimization.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 bg-[#112240] border border-gray-600 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="text-[#64ffda] mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#64ffda] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 pb-8">
        <p>
          © {new Date().getFullYear()} AI Tax Parser |{" "}
          <a
            href="https://github.com/gayatrik26"
            className="text-[#64ffda] hover:underline"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
