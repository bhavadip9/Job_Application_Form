import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const Application = () => {
    const [formData, setFromData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: [],
        preferredInterviewTime: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let updateSkill = [...formData.additionalSkills];
        if (checked) {
            updateSkill.push(name);
        } else {
            updateSkill = updateSkill.filter((skill) => skill !== name);
        }
        setFromData({
            ...formData,
            additionalSkills: updateSkill,
        });
    };

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+91[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateTime = (datetime) => {
        const timePart = datetime.split('T')[1];
        return timePart !== undefined;
    };

    const validateUrl = (url) => {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    };



    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName) {
            newErrors.fullName = "Full Name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid Email Format";
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "Phone Number is required";
        } else if (!validatePhoneNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = "Invalid Phone Number Format";
        }

        if (!formData.position) {
            newErrors.position = "Position is required";
        }

        if ((formData.position === 'Developer' || formData.position === 'Designer') && !formData.relevantExperience) {
            newErrors.relevantExperience = "Relevant Experience is required";
        } else if ((formData.position === 'Developer' || formData.position === 'Designer') && (isNaN(formData.relevantExperience) || Number(formData.relevantExperience) <= 0)) {
            newErrors.relevantExperience = "Relevant Experience must be a number greater than 0";
        }

        if (formData.position === 'Designer' && !formData.portfolioUrl) {
            newErrors.portfolioUrl = "Portfolio URL is required";
        } else if (formData.position === 'Designer' && !validateUrl(formData.portfolioUrl)) {
            newErrors.portfolioUrl = "Enter a valid URL";
        }

        if (formData.position === 'Manager' && !formData.managementExperience) {
            newErrors.managementExperience = "Management Experience is required";
        }

        if (!formData.additionalSkills.length) {
            newErrors.additionalSkills = "At least one skill is required";
        }

        if (!formData.preferredInterviewTime) {
            newErrors.preferredInterviewTime = "Preferred Interview Time is required";
        } else if (!validateTime(formData.preferredInterviewTime)) {
            newErrors.preferredInterviewTime = "Enter a valid date and time";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            navigate('/summary', { state: { formData } });
            console.log(formData)
        } else {
            console.log("Form is not submitted");

        }
    };

    const { position } = formData;
    return (
        <div className="container">
            <h1>Job Application Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label className='labelsize'>Full Name</Form.Label>
                    <Form.Control type='text'
                        className='inputbox'
                        name='fullName'
                        value={formData.fullName}
                        placeholder='Enter The Full Name '
                        onChange={handleChange}
                    />
                    {errors.fullName && <span className="error">{errors.fullName}</span>}
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className='labelsize'>Email</Form.Label>
                    <Form.Control type='email'
                        className='inputbox'
                        name='email'
                        value={formData.email}
                        placeholder='Enter The Email '
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className='labelsize'>Phone Number</Form.Label>
                    <Form.Control type='tel'
                        className='inputbox'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        placeholder='Enter The phone number'
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className='labelsize'>Applying for Position</Form.Label>
                    {errors.position && <span className="error">{errors.position}</span>}
                    <Form.Select size="lg" className='selectbox' name="position" value={formData.position} onChange={handleChange}>
                        <option className='selectbox' value="Developer">Developer</option>
                        <option className='selectbox' value="Designer">Designer</option>
                        <option className='selectbox' value="Manager">Manager</option>
                    </Form.Select>
                </Form.Group>
                {(position === 'Developer' || position === 'Designer') && (
                    <Form.Group className="form-group">
                        <Form.Label className='labelsize'>Relevant Experience (Years):</Form.Label>
                        <Form.Control type='number'
                            name='relevantExperience'
                            value={formData.relevantExperience}
                            placeholder='Enter The Experience(Years) '
                            className='inputbox'
                            onChange={handleChange}
                        />
                        {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
                    </Form.Group>
                )}
                {(position === 'Designer') && (
                    <Form.Group className="form-group">
                        <Form.Label className='labelsize'>Portfolio URL:</Form.Label>
                        <Form.Control type='url'
                            name='portfolioUrl'
                            value={formData.portfolioUrl}
                            placeholder='Enter The Portfolio URL'
                            className='inputbox'
                            onChange={handleChange}
                        />
                        {errors.portfolioUrl && <span className="error">{errors.portfolioUrl}</span>}
                    </Form.Group>
                )}
                {(position === 'Manager') && (
                    <Form.Group className="form-group">
                        <Form.Label className='labelsize'>Management Experience:</Form.Label>
                        <Form.Control type='number'
                            name='managementExperience'
                            value={formData.managementExperience}
                            placeholder='Enter The Experience'
                            className='inputbox'
                            onChange={handleChange}
                        />
                        {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
                    </Form.Group>
                )}
                <div className="form-group">
                    <Form.Label className='labelsize'>Additional Skills</Form.Label>
                    {errors.additionalSkills && <span className="error">{errors.additionalSkills}</span>}
                    <label>
                        <input type='checkbox'
                            className='agecheckbox'
                            name="Python"
                            checked={formData.additionalSkills.includes('Python')}
                            onChange={handleCheckboxChange}
                        />
                        Python
                    </label>
                    <label>
                        <input type='checkbox'
                            className='agecheckbox'
                            name="JavaScript"
                            checked={formData.additionalSkills.includes('JavaScript')}
                            onChange={handleCheckboxChange} />
                        JavaScript
                    </label>
                    <label>
                        <input type='checkbox'
                            className='agecheckbox'
                            name="CSS"
                            checked={formData.additionalSkills.includes('CSS')}
                            onChange={handleCheckboxChange} />
                        CSS
                    </label>
                </div>
                <Form.Group className="form-group">
                    <Form.Label className='labelsize'>Preferred Interview Time</Form.Label>
                    <Form.Control type='datetime-local'
                        name="preferredInterviewTime"
                        value={formData.preferredInterviewTime}
                        onChange={handleChange}
                        className='inputbox'
                    />
                    {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
                </Form.Group>
                <div className="button-container">
                    <Button type='submit'>Submit</Button>
                </div>
            </Form>
        </div>
    );
};

export default Application;

