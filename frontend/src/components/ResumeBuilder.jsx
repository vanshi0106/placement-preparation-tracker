import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeBuilder = () => {
  const resumeRef = useRef();
  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      jobTitle: '',
      links: []
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const [activeTab, setActiveTab] = useState('details');
  const [collapsedSections, setCollapsedSections] = useState({
    personalInfo: false,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    certifications: true
  });

  const [editingItems, setEditingItems] = useState({});

  // Helper functions
  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addItem = (section) => {
    const newItem = getEmptyItem(section);
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
    setEditingItems(prev => ({
      ...prev,
      [`${section}-${prev[section]?.length || 0}`]: true
    }));
  };

  const updateItem = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const deleteItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const getEmptyItem = (section) => {
    const templates = {
      education: {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
      },
      experience: {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      },
      projects: {
        name: '',
        description: '',
        technologies: '',
        url: '',
        startDate: '',
        endDate: ''
      },
      certifications: {
        name: '',
        issuer: '',
        date: '',
        url: '',
        description: ''
      },
      skills: {
        category: '',
        items: []
      }
    };
    return templates[section] || {};
  };

  const addLink = () => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        links: [...prev.personalInfo.links, { label: '', url: '' }]
      }
    }));
  };

  const updateLink = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        links: prev.personalInfo.links.map((link, i) => 
          i === index ? { ...link, [field]: value } : link
        )
      }
    }));
  };

  const deleteLink = (index) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        links: prev.personalInfo.links.filter((_, i) => i !== index)
      }
    }));
  };

  const addSkill = (category, skill) => {
    const categoryIndex = resumeData.skills.findIndex(s => s.category === category);
    if (categoryIndex >= 0) {
      updateItem('skills', categoryIndex, 'items', 
        [...resumeData.skills[categoryIndex].items, skill]
      );
    } else {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, { category, items: [skill] }]
      }));
    }
  };

  const downloadPDF = async () => {
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.firstName || 'Resume'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="page">
      <Navbar />
      
      {/* Header */}
      <div className="hackerrank-header">
        <div className="header-content">
          <div className="header-left">
            <div className="breadcrumb">
              <span className="breadcrumb-link">Dashboard</span>
              <span className="breadcrumb-arrow">›</span>
              <span className="breadcrumb-current">Resume Builder</span>
            </div>
            <div className="resume-title-section">
              <h1 className="resume-title">
                {resumeData.personalInfo.firstName || 'Your'}'s Resume
              </h1>
              <div className="resume-status">
                <span className="status-indicator">✓</span>
                <span className="status-text">Updated just now</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <button className="header-btn secondary">Change Template</button>
            <button className="header-btn secondary">📤</button>
            <button className="header-btn secondary">Submit for AI Review</button>
            <button className="header-btn primary" onClick={downloadPDF}>
              Download ▼
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="hackerrank-layout">
        
        {/* Left Sidebar - Form */}
        <div className="form-sidebar">
          
          {/* Tab Navigation */}
          <div className="sidebar-tabs">
            <button 
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Resume Details
            </button>
            <button 
              className={`tab-btn ${activeTab === 'matcher' ? 'active' : ''}`}
              onClick={() => setActiveTab('matcher')}
            >
              Resume Matcher
            </button>
          </div>

          {/* Form Sections */}
          {activeTab === 'details' && (
            <div className="form-sections">
              
              {/* Personal Info Section */}
              <div className="form-section">
                <div 
                  className="section-header"
                  onClick={() => toggleSection('personalInfo')}
                >
                  <div className="section-title">
                    <span className="section-icon">👤</span>
                    <span>Personal Info</span>
                  </div>
                  <span className={`collapse-arrow ${collapsedSections.personalInfo ? 'collapsed' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {!collapsedSections.personalInfo && (
                  <div className="section-content">
                    <div className="form-row">
                      <div className="input-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.firstName}
                          onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                          className="form-input"
                          placeholder="John"
                        />
                      </div>
                      <div className="input-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.lastName}
                          onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                          className="form-input"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="input-group">
                        <label>Email</label>
                        <input
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          className="form-input"
                          placeholder="john.doe@email.com"
                        />
                      </div>
                      <div className="input-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          className="form-input"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="input-group">
                        <label>Address</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.address}
                          onChange={(e) => updatePersonalInfo('address', e.target.value)}
                          className="form-input"
                          placeholder="City, State, Country"
                        />
                      </div>
                      <div className="input-group">
                        <label>Job Title</label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.jobTitle}
                          onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                          className="form-input"
                          placeholder="Software Developer"
                        />
                      </div>
                    </div>

                    <div className="links-section">
                      <div className="links-header">
                        <label>Links ({resumeData.personalInfo.links.length} / 5)</label>
                        {resumeData.personalInfo.links.length < 5 && (
                          <button className="add-link-btn" onClick={addLink}>
                            + Add Link
                          </button>
                        )}
                      </div>
                      
                      {resumeData.personalInfo.links.map((link, index) => (
                        <div key={index} className="link-item">
                          <div className="form-row">
                            <div className="input-group">
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => updateLink(index, 'label', e.target.value)}
                                className="form-input"
                                placeholder="LinkedIn"
                              />
                            </div>
                            <div className="input-group">
                              <input
                                type="url"
                                value={link.url}
                                onChange={(e) => updateLink(index, 'url', e.target.value)}
                                className="form-input"
                                placeholder="https://linkedin.com/in/johndoe"
                              />
                            </div>
                          </div>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteLink(index)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Education Section */}
              <div className="form-section">
                <div 
                  className="section-header"
                  onClick={() => toggleSection('education')}
                >
                  <div className="section-title">
                    <span className="section-icon">🎓</span>
                    <span>Education</span>
                  </div>
                  <span className={`collapse-arrow ${collapsedSections.education ? 'collapsed' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {!collapsedSections.education && (
                  <div className="section-content">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="item-card">
                        <div className="item-header">
                          <h4>{edu.degree || 'New Education'}</h4>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteItem('education', index)}
                          >
                            🗑️
                          </button>
                        </div>
                        
                        <div className="form-row">
                          <div className="input-group">
                            <label>Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateItem('education', index, 'institution', e.target.value)}
                              className="form-input"
                              placeholder="University Name"
                            />
                          </div>
                          <div className="input-group">
                            <label>Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateItem('education', index, 'degree', e.target.value)}
                              className="form-input"
                              placeholder="Bachelor of Science"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="input-group">
                            <label>Field of Study</label>
                            <input
                              type="text"
                              value={edu.field}
                              onChange={(e) => updateItem('education', index, 'field', e.target.value)}
                              className="form-input"
                              placeholder="Computer Science"
                            />
                          </div>
                          <div className="input-group">
                            <label>GPA (Optional)</label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => updateItem('education', index, 'gpa', e.target.value)}
                              className="form-input"
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="input-group">
                            <label>Start Date</label>
                            <input
                              type="text"
                              value={edu.startDate}
                              onChange={(e) => updateItem('education', index, 'startDate', e.target.value)}
                              className="form-input"
                              placeholder="Sep 2020"
                            />
                          </div>
                          <div className="input-group">
                            <label>End Date</label>
                            <input
                              type="text"
                              value={edu.endDate}
                              onChange={(e) => updateItem('education', index, 'endDate', e.target.value)}
                              className="form-input"
                              placeholder="May 2024"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      className="add-section-btn"
                      onClick={() => addItem('education')}
                    >
                      + Add Education
                    </button>
                  </div>
                )}
              </div>

              {/* Experience Section */}
              <div className="form-section">
                <div 
                  className="section-header"
                  onClick={() => toggleSection('experience')}
                >
                  <div className="section-title">
                    <span className="section-icon">💼</span>
                    <span>Experience</span>
                  </div>
                  <span className={`collapse-arrow ${collapsedSections.experience ? 'collapsed' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {!collapsedSections.experience && (
                  <div className="section-content">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="item-card">
                        <div className="item-header">
                          <h4>{exp.position || 'New Experience'}</h4>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteItem('experience', index)}
                          >
                            🗑️
                          </button>
                        </div>
                        
                        <div className="form-row">
                          <div className="input-group">
                            <label>Position</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateItem('experience', index, 'position', e.target.value)}
                              className="form-input"
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div className="input-group">
                            <label>Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateItem('experience', index, 'company', e.target.value)}
                              className="form-input"
                              placeholder="Tech Company"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="input-group">
                            <label>Location</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => updateItem('experience', index, 'location', e.target.value)}
                              className="form-input"
                              placeholder="San Francisco, CA"
                            />
                          </div>
                          <div className="input-group">
                            <label>
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateItem('experience', index, 'current', e.target.checked)}
                              />
                              Currently Working
                            </label>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="input-group">
                            <label>Start Date</label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateItem('experience', index, 'startDate', e.target.value)}
                              className="form-input"
                              placeholder="Jan 2023"
                            />
                          </div>
                          <div className="input-group">
                            <label>End Date</label>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => updateItem('experience', index, 'endDate', e.target.value)}
                              className="form-input"
                              placeholder="Present"
                              disabled={exp.current}
                            />
                          </div>
                        </div>

                        <div className="input-group">
                          <label>Description</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateItem('experience', index, 'description', e.target.value)}
                            className="form-textarea"
                            rows="4"
                            placeholder="• Developed web applications using React and Node.js&#10;• Improved system performance by 40%&#10;• Led team of 3 developers"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      className="add-section-btn"
                      onClick={() => addItem('experience')}
                    >
                      + Add Experience
                    </button>
                  </div>
                )}
              </div>

              {/* Skills Section */}
              <div className="form-section">
                <div 
                  className="section-header"
                  onClick={() => toggleSection('skills')}
                >
                  <div className="section-title">
                    <span className="section-icon">🛠️</span>
                    <span>Skills</span>
                  </div>
                  <span className={`collapse-arrow ${collapsedSections.skills ? 'collapsed' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {!collapsedSections.skills && (
                  <div className="section-content">
                    {resumeData.skills.map((skillGroup, index) => (
                      <div key={index} className="item-card">
                        <div className="item-header">
                          <h4>{skillGroup.category || 'New Skill Category'}</h4>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteItem('skills', index)}
                          >
                            🗑️
                          </button>
                        </div>
                        
                        <div className="input-group">
                          <label>Category</label>
                          <input
                            type="text"
                            value={skillGroup.category}
                            onChange={(e) => updateItem('skills', index, 'category', e.target.value)}
                            className="form-input"
                            placeholder="Programming Languages"
                          />
                        </div>

                        <div className="input-group">
                          <label>Skills (comma-separated)</label>
                          <input
                            type="text"
                            value={skillGroup.items.join(', ')}
                            onChange={(e) => updateItem('skills', index, 'items', 
                              e.target.value.split(',').map(s => s.trim()).filter(s => s)
                            )}
                            className="form-input"
                            placeholder="JavaScript, Python, React, Node.js"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      className="add-section-btn"
                      onClick={() => addItem('skills')}
                    >
                      + Add Skills
                    </button>
                  </div>
                )}
              </div>

              {/* Projects Section */}
              <div className="form-section">
                <div 
                  className="section-header"
                  onClick={() => toggleSection('projects')}
                >
                  <div className="section-title">
                    <span className="section-icon">🚀</span>
                    <span>Projects</span>
                  </div>
                  <span className={`collapse-arrow ${collapsedSections.projects ? 'collapsed' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {!collapsedSections.projects && (
                  <div className="section-content">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="item-card">
                        <div className="item-header">
                          <h4>{project.name || 'New Project'}</h4>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteItem('projects', index)}
                          >
                            🗑️
                          </button>
                        </div>
                        
                        <div className="form-row">
                          <div className="input-group">
                            <label>Project Name</label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateItem('projects', index, 'name', e.target.value)}
                              className="form-input"
                              placeholder="E-commerce Website"
                            />
                          </div>
                          <div className="input-group">
                            <label>URL (Optional)</label>
                            <input
                              type="url"
                              value={project.url}
                              onChange={(e) => updateItem('projects', index, 'url', e.target.value)}
                              className="form-input"
                              placeholder="https://github.com/username/project"
                            />
                          </div>
                        </div>

                        <div className="input-group">
                          <label>Technologies</label>
                          <input
                            type="text"
                            value={project.technologies}
                            onChange={(e) => updateItem('projects', index, 'technologies', e.target.value)}
                            className="form-input"
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>

                        <div className="input-group">
                          <label>Description</label>
                          <textarea
                            value={project.description}
                            onChange={(e) => updateItem('projects', index, 'description', e.target.value)}
                            className="form-textarea"
                            rows="3"
                            placeholder="Brief description of the project and your role"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      className="add-section-btn"
                      onClick={() => addItem('projects')}
                    >
                      + Add Projects
                    </button>
                  </div>
                )}
              </div>

              {/* Certifications Section */}
              <div className="form-section">
                <div 
                  className="section-header"
                  onClick={() => toggleSection('certifications')}
                >
                  <div className="section-title">
                    <span className="section-icon">🏆</span>
                    <span>Certifications</span>
                  </div>
                  <span className={`collapse-arrow ${collapsedSections.certifications ? 'collapsed' : ''}`}>
                    ▼
                  </span>
                </div>
                
                {!collapsedSections.certifications && (
                  <div className="section-content">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="item-card">
                        <div className="item-header">
                          <h4>{cert.name || 'New Certification'}</h4>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteItem('certifications', index)}
                          >
                            🗑️
                          </button>
                        </div>
                        
                        <div className="form-row">
                          <div className="input-group">
                            <label>Certification Name</label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) => updateItem('certifications', index, 'name', e.target.value)}
                              className="form-input"
                              placeholder="AWS Certified Developer"
                            />
                          </div>
                          <div className="input-group">
                            <label>Issuer</label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) => updateItem('certifications', index, 'issuer', e.target.value)}
                              className="form-input"
                              placeholder="Amazon Web Services"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="input-group">
                            <label>Date</label>
                            <input
                              type="text"
                              value={cert.date}
                              onChange={(e) => updateItem('certifications', index, 'date', e.target.value)}
                              className="form-input"
                              placeholder="Mar 2023"
                            />
                          </div>
                          <div className="input-group">
                            <label>URL (Optional)</label>
                            <input
                              type="url"
                              value={cert.url}
                              onChange={(e) => updateItem('certifications', index, 'url', e.target.value)}
                              className="form-input"
                              placeholder="https://certification-url.com"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      className="add-section-btn"
                      onClick={() => addItem('certifications')}
                    >
                      + Add Certifications
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Resume Matcher Tab */}
          {activeTab === 'matcher' && (
            <div className="form-sections">
              <div className="matcher-content">
                <h3>Resume Matcher</h3>
                <p>Upload a job description to get suggestions for improving your resume.</p>
                <textarea
                  className="job-description-input"
                  rows="10"
                  placeholder="Paste the job description here..."
                />
                <button className="analyze-btn">Analyze Match</button>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel - Resume Preview */}
        <div className="resume-preview-panel">
          <div className="preview-container">
            <div ref={resumeRef} className="resume-document">
              
              {/* Resume Header */}
              <div className="resume-header">
                <h1 className="resume-name">
                  {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
                </h1>
                {resumeData.personalInfo.email && (
                  <div className="resume-contact">
                    {resumeData.personalInfo.email}
                    {resumeData.personalInfo.phone && ` | ${resumeData.personalInfo.phone}`}
                    {resumeData.personalInfo.address && ` | ${resumeData.personalInfo.address}`}
                  </div>
                )}
                
                {resumeData.personalInfo.links.length > 0 && (
                  <div className="resume-links">
                    {resumeData.personalInfo.links.map((link, index) => (
                      <span key={index}>
                        {link.label}: {link.url}
                        {index < resumeData.personalInfo.links.length - 1 && ' | '}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Resume Content */}
              <div className="resume-content">
                
                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div className="resume-section">
                    <h2 className="resume-section-title">Education</h2>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="resume-item">
                        <div className="item-header">
                          <div className="item-title">
                            <strong>{edu.degree} {edu.field && `in ${edu.field}`}</strong>
                          </div>
                          <div className="item-date">
                            {edu.startDate} - {edu.endDate}
                          </div>
                        </div>
                        <div className="item-subtitle">
                          {edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div className="resume-section">
                    <h2 className="resume-section-title">Experience</h2>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="resume-item">
                        <div className="item-header">
                          <div className="item-title">
                            <strong>{exp.position}</strong>
                          </div>
                          <div className="item-date">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </div>
                        </div>
                        <div className="item-subtitle">
                          {exp.company} {exp.location && `| ${exp.location}`}
                        </div>
                        {exp.description && (
                          <div className="item-description">
                            {exp.description.split('\n').map((line, i) => (
                              <div key={i}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                  <div className="resume-section">
                    <h2 className="resume-section-title">Skills</h2>
                    {resumeData.skills.map((skillGroup, index) => (
                      <div key={index} className="skill-group">
                        <strong>{skillGroup.category}:</strong> {skillGroup.items.join(', ')}
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                  <div className="resume-section">
                    <h2 className="resume-section-title">Projects</h2>
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="resume-item">
                        <div className="item-header">
                          <div className="item-title">
                            <strong>{project.name}</strong>
                            {project.url && (
                              <span className="project-url"> | {project.url}</span>
                            )}
                          </div>
                        </div>
                        {project.technologies && (
                          <div className="item-subtitle">
                            <strong>Technologies:</strong> {project.technologies}
                          </div>
                        )}
                        {project.description && (
                          <div className="item-description">
                            {project.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications */}
                {resumeData.certifications.length > 0 && (
                  <div className="resume-section">
                    <h2 className="resume-section-title">Certifications</h2>
                    {resumeData.certifications.map((cert, index) => (
                      <div key={index} className="resume-item">
                        <div className="item-header">
                          <div className="item-title">
                            <strong>{cert.name}</strong>
                          </div>
                          <div className="item-date">{cert.date}</div>
                        </div>
                        <div className="item-subtitle">
                          {cert.issuer}
                          {cert.url && (
                            <span className="cert-url"> | {cert.url}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
