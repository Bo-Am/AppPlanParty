import React from 'react';
import emailjs from 'emailjs-com'

const ContactEmail = () => {


    function sendEmail (e) {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_7xcfnco', e.target, 'user_hRH6KiVi1I5UfGYogMtp8')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }

    return (
        <div>
            <form onSubmit={sendEmail}>
                <input placeholder="name" name="name"/>
                <input placeholder="email adress" name="email"/>
                <input placeholder="subject" name="subject"/>
                <textarea name="message"></textarea>
                <input type="submit" value="Send Message"></input>
            </form>
        </div>
    );
};

export default ContactEmail;