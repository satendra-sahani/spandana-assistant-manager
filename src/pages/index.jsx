'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'


const BackgroundAnimation = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial size
      const updateWindowSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      updateWindowSize();
      window.addEventListener('resize', updateWindowSize);

      return () => {
        window.removeEventListener('resize', updateWindowSize);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            borderRadius: '50%',
            background: `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`,
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          animate={{
            x: [
              Math.random() * windowSize.width,
              Math.random() * windowSize.width,
              Math.random() * windowSize.width,
            ],
            y: [
              Math.random() * windowSize.height,
              Math.random() * windowSize.height,
              Math.random() * windowSize.height,
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};


const SkillBar = ({ skill, level }) => {
  const barRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: barRef,
    offset: ["start end", "end start"]
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="mb-6" ref={barRef}>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-indigo-700">{skill}</span>
        <span className="text-sm font-medium text-indigo-700">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{ scaleX, transformOrigin: "left" }}
        />
      </div>
    </div>
  )
}

const ExperienceCard = ({ title, company, period, description }) => (
  <motion.div
    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
    whileHover={{ scale: 1.03 }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-2xl font-semibold mb-2 text-indigo-600">{title}</h3>
    <p className="text-indigo-500 mb-4">{company} | {period}</p>
    <ul className="list-disc list-inside space-y-2 text-gray-700">
      {description.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </motion.div>
)

const AchievementCard = ({ title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold mb-2 text-indigo-600">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
)

const ProjectCard = ({ title, period, association, description }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold mb-2 text-indigo-600">{title}</h3>
    <p className="text-indigo-500 mb-2">{period}</p>
    <p className="text-gray-600 mb-2">{association}</p>
    <p className="text-gray-700">{description}</p>
  </motion.div>
)

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, 300])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    // Here you would typically send this data to your server or a third-party service
    console.log('Form submitted:', { name, email, message })

    // Show a success message (you might want to implement a proper toast notification system)
    alert('Thank you for your message. I\'ll get back to you soon!')

    // Reset the form
    event.currentTarget.reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800 overflow-x-hidden">
      <Head>
        <title>Spandana Kunder - Supply Chain Specialist</title>
        <meta name="description" content="Spandana Kunder - Assistant Manager and Supply Chain Specialist with expertise in Planning & Forecasting, Inventory & Logistics Optimization" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackgroundAnimation />

      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-indigo-600 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 relative z-10"
      >
        <header className="h-screen flex flex-col justify-center items-center relative mb-16">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: yPosAnim }}
          >
            <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#93C5FD" d="M39.5,-65.3C50.2,-56.7,57.7,-44.3,62.7,-31.1C67.7,-17.9,70.3,-3.9,68.1,9.2C65.9,22.3,59,34.5,49.8,44.3C40.6,54.1,29.1,61.5,16.3,65.6C3.6,69.7,-10.4,70.4,-23.3,66.7C-36.2,62.9,-47.9,54.7,-56.8,43.7C-65.7,32.7,-71.8,18.9,-73.7,4.1C-75.5,-10.7,-73.2,-26.5,-65.8,-38.8C-58.4,-51.1,-46,-59.9,-33.3,-67C-20.6,-74,-10.3,-79.3,2,-82.3C14.3,-85.3,28.7,-74,39.5,-65.3Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
          <motion.img
            src="https://media.licdn.com/dms/image/v2/C5603AQF2bYUyjc9dLQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1622442273125?e=1741824000&v=beta&t=Mw0k2zlS_xK5kjSZGS51kJfbAkVViuWV91QMC7wPEE8"
            alt="Spandana Kunder"
            className="rounded-full w-48 h-48 object-cover shadow-2xl z-10 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-indigo-800 tracking-tight text-center z-10"
          >
            Spandana Kunder
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl text-indigo-600 font-light mb-8 text-center z-10"
          >
            Assistant Manager | Supply Chain Specialist
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="Spandana_Kunder_Resume.docx"
              download
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold border-2 border-indigo-600 hover:bg-indigo-100 transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </header>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="text-lg leading-relaxed mb-6 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mb-4">
              Experienced Assistant Manager with over 3 years of expertise in supply chain management, specializing in material planning, inventory control, and logistics optimization. Adept at managing large-scale operations, including overseeing material planning for 150+ drone productions, cost reduction on procurement, and achieving a 98% on-time delivery rate for international shipments.
            </p>
            <p className="mb-4">
              Recognized for expanding vendor relationships with 50+ global suppliers, implementing SAP ERP systems, and driving process improvements that enhance efficiency and reduce costs. Awarded the Spotlight Employee and Gold Medal in MBA Aviation Management, reflecting my dedication to excellence and innovation in supply chain operations.
            </p>
            <p className="mb-4">
              Proficient in SAP ERP, Power BI, and advanced supply chain analytics, with strong leadership, teamwork, and problem-solving skills. Open to remote opportunities and relocation, ready to deliver impactful solutions and foster growth in dynamic, fast-paced environments.
            </p>
            <p>
              My passion for supply chain excellence is driven by a deep understanding of industry best practices and a commitment to continuous improvement. I leverage my skills in SAP ERP, advanced analytics, and cross-functional team leadership to drive efficiency and innovation in supply chain operations.
            </p>
          </motion.div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Key Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <SkillBar skill="Supply Chain Management" level={95} />
            <SkillBar skill="Inventory Planning" level={90} />
            <SkillBar skill="Logistics Optimization" level={88} />
            <SkillBar skill="SAP ERP" level={85} />
            <SkillBar skill="Procurement" level={92} />
            <SkillBar skill="Demand Planning" level={87} />
            <SkillBar skill="Cost Reduction Strategies" level={89} />
            <SkillBar skill="Vendor Management" level={86} />
            <SkillBar skill="Data Analysis" level={84} />
            <SkillBar skill="Project Management" level={88} />
            <SkillBar skill="Risk Management" level={82} />
            <SkillBar skill="Lean Six Sigma" level={80} />
            <SkillBar skill="Communication" level={92} />
            <SkillBar skill="Negotiation" level={88} />
            <SkillBar skill="Leadership" level={85} />
            <SkillBar skill="Teamwork" level={90} />
          </div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Professional Experience
          </motion.h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <ExperienceCard
              title="Assistant Manager Supply Chain"
              company="AEREO"
              period="Oct 2024 - Present"
              description={[
                "Lead end-to-end Supply Chain Planning, ensuring optimal material flow and cost-effectiveness across multiple product lines.",
                "Implement advanced procurement strategies, resulting in a 15% reduction in material costs and improved supplier relationships.",
                "Oversee inventory control measures, improving stock turnover by 20% and reducing carrying costs by 12%.",
                "Manage logistics operations, achieving a 98% on-time delivery rate for international shipments and reducing transportation costs by 10%.",
                "Collaborate with cross-functional teams to align supply chain strategies with overall business objectives, resulting in improved operational efficiency.",
                "Develop and implement KPIs to monitor supply chain performance, leading to data-driven decision-making and continuous improvement initiatives.",
                "Lead a team of 10 supply chain professionals, fostering a culture of innovation and excellence."
              ]}
            />
            <ExperienceCard
              title="Executive- Material Management & Planning"
              company="AEREO"
              period="Mar 2022 - Oct 2024"
              description={[
                "Managed end-to-end Supply Chain Planning for the company, ensuring timely and cost-effective material flow of goods and services with Procurement, Inventory control, and Logistics management.",
                "Managed material planning for 150+ drone productions, optimizing inventory levels and reducing stockouts by 35%.",
                "Implemented cost reduction strategies, saving the company over $500,000 annually through strategic sourcing and negotiations.",
                "Expanded vendor relationships with 50+ global suppliers, improving supply chain resilience and reducing lead times by 25%.",
                "Spearheaded the implementation of SAP ERP system, enhancing operational efficiency by 30% and improving data accuracy.",
                "Conducted regular demand forecasting and analysis, resulting in a 15% improvement in forecast accuracy.",
                "Developed and implemented standard operating procedures (SOPs) for material management, ensuring consistency and quality across operations.",
                "Collaborated with R&D and production teams to optimize product designs for manufacturability and supply chain efficiency."
              ]}
            />
            <ExperienceCard
              title="Market Research Intern"
              company="GMR GOA INTERNATIONAL AIRPORT"
              period="Nov 2021 - Jan 2022"
              description={[
                "Conducted market research and analysis for airport operations and services.",
                "Developed analytical skills and gained insights into the aviation industry.",
                "Assisted in preparing Request for Information (RFI) documents.",
                "Contributed to market knowledge and understanding of airport business dynamics."
              ]}
            />
            <ExperienceCard
              title="Aviation Manager"
              company="AirCrews Aviation Pvt Ltd"
              period="Jun 2021 - Jul 2021"
              description={[
                "Gained hands-on experience in aviation management practices.",
                "Assisted in training and development programs for aviation personnel.",
                "Contributed to project management initiatives within the aviation sector.",
                "Developed skills in team management and leadership in an aviation context."
              ]}
            />
            <ExperienceCard
              title="Graduate Engineer"
              company="Bosch India"
              period="Aug 2018 - Aug 2019"
              description={[
                "Managed TRAVIS Web and Mobile app development with master data creation, testing, survey, analysis, and management which lead to the project being successfully deployed in 20+ Bosch warehouses across India.",
                "Established and maintained accurate inventory records within the SAP ERP system, ensuring optimal stock levels while minimizing stockouts by planning on stock management.",
                "Conducted regular inventory audits and reconciliations to identify discrepancies and maintain data accuracy.",
                "Gained experience in logistics management, maintenance and repair, and production support.",
                "Developed skills in material handling, inventory control, and project coordination."
              ]}
            />
          </div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Education & Certifications
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">MBA in Aviation Management</h3>
              <p className="text-indigo-500 mb-2">Jain (Deemed-to-be University) | 2020 - 2022</p>
              <p className="text-gray-700">Gold Medalist | GPA: 3.9/4.0</p>
              <p className="mt-2 text-gray-600">Specialized in Aviation Supply Chain Management and Logistics</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>Thesis: "Optimizing Drone Supply Chains: A Case Study on Cost Reduction and Efficiency Improvement"</li>
                <li>Led a team project on implementing blockchain in aviation supply chains</li>
                <li>Participated in multiple industry conferences on emerging supply chain technologies</li>
                <li>Demonstrated leadership and organizational skills by actively contributing to the vibrant college community by volunteering as part of the organizing team for the college fest Parichay.</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Bachelor of Engineering - BE, Mechanical Engineering</h3>
              <p className="text-indigo-500 mb-2">RNS Institute of Technology - India | 2014 - 2018</p>
              <p className="text-gray-700">Activities and societies:</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                <li>1st place in the Mechanical Yantra fest for the Project Groundnut Harvesting Machine which reduced time consumption significantly in separating groundnut pods from the plants effectively.</li>
                <li>Developed skills in teamwork and project planning</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Supply Chain Management Specialization</h3>
              <p className="text-indigo-500 mb-2">Rutgers University | Dec 2024</p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Supply Chain Operations</li>
                <li>Supply Chain Planning</li>
                <li>Supply Chain Sourcing</li>
                <li>Supply Chain Logistics</li>
              </ul>
              <p className="mt-2 text-gray-600">Completed capstone project on optimizing global supply chain networks</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">Additional Certifications</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>SAP Material Management Power User (SAP PARTNER - EME EDUCATION, Sep 2020)</li>
                <li>Aviation Management- Ground/ Cabin Crew (Udemy, May 2021)</li>
                <li>Product Management First Steps (LinkedIn, May 2021)</li>
                <li>Supply Chain Foundations (LinkedIn, May 2021)</li>
                <li>Certified Listener - Level 1 (Listening Inn, Apr 2021)</li>
                <li>Introduction to Ayurveda (PRANA ACADEMY LIMITED, Oct 2020)</li>
                <li>Microsoft Excel- Excel from Beginner to Advanced (Udemy, Aug 2020)</li>
                <li>Powerpoint- Impactful Microsoft Powerpoint Presentation (Udemy, Aug 2020)</li>
                <li>Certified Yoga Instructor (S-Vyasa Yoga Instructor Course, Nov 2019)</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Key Projects
          </motion.h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <ProjectCard
              title="Numerical Analysis of Heat Transfer Enhancement of Circular Tube Bank Fin Heat Exchanger with Vortex Generators"
              period="Jun 2018 - Aug 2018"
              association="Associated with RNS Institute of Technology - India"
              description="A study was done to increase the heat transfer rate in a heat exchanger using a vortex generator of a circular tube bank fin heat exchanger. Project carried under the guidance of Dr. Prakash S Kulkarni, Indian Institute of Science, Bengaluru."
            />
            <ProjectCard
              title="Design and Fabrication of a RC Nitro Aircraft"
              period="Jan 2018 - Feb 2018"
              association="Associated with RNS Institute of Technology - India"
              description="Completed the intensive workshop on design & fabrication of an RC Nitro Aircraft held by HLI Model Sport in RNSIT, Bengaluru."
            />
            <ProjectCard
              title="Groundnut Harvesting Machine"
              period="Mar 2017 - May 2017"
              association="Associated with RNS Institute of Technology - India"
              description="Designed and fabricated a machine to remove the groundnut pods from the plant effectively without breaking the seeds and also reduced time consumption. Won first place in Mini Project Expo held by Mech Radiance in RNSIT, Bengaluru."
            />
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-2 text-indigo-600">Supply Chain Optimization for Drone Production</h3>
              <p className="text-gray-700 mb-4">Led a cross-functional team to optimize the supply chain for drone production, resulting in:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>30% reduction in lead time for critical components</li>
                <li>20% improvement in inventory turnover</li>
                <li>15% decrease in overall production costs</li>
                <li>Implementation of a just-in-time inventory system</li>
                <li>Development of a supplier scorecard system to enhance vendor performance</li>
                <li>Integration of IoT devices for real-time tracking of high-value components</li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-2 text-indigo-600">Global Logistics Network Redesign</h3>
              <p className="text-gray-700 mb-4">Spearheaded a project to redesign the company's global logistics network, achieving:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>40% reduction in international shipping costs</li>
                <li>25% improvement in on-time delivery performance</li>
                <li>Establishment of strategic partnerships with 3 new global logistics providers</li>
                <li>Implementation of real-time tracking system for all international shipments</li>
                <li>Development of a risk management framework for supply chain disruptions</li>
                <li>Creation of a centralized control tower for end-to-end visibility</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Achievements & Recognition
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AchievementCard
              title="Spotlight Employee of the Year 2023"
              description="Recognized for outstanding contributions to supply chain optimization and cost reduction initiatives."
            />
            <AchievementCard
              title="Gold Medalist in MBA Aviation Management"
              description="Awarded for academic excellence and outstanding performance in the MBA program at Jain (Deemed-to-be University)."
            />
            <AchievementCard
              title="Supply Chain Management Specialization"
              description="Successfully completed the comprehensive specialization from Rutgers University, covering key areas such as Supply Chain Operations, Planning, Sourcing, and Logistics."
            />
            <AchievementCard
              title="First Place in Mechanical Yantra Fest"
              description="Won first place for the Groundnut Harvesting Machine project, which significantly reduced time in separating groundnut pods from plants."
            />
          </div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Professional Affiliations
          </motion.h2>
          <div className="space-y-4 max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700">
              • Member, Council of Supply Chain Management Professionals (CSCMP)
            </p>
            <p className="text-lg text-gray-700">
              • Associate, Chartered Institute of Procurement & Supply (CIPS)
            </p>
            <p className="text-lg text-gray-700">
              • Member, Institute for Supply Management (ISM)
            </p>
            <p className="text-lg text-gray-700">
              • Member, Association for Supply Chain Management (ASCM)
            </p>
          </div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Languages
          </motion.h2>
          <div className="space-y-4 max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700">English (Native or bilingual proficiency)</p>
            <p className="text-lg text-gray-700">Hindi (Native or bilingual proficiency)</p>
            <p className="text-lg text-gray-700">Kannada (Native or bilingual proficiency)</p>
            <p className="text-lg text-gray-700">Korean (Elementary proficiency)</p>
          </div>
        </section>

        <section id="contact" className="mb-16">
          <motion.h2
            className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h2>
          <motion.div
            className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </section>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-16 bg-indigo-700 text-white py-12 rounded-xl"
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-4">Spandana Kunder</h2>
            <p className="text-xl mb-6">Supply Chain Specialist | MBA Gold Medalist</p>
            <div className="flex justify-center space-x-4 mb-6">
              <a href="https://linkedin.com/in/spandanakunder" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/spandanakunder" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 10 10 0 01-2.658-.102c-.76-.145-1.54-.24-2.327-.284a10 10 0 01-2.532.335A10 10 0 019.9 5.8a10 10 0 01-2.358-.87 10 10 0 01-1.184-.645 10 10 0 01-2.86-.12 10 10 0 01-2.8-.742 10 10 0 01-1.194-.748 10 10 0 01-.793-.593 10 10 0 01-.528-.485 10 10 0 01-.238-.245c-.212-.28-.382-.59-.504-.92a10 10 0 01-.23-.872 10 10 0 01-.088-.748 10 10 0 01.018-.97 10 10 0 01.4-1.83c.236-.724.558-1.415.962-2.056a10 10 0 011.372-1.845 10 10 0 011.76-1.556 10 10 0 012.157-1.196 10 10 0 012.468-.608 10 10 0 012.69.08 10 10 0 012.786.87 10 10 0 011.872 1.234 10 10 0 011.798 2.098 10 10 0 01.972 2.42 10 10 0 01.226 2.68 10 10 0 01-.378 2.6 10 10 0 01-.97 2.316 10 10 0 01-1.452 1.89 10 10 0 01-1.82 1.334 10 10 0 01-2.092.714 10 10 0 01-2.25.192 10 10 0 01-2.264-.384 10 10 0 01-2.018-.934 10 10 0 01-1.61-1.41A10 10 0 012.32 9.84a10 10 0 01-.62-2.074 10 10 0 01-.112-2.227 10 10 0 01.384-2.18 10 10 0 01.87-1.98 10 10 0 011.304-1.67 10 10 0 011.666-1.248 10 10 0 011.95-.728 10 10 0 012.14-.166 10 10 0 012.232.46 10 10 0 011.864 1.12 10 10 0 011.408 1.665 10 10 0 01.878 2.047 10 10 0 01.308 2.32"/>
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact</h3>
                <p>Email: spandana.kunder@example.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p>Bengaluru, Karnataka, India</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                <ul>
                  <li><a href="#about" className="hover:text-indigo-200">About</a></li>
                  <li><a href="#experience" className="hover:text-indigo-200">Experience</a></li>
                  <li><a href="#projects" className="hover:text-indigo-200">Projects</a></li>
                  <li><a href="#contact" className="hover:text-indigo-200">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-indigo-600">
              <p>&copy; 2025 Spandana Kunder. All rights reserved.</p>
            </div>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  )
}

