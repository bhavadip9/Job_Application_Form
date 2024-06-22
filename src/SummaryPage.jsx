import { useLocation } from 'react-router-dom';

const SummaryPage = () => {
    const location = useLocation();
    const { formData } = location.state;

    return (
        <div className="container">
            <h1>Application Summary</h1>
            <p><strong>Full Name:</strong> {formData.fullName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            <p><strong>Position:</strong> {formData.position}</p>
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>
            {formData.position === 'Designer' && (
                <p><strong>Portfolio URL:</strong> {formData.portfolioUrl}</p>
            )}
            {formData.position === 'Manager' && (
                <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
            )}
            <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
            <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
        </div>
    );
};

export default SummaryPage;
