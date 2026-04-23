import React from 'react';

const ResumeSection = ({ title, children }) => (
  <div style={{
    marginBottom: '60px',
    animation: 'fadeIn 1s ease-out'
  }}>
    <h2 style={{
      color: '#00ff33f0',
      fontSize: '2rem',
      borderBottom: '1px solid #00ff3350',
      paddingBottom: '10px',
      marginBottom: '30px',
      textShadow: '0 0 10px #00ff3380',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    }}>
      {title}
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {children}
    </div>
  </div>
);

const ExperienceItem = ({ role, company, period, details }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid',
        borderColor: isHovered ? '#00ff33f0' : '#00ff3340',
        padding: '24px',
        backgroundColor: isHovered ? 'rgba(0, 255, 51, 0.05)' : 'transparent',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'none',
        boxShadow: isHovered ? '0 10px 30px -10px rgba(0, 255, 51, 0.2)' : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '16px', gap: '10px' }}>
        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.4rem' }}>
          {role} <span style={{ color: '#00ff33f0' }}>@ {company}</span>
        </h3>
        <span style={{ color: '#00ff33a0', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>{period}</span>
      </div>
      <ul style={{ 
        color: '#ccc', 
        lineHeight: '1.6', 
        margin: 0, 
        paddingLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {details.map((detail, idx) => (
          <li key={idx} style={{ paddingLeft: '8px' }}>{detail}</li>
        ))}
      </ul>
    </div>
  );
};

const PublicationItem = ({ title, conference, details }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderLeft: '4px solid',
        borderColor: isHovered ? '#00ff33f0' : '#00ff3340',
        padding: '20px 24px',
        backgroundColor: isHovered ? 'rgba(0, 255, 51, 0.05)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.3s ease',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '1.3rem' }}>{title}</h3>
      <div style={{ color: '#00ff33a0', fontStyle: 'italic', marginBottom: '16px' }}>{conference}</div>
      <ul style={{ color: '#ccc', lineHeight: '1.6', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {details.map((detail, idx) => (
          <li key={idx} style={{ paddingLeft: '8px' }}>{detail}</li>
        ))}
      </ul>
    </div>
  );
};

const ListSection = ({ items }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px'
  }}>
    {items.map((item, idx) => (
      <div key={idx} style={{
        padding: '16px',
        border: '1px solid #00ff3330',
        color: '#ccc',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(90deg, rgba(0,255,51,0.05) 0%, transparent 100%)',
        borderLeft: '2px solid #00ff33a0'
      }}>
        {item}
      </div>
    ))}
  </div>
);

export default function Resume() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: "'JetBrains Mono', monospace" }}>
      
      <ResumeSection title="Experience">
        <ExperienceItem 
          role="Software Engineering Intern" 
          company="BrainMint" 
          period="Oct 2025 - Mar 2026"
          details={[
            "Owned development and deployment of production-grade web and AI features in a fast-paced startup environment",
            "Built and optimized backend services and APIs, improving performance and reliability across releases",
            "Collaborated across frontend, backend, and ML teams to ship features end-to-end within agile sprints"
          ]}
        />
        <ExperienceItem 
          role="Software Engineering Intern" 
          company="Curious Wings" 
          period="Feb 2026"
          details={[
            "Contributed to multiple AI/ML-based projects in an EdTech environment.",
            "Integrated ML models with backend services and assisted in deployment workflows.",
            "Collaborated in debugging, testing, and optimizing system performance.",
            "Worked in a fast-paced setup with parallel project execution."
          ]}
        />
        <ExperienceItem 
          role="Testing Intern" 
          company="Securden Inc." 
          period="Jan 2024"
          details={[
            "Tested and validated Privileged Access Management (PAM) systems used in enterprise environments",
            "Identified security gaps, verified access policies, and improved compliance with industry best practices",
            "Delivered independent test cases, vulnerability analysis, and documentation for production releases"
          ]}
        />
        <ExperienceItem 
          role="Head" 
          company="IEEE TEMS" 
          period="Present"
          details={[
            "Leading and managing a 80+ member cross-functional team to plan and execute technical and management events with 100+ participants.",
            "Owning end-to-end event execution, including project planning, task delegation, timeline management, and stakeholder coordination.",
            "Recently conducted an Startup pitch event called PITCH PERFECT in SRM university with a price pool of 6000/- sponsor such us Indian Overseas Bank and TVS Motors Groups."
          ]}
        />
      </ResumeSection>

      <ResumeSection title="Publications - Springer">
        <PublicationItem 
          title="Real-Time Fabric Defect Detection Using YOLOv10 for Industrial Textile Inspection"
          conference="10th International Conference on Mining Intelligence and Knowledge Exploration MIKE 2025, Amrita Vishwa Vidyapeetham, Chennai"
          details={[
            "Co-authored a Springer conference paper proposing an NMS-free YOLOv10-based real-time textile defect detection system",
            "Achieved 49.1 FPS and mAP of 0.844 on NVIDIA Jetson Orin, enabling high-speed industrial inspection (20–50 m/min)"
          ]}
        />
      </ResumeSection>

      <ResumeSection title="Certificates & Achievements">
        <ListSection items={[
          "Smart India Hackathon 2024 – Top 50 teams nationwide",
          "Springer conference publication (MIKE 2025)",
          "Head of IEEE TEMS – Led 80+ members, executed events with 100+ participant",
          "AWS Certified AI and Cloud Practitioner (CLF-C02) and (AIF-C01)",
          "Building with the Claude API (Anthropic Academy)"
        ]} />
      </ResumeSection>

      <ResumeSection title="Languages">
        <div style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          color: '#fff'
        }}>
          <div style={{ padding: '12px 24px', border: '1px solid #00ff3350', borderRadius: '4px' }}>
            <span style={{ color: '#00ff33f0', marginRight: '8px' }}>English</span> Proficient
          </div>
          <div style={{ padding: '12px 24px', border: '1px solid #00ff3350', borderRadius: '4px' }}>
            <span style={{ color: '#00ff33f0', marginRight: '8px' }}>German</span> A1
          </div>
          <div style={{ padding: '12px 24px', border: '1px solid #00ff3350', borderRadius: '4px' }}>
            <span style={{ color: '#00ff33f0', marginRight: '8px' }}>Tamil</span> Native
          </div>
        </div>
      </ResumeSection>
      
    </div>
  );
}
