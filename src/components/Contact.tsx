import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import { useInView } from 'react-intersection-observer';
import SendIcon from '@mui/icons-material/Send';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameEmpty = name.trim() === '';
    const isEmailEmpty = email.trim() === '';
    const isMessageEmpty = message.trim() === '';

    setNameError(isNameEmpty);
    setEmailError(isEmailEmpty);
    setMessageError(isMessageEmpty);

    if (!isNameEmpty && !isEmailEmpty && !isMessageEmpty) {
      setIsSubmitting(true);

      const templateParams = {
        name: name,
        message: message,
        time: new Date().toLocaleString(),
      };

      emailjs
        .send(
          'service_p3qeu5s',
          'template_bbwd9bp',
          templateParams,
          'eC1u4sJOKpcfgezqY'
        )
        .then((result) => {
          console.log('EmailJS response:', result);
          setIsSubmitting(false);
          setIsSubmitted(true);
          setName('');
          setEmail('');
          setMessage('');
          
          // Reset success state after 5 seconds
          setTimeout(() => setIsSubmitted(false), 5000);
        })
        .catch((error: any) => {
          console.error('EmailJS send failed:', error);
          setIsSubmitting(false);
          alert('Failed to send message. Please try again.');
        });
    }
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      {/* Background Elements */}
      <div className="contact__bg">
        <div className="contact__grid-pattern" />
        <div className="contact__gradient" />
      </div>

      <div className={`contact__container ${inView ? 'contact__container--visible' : ''}`}>
        {/* Left Side - Info */}
        <div className="contact__info">
          <div className="contact__info-content">
            {/* Label */}
            <span className="contact__label">
              <span className="contact__label-line" />
              Get in Touch
            </span>

            {/* Main Heading */}
            <h2 className="contact__title">
              Let's Create<br />
              Something <em>Remarkable</em>
            </h2>

            {/* Description */}
            <p className="contact__description">
              Have a project in mind or want to explore collaboration opportunities? 
              I'm always excited to discuss new ideas and bring visions to life.
            </p>

            {/* Contact Details */}
            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <EmailOutlinedIcon />
                </div>
                <div className="contact__detail-content">
                  <span className="contact__detail-label">Email</span>
                  <a href="mailto:yassinemabrou3@gmail.com" className="contact__detail-value">
                    yassinemabrou3@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <LocationOnOutlinedIcon />
                </div>
                <div className="contact__detail-content">
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">Morocco</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact__socials">
              <span className="contact__socials-label">Connect</span>
              <div className="contact__socials-links">
                <a 
                  href="https://github.com/YassineMabrou" 
                  target="_blank" 
                  rel="noreferrer"
                  className="contact__social-link"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a 
                  href="https://www.linkedin.com/in/yassinemabrouk1/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="contact__social-link"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="contact__decorative">
              <span className="contact__decorative-year">2024</span>
              <span className="contact__decorative-line" />
              <span className="contact__decorative-text">Available for Projects</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="contact__form-wrapper">
          <form 
            ref={form}
            className="contact__form"
            onSubmit={sendEmail}
            noValidate
          >
            {/* Form Header */}
            <div className="contact__form-header">
              <span className="contact__form-number">01</span>
              <h3 className="contact__form-title">Send a Message</h3>
            </div>

            {/* Name Field */}
            <div className={`contact__field ${focusedField === 'name' ? 'contact__field--focused' : ''} ${nameError ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="contact__field-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
              <span className="contact__field-line" />
              {nameError && <span className="contact__field-error">Please enter your name</span>}
            </div>

            {/* Email Field */}
            <div className={`contact__field ${focusedField === 'email' ? 'contact__field--focused' : ''} ${emailError ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor="email">
                Email / Phone
              </label>
              <input
                type="text"
                id="email"
                className="contact__field-input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
              <span className="contact__field-line" />
              {emailError && <span className="contact__field-error">Please enter your contact info</span>}
            </div>

            {/* Message Field */}
            <div className={`contact__field contact__field--textarea ${focusedField === 'message' ? 'contact__field--focused' : ''} ${messageError ? 'contact__field--error' : ''}`}>
              <label className="contact__field-label" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                className="contact__field-textarea"
                placeholder="Tell me about your project..."
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setMessageError(false);
                }}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              />
              <span className="contact__field-line" />
              {messageError && <span className="contact__field-error">Please enter a message</span>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`contact__submit ${isSubmitting ? 'contact__submit--loading' : ''} ${isSubmitted ? 'contact__submit--success' : ''}`}
              disabled={isSubmitting}
            >
              <span className="contact__submit-content">
                {isSubmitted ? (
                  <>
                    <CheckCircleOutlineIcon />
                    <span>Message Sent!</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <span className="contact__submit-spinner" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <SendIcon />
                  </>
                )}
              </span>
              <span className="contact__submit-bg" />
            </button>

            {/* Form Footer */}
            <p className="contact__form-footer">
              I typically respond within 24 hours
            </p>
          </form>
        </div>
      </div>

      {/* Bottom Section Divider */}
      <div className="contact__footer">
        <span className="contact__footer-line" />
        <span className="contact__footer-text">Yassine Mabrouk © 2024</span>
        <span className="contact__footer-line" />
      </div>
    </section>
  );
}

export default Contact;
