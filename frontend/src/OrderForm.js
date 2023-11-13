import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { submitOrder } from './api';

function OrderForm() {
  const navigate = useNavigate();
  const [productType, setProductType] = useState('');
  const [fabric, setFabric] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const handleProductTypeChange = (event) => {
    const selectedProductType = event.target.value;
    setProductType(selectedProductType);
    updateTotal();
  };

  const handleFabricChange = (event) => {
    const selectedFabric = event.target.value;
    setFabric(selectedFabric);
    updateTotal();
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const productTypeImageMap = {
    '': "./images/takki.JPG",
    takki: "./images/takki.JPG",
    liivi: "./images/liivi.JPG"
  };

  const fabricImageMap = {
    '': "./images/takki.JPG",
    "pinkit kukat": "./images/pinkitkukat.jpg",
    värikäs: "./images/värikäs.jpg",
    keltainen: "./images/keltainen.jpeg"
  };

  const updateTotal = () => {
    const productPrice = parseFloat(productType === 'takki' ? 100.00 : (productType === 'liivi' ? 65.00 : 0.00));
    const fabricPrice = parseFloat(fabric === 'pinkit kukat' ? 10.00 : (fabric === 'värikäs' ? 15.00 : (fabric === 'keltainen' ? 12.00 : 0.00)));
    const shippingPrice = 6.9;
    const total = productPrice + fabricPrice + shippingPrice;

    setTotalPrice(total.toFixed(2));
  };

  const handleThumbnailClick = (src) => {
    const featuredImage = document.getElementById('featured');
    featuredImage.src = src;
  };

  const handleSliderScroll = (direction) => {
    const slider = document.getElementById('slider');
    if (direction === 'left') {
      slider.scrollLeft -= 180;
    } else {
      slider.scrollLeft += 180;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    updateTotal();
  
    const orderData = {
      productType,
      fabric,
      phoneNumber,
      email,
      date: new Date().toISOString(),
    };
  
    try {
      const response = await submitOrder(orderData);
      console.log('Order submitted successfully:', response);
      navigate('/ThankYou');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };
  
  return (
    <div className="order-form-container">
      <div id="product-img-container">
            <img id="featured" src={productTypeImageMap[productType] || fabricImageMap[fabric]} alt="Product" />

            <div id="slide-wrapper">
            <img id="slideLeft" className="arrow" src="./images/arrow/left.jpg" alt="left arrow" onClick={() => handleSliderScroll('left')} />
            <div id="slider">
                {Object.entries(productTypeImageMap).map(([key, src], index) => (
                    key !== '' && (
                    <img
                        alt=""
                        key={index}
                        className={`thumbnail ${src === productTypeImageMap[productType] ? 'active' : ''}`}
                        src={src}
                        onClick={() => {
                        handleThumbnailClick(src);
                        handleProductTypeChange({ target: { value: key } });
                        }}
                    />
                    )
                ))}
                {Object.entries(fabricImageMap).map(([key, src], index) => (
                    key !== '' && (
                    <img
                        alt=""
                        key={index + Object.keys(productTypeImageMap).length}
                        className={`thumbnail ${src === fabricImageMap[fabric] ? 'active' : ''}`}
                        src={src}
                        onClick={() => {
                        handleThumbnailClick(src);
                        handleFabricChange({ target: { value: key } });
                        }}
                    />
                    )
                ))}
                </div>

            <img id="slideRight" className="arrow" src="./images/arrow/right.jpg" alt="right arrow" onClick={() => handleSliderScroll('right')} />
            </div>
        </div>

      
      <div className="form-container">
          <form id="order-form" onSubmit={handleFormSubmit}>
            <label htmlFor="productType">Tyyli:</label>
            <select id="productType" name="productType" required onChange={handleProductTypeChange}>
                <option value="valitse tuote" data-price="0.00">Valitse tuote</option>
                <option value="takki" data-price="100.00">Takki - 100.00€</option>
                <option value="liivi" data-price="65.00">Liivi - 65.00€</option>
            </select>
            <br />

            <label htmlFor="fabric">Kangas:</label>
            <select id="fabric" name="fabric" required onChange={handleFabricChange}>
                <option value="valitse kangas" data-price="0.00">Valitse kangas</option>
                <option value="pinkit kukat" data-price="10.00">Pinkit kukat - 10.00€</option>
                <option value="värikäs" data-price="15.00">Värikäs - 15.00€</option>
                <option value="keltainen" data-price="12.00">Keltainen - 12.00€</option>
                <option value="oma kangas" data-price="0.00">Oma kangas - 0.00€</option>
            </select>
            <br />

            <label htmlFor="phoneNumber">Puh:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required />
            <br />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />

            <div className="total">
                <h4>Tilauksesi:</h4>
                {productType !== 'valitse tuote' && (
                    <div className="total">
                        <h4>Tilauksesi:</h4>
                        <p>Työ: {productType === 'takki' ? '100.00€' : productType === 'liivi' ? '65.00€' : '0.00€'}</p>
                        <p>Kangas: {parseFloat(fabric === 'pinkit kukat' ? 10.00 : (fabric === 'värikäs' ? 15.00 : (fabric === 'keltainen' ? 12.00 : 0.00))).toFixed(2)}€</p>
                        <p>Postikulut: 6.90€</p>
                        <hr />
                        <p>Yhteensä {totalPrice}€</p>
                    </div>
                    )}
            </div>

            <div className="button-container">
                <button type="submit">Lähetä tilaus</button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default OrderForm;


/* import React, { useState } from 'react';
import { submitOrder } from './api';

function OrderForm() {
  const [productType, setProductType] = useState('');
  const [fabric, setFabric] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const productTypeImageMap = {
    '': "./images/takki.JPG",
    takki: "./images/takki.JPG",
    liivi: "./images/liivi.JPG"
  };

  const fabricImageMap = {
    '': "./images/takki.JPG",
    "pinkit kukat": "./images/pinkitkukat.jpg",
    värikäs: "./images/värikäs.jpg",
    keltainen: "./images/keltainen.jpeg"
  };

  const updateTotal = () => {
    const productPrice = parseFloat(productType === 'takki' ? 100.00 : (productType === 'liivi' ? 65.00 : 0.00));
    const fabricPrice = parseFloat(fabric === 'pinkit kukat' ? 10.00 : (fabric === 'värikäs' ? 15.00 : (fabric === 'keltainen' ? 12.00 : 0.00)));
    const shippingPrice = 6.9;
    const total = productPrice + fabricPrice + shippingPrice;

    setTotalPrice(total.toFixed(2));
  };

  const handleProductTypeChange = (event) => {
    const selectedProductType = event.target.value;
    setProductType(selectedProductType);

    const featuredImage = document.getElementById('featured');
    const productTypeImagePath = productTypeImageMap[selectedProductType];

    if (productTypeImagePath) {
      featuredImage.src = productTypeImagePath;
    }

    updateTotal();
  };

  const handleFabricChange = (event) => {
    const selectedFabric = event.target.value;
    setFabric(selectedFabric);

    const featuredImage = document.getElementById('featured');
    let fabricImagePath = fabricImageMap[selectedFabric];

    if (selectedFabric === 'oma kangas') {
      fabricImagePath = productTypeImageMap[productType];
    }

    if (fabricImagePath) {
      featuredImage.src = fabricImagePath;
    }

    updateTotal();
  };

  const handleThumbnailClick = (src) => {
    const featuredImage = document.getElementById('featured');
    featuredImage.src = src;
  };

  const handleSliderScroll = (direction) => {
    const slider = document.getElementById('slider');
    if (direction === 'left') {
      slider.scrollLeft -= 180;
    } else {
      slider.scrollLeft += 180;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      productType,
      fabric,
      size: document.getElementById('size').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      email: document.getElementById('email').value,
    };    

    try {
      const response = await submitOrder(orderData);
      console.log('Order submitted successfully:', response);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };
 

  return (
    <div className="order-form-container">
        <div id="product-img-container">
            <img id="featured" src={productTypeImageMap[productType] || fabricImageMap[fabric]} alt="Product" />

            <div id="slide-wrapper">
            <img id="slideLeft" className="arrow" src="./images/arrow/left.jpg" onClick={() => handleSliderScroll('left')} />
            <div id="slider">
                {Object.entries(productTypeImageMap).map(([key, src], index) => (
                    key !== '' && (
                    <img
                        key={index}
                        className={`thumbnail ${src === productTypeImageMap[productType] ? 'active' : ''}`}
                        src={src}
                        onClick={() => {
                        handleThumbnailClick(src);
                        handleProductTypeChange({ target: { value: key } });
                        }}
                    />
                    )
                ))}
                {Object.entries(fabricImageMap).map(([key, src], index) => (
                    key !== '' && (
                    <img
                        key={index + Object.keys(productTypeImageMap).length}
                        className={`thumbnail ${src === fabricImageMap[fabric] ? 'active' : ''}`}
                        src={src}
                        onClick={() => {
                        handleThumbnailClick(src);
                        handleFabricChange({ target: { value: key } });
                        }}
                    />
                    )
                ))}
                </div>

            <img id="slideRight" className="arrow" src="./images/arrow/right.jpg" onClick={() => handleSliderScroll('right')} />
            </div>
        </div>

      
      <div className="form-container">
          <form id="order-form" onSubmit={handleFormSubmit}>
            <label htmlFor="productType">Tyyli:</label>
            <select id="productType" name="productType" required onChange={handleProductTypeChange}>
                <option value="valitse tuote" data-price="0.00">Valitse tuote</option>
                <option value="takki" data-price="100.00">Takki - 100.00€</option>
                <option value="liivi" data-price="65.00">Liivi - 65.00€</option>
            </select>
            <br />

            <label htmlFor="fabric">Kangas:</label>
            <select id="fabric" name="fabric" required onChange={handleFabricChange}>
                <option value="valitse kangas" data-price="0.00">Valitse kangas</option>
                <option value="pinkit kukat" data-price="10.00">Pinkit kukat - 10.00€</option>
                <option value="värikäs" data-price="15.00">Värikäs - 15.00€</option>
                <option value="keltainen" data-price="12.00">Keltainen - 12.00€</option>
                <option value="oma kangas" data-price="0.00">Oma kangas - 0.00€</option>
            </select>
            <br />

            <label htmlFor="size">Koko:</label>
            <select id="size" name="size" required>
                <option value="ONE SIZE">ONE SIZE</option>
            </select>
            <br />

            <label htmlFor="phoneNumber">Puh:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required />
            <br />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />

            <div className="total">
                <h4>Tilauksesi:</h4>
                {productType !== 'valitse tuote' && (
                    <div className="total">
                        <h4>Tilauksesi:</h4>
                        <p>Työ: {productType === 'takki' ? '100.00€' : productType === 'liivi' ? '65.00€' : '0.00€'}</p>
                        <p>Kangas: {parseFloat(fabric === 'pinkit kukat' ? 10.00 : (fabric === 'värikäs' ? 15.00 : (fabric === 'keltainen' ? 12.00 : 0.00))).toFixed(2)}€</p>
                        <p>Postikulut: 6.90€</p>
                        <hr />
                        <p>Yhteensä {totalPrice}€</p>
                    </div>
                    )}
            </div>

            <div className="button-container">
                <button type="submit">Lähetä tilaus</button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default OrderForm;
*/