import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
// import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate fields
    const isNameEmpty = name.trim() === '';
    const isEmailEmpty = email.trim() === '';
    const isMessageEmpty = message.trim() === '';

    setNameError(isNameEmpty);
    setEmailError(isEmailEmpty);
    setMessageError(isMessageEmpty);

    if (!isNameEmpty && !isEmailEmpty && !isMessageEmpty) {
      // EmailJS (optional)
      /*
      const templateParams = {
        name,
        email,
        message,
      };

      emailjs
        .send('service_id', 'template_id', templateParams, 'api_key')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        })
        .catch((error) => {
          console.log('FAILED...', error);
        });

      setName('');
      setEmail('');
      setMessage('');
      */

      console.log('Form ready to send:', { name, email, message });
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>

          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={sendEmail}
          >
            <div className="form-flex">
              <TextField
                required
                fullWidth
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? 'Please enter your name' : ''}
              />

              <TextField
                required
                fullWidth
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? 'Please enter your email or phone number' : ''}
              />
            </div>

            <TextField
              required
              fullWidth
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={messageError}
              helperText={messageError ? 'Please enter the message' : ''}
            />

            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
