import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import imgAvis from "../image/avis.png";
import imgAvisModel from "../image/avis-model.png";
function Home() {
  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="content">
          <div className="typing-demo">
            <h1>Welcome to Procurement Guide</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <h1 style={{ textAlign: "center" }}>
          Découvrez les solutions SAP pour le e-commerce
        </h1>
        <br />
        <h2 style={{ textAlign: "center" }}>
          Nos solutions e-commerce de pointe vous permettent de saisir les
          opportunités de croissance à la demande.
        </h2>
        <br></br>
        <div className="row">
          <div className="col-sm">
            <img src={imgAvis} width="350" height="350" alt="" />
          </div>
          <div className="col-sm">
            <br />
            <br />
            <h3>
              Les avis clients, cet enjeu prioritaire pour les commerçants
            </h3>
            <h6 style={{ lineHeight: "1.8em" }}>
              Depuis plusieurs années déjà, les avis clients occupent une place
              de plus en plus importante dans le cycle de décision d’achat. En
              effet, avec l’avènement du commerce en ligne et des nouveaux
              canaux de vente, les comportements évoluent. Et parmi ces
              évolutions, consulter les avis clients sur le web est désormais
              devenu un réflexe des consommateurs. Nouvelle étape du tunnel de
              vente, influence d’un avis client sur la notoriété d’une enseigne
              et gestion des avis négatifs,
            </h6>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-sm">
            <img src={imgAvisModel} width="400" height="400" alt="" />
          </div>
          <div className="col-sm">
            <br />
            <br />
            <br />
            <h3>La modération, l'analyse et les réponses automatisées</h3>
            <h6 style={{ lineHeight: "1.8em" }}>
              Déléguez la gestion des réponses et modérez les propos injurieux
              grâce à nos algo. Prenez les bonnes décisions grâce aux
              technologies d’analyse avec une interface intuitive et des chart
              de bord parlants.
            </h6>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
