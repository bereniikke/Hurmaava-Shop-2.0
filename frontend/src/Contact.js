import React from 'react';

function Contact() {
    return (
      <div className="contact-container">
        <div className="contact-text-container">
          <h1 className="contact-h1">Ota yhteyttä</h1>
          <h2>Ongelmia tilauksesi kanssa?</h2>
          <br />
          <h2>
            Ota meihin yhteyttä <span style={{ color: '#d499d5' }}>hurmaavaclothing@gmail.com</span>
          </h2>
          <br />
          <h2>Voit myös seurata meitä instagramissa @hurmaava_clothing</h2>
        </div>
  
        <div className="contact-img-container">
          <img className="phone" src="./images/yellowphone.png" alt="a yellow old phone" />
        </div>
      </div>
    );
  }
  
  export default Contact;
  