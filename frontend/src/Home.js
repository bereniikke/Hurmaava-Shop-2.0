function Home() {
  return (
    <div className="home-container">
      <div className="home-text-container">
        <h1 className="home-h1">
          Oletko valmis <span style={{ color: '#d499d5' }}>Hurmaavaan</span> ostokokemukseen?
        </h1>

        <h2 className="home-h2">Valmistamme Sinulle räätälöidyn vaatteen käyttäen kierrätysmateriaaleja.</h2>
      </div>

      <div className="home-img-container">
        <img className="homeimg" src="./images/home.png" alt="Pictures of a handmade jacket and a vest" />
      </div>
    </div>
  );
}

export default Home;
