import React from 'react';

function FormBanner() {
  return (
    <div className="form-banner">
      <h2>Näin tilaat itsellesi Hurmaavan vaatteen:</h2>
      <div className="instructions-container">
        <div className="instruction">
          <img src="../images/numbers/1.jpg" alt="Step 1" />
          <p>TYYLI</p>
          <p style={{ fontFamily: 'Sacramento', fontStyle: 'cursive', fontSize: '1em', marginTop: '0.7em' }}>
            Voit valita joko kustomoidun takin tai liivin.
          </p>
        </div>
        {/* <img className="arrow" src="./images/numbers/arrow.jpg" alt="Arrow" /> */}
        <div className="instruction">
          <img src="../images/numbers/2.jpg" alt="Step 2" />
          <p>KUSTOMOI</p>
          <p style={{ fontFamily: 'Sacramento', fontStyle: 'cursive', fontSize: '1em', marginTop: '0.7em' }}>
            Valitse kangas. Voit myös lähettää oman kankaan meille.
          </p>
        </div>
        {/* <img className="arrow" src="./images/numbers/arrow.jpg" alt="Arrow" /> */}
        <div className="instruction">
          <img src="../images/numbers/3.jpg" alt="Step 3" />
          <p>TILAA</p>
          <p style={{ fontFamily: 'Sacramento', fontStyle: 'cursive', fontSize: '1em', marginTop: '0.7em' }}>
            Otamme sinuun yhteyttä maksua varten.
          </p>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default FormBanner;
