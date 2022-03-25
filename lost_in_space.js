'use strict';

window.onload = function () {
  // recuperation des élement necessaire depuis mon fichier html
  const canvas = document.getElementById("game_area"); // recuperation du canvas
  const context = canvas.getContext("2d"); // definir un context de type "2d"
  const button = document.getElementById("button"); // recuperation du button 
  const scorediv = document.getElementById("score"); // recuperation de la div qui contient le score


  class BateauHumain{ // la class qui contient les information du Bateau Humain
    constructor(BateauX1, BateauY1){
      // bateau caracteristique
      this.BateauX1 = BateauX1;
      this.BateauY1 = BateauY1;
      this.RadianBateau = 20;
      this.BateauCouleur = "white";
      this.BateauVitesse = 20;
    }
    dessinBateauJoueur(){ // la fonction qui dessin le bateau en fonction de la position et le radian 
      context.beginPath();
      context.arc(this.BateauX1, this.BateauY1, this.RadianBateau, 0, Math.PI * 2);
      context.fillStyle = this.BateauCouleur;
      context.fill();
    }
    mouveBateauGauche(){ // la fonction qui decale le bateau vers la gauche en diminuant sont coordonnée X1
      if(this.BateauX1 >= 30){ // le cas ou le bateau il est dans le boitier du canvas
        this.BateauX1 = this.BateauX1 - this.BateauVitesse;
        this.BateauCouleur = "white";
      } else { // le cas ou le bateau touche les extrémité du boitier du canvas
        this.dessinBateauJoueur();
      }
    }
    mouveBateauDroite(){ // la fonction qui decale le bateau vers la droite en augmentant sont coordonnée X1
      if(this.BateauX1 <= 570){ // le cas ou le bateau il est dans le boitier du canvas
        this.BateauX1 = this.BateauX1 + this.BateauVitesse;
        this.BateauCouleur = "white";
      } else { // le cas ou le bateau touche les extrémité du boitier du canvas
        this.dessinBateauJoueur();
      }
    }
    mouveBateauHaut(){ // la fonction qui decale le bateau vers la haut en diminuant sont coordonnée Y1
      if(this.BateauY1 >= 40){
        this.BateauY1 = this.BateauY1 - this.BateauVitesse;
        this.BateauCouleur = "white";
      } else { // le cas ou le bateau touche les extrémité du boitier du canvas
        this.dessinBateauJoueur();
      }
    }
    mouveBateauBas(){ // la fonction qui decale le bateau vers la bas en augmentant sont coordonnée Y1
      if(this.BateauY1 <= 560){
        this.BateauY1 = this.BateauY1 + this.BateauVitesse;
        this.BateauCouleur = "white";
      } else { // le cas ou le bateau touche les extrémité du boitier du canvas
        this.dessinBateauJoueur();
      }
    }
    creerUnNouveauBalle(){ // la fonction qui ajoute un nouveau balon en fonction des coordonnées du bateau dans la liste qui contient les ballons
      balles.push(new BateauBalle(this.BateauX1, this.BateauY1)); 
    }
  }

  class BateauBalle{ // la class qui contient les information des balles
    constructor(BalleX1, BalleY1){ 
      // balle caracteristiques
      this.BalleX1 = BalleX1;
      this.BalleY1 = BalleY1;
      this.RadianBalle = 5;
      this.BalleCouleur = "blue";
      this.BalleVitesse = 5;
    }
    dessinBalleJoueur(){ // la fonction qui dessin la balle en fonction de la position et le radian 
      context.beginPath();
      context.arc(this.BalleX1, this.BalleY1 - 30, this.RadianBalle, 0, Math.PI * 2);
      context.fillStyle = this.BalleCouleur;
      context.fill();
    }
    updateBalle(){ // la fonction qui creer le mouvement de la balle
      this.dessinBalleJoueur();
      this.BalleVitesse = this.BalleVitesse - 0.05; // la balle carde à chaque fois 95% de sa vitesse initiale (je diminie la vitesse par 5%)
      this.BalleY1 = this.BalleY1 - this.BalleVitesse; // je diminue sont coordonnées Y1 pour donner l'effet du mouvement
    }
  }

  class extraTerrestres{ // la class qui contient les information des extra-Terrestres
    constructor(ExtraTerrestresX1, ExtraTerrestresY1, RadianExtraTerrestres, ExtraTerrestresVitesseVersCoter){
      // ExtraTerrestres caracteristiques
      this.ExtraTerrestresX1 = ExtraTerrestresX1;
      this.ExtraTerrestresY1 = ExtraTerrestresY1;
      this.RadianExtraTerrestres = RadianExtraTerrestres;
      this.ExtraTerrestresCouleur = "#2cee33";
      this.ExtraTerrestresVitesseVersCoter = ExtraTerrestresVitesseVersCoter;
      this.ExtraTerrestresVitesseVersBas = 0.3;
    }
    dessinExtraTerrestres(){ // la fonction qui dessin la balle en fonction de la position et le radian 
      context.beginPath();
      context.arc(this.ExtraTerrestresX1, this.ExtraTerrestresY1, this.RadianExtraTerrestres, 0, Math.PI * 2);
      context.fillStyle = this.ExtraTerrestresCouleur;
      context.fill();
    } 
    updateExtraTerrestres(){ // la fonction qui creer le mouvement des extra-Terrestres
      this.dessinExtraTerrestres();
      if (this.ExtraTerrestresX1 >= canvas.width - this.RadianExtraTerrestres){ // le cas ou l'Aliens touche le mur de la droite
        this.ExtraTerrestresVitesseVersCoter += 0.1; // j'augment sa vitesse de 10%
        this.ExtraTerrestresVitesseVersCoter = -this.ExtraTerrestresVitesseVersCoter; // et je change son sens pour donner un effet de rebondissement
      }
      if (this.ExtraTerrestresX1 <= this.RadianExtraTerrestres){ // le cas ou l'Aliens touche le mur de la gauche
        this.ExtraTerrestresVitesseVersCoter -= 0.1; // j'augment sa vitesse de 10% mais dans ce cas la vitesse il es negatif à cause du rebondissement 
        this.ExtraTerrestresVitesseVersCoter = -this.ExtraTerrestresVitesseVersCoter; // et je change son sens pour donner un effet de rebondissement
      }
      if (this.ExtraTerrestresY1 <= this.RadianExtraTerrestres){ // le cas ou l'Aliens touche le mur du haut
        this.ExtraTerrestresVitesseVersBas -= 0.2; // j'augment sa vitesse de 20% mais dans ce cas la vitesse il es negatif à cause du rebondissement
        this.ExtraTerrestresVitesseVersBas = -this.ExtraTerrestresVitesseVersBas; // et je change son sens pour donner un effet de rebondissement
      }
      if (this.ExtraTerrestresY1 >= canvas.height - this.RadianExtraTerrestres){ // le cas ou l'Aliens touche le mur du bas
        this.ExtraTerrestresVitesseVersBas += 0.2; // j'augment sa vitesse de 20% 
        this.ExtraTerrestresVitesseVersBas = -this.ExtraTerrestresVitesseVersBas; // et je change son sens pour donner un effet de rebondissement
      }
      this.ExtraTerrestresX1 = this.ExtraTerrestresX1 + this.ExtraTerrestresVitesseVersCoter; // j'augmente la position pour donner l'effet du mouvement
      this.ExtraTerrestresY1 = this.ExtraTerrestresY1 + this.ExtraTerrestresVitesseVersBas; // j'augmente la position pour donner l'effet du mouvement
    }
  }

  const lostInSpace = new BateauHumain(300, 570); // definir un bateau pour le jeux
  let balles = []; // creer la liste qui va contenir les balles
  let extraTerrestreslist = []; // creer la liste qui va contenir les extra-Terrestres
  
  function produireExtraTerrestres(){ // la fonction qui va produire les extra terreste dans un intervalle de 2s
    setInterval(() => { // definir l'intervalle et la chose à éxecuter 
      const ExtraTerrestresX1 = Math.floor(Math.random() * (590 - 10) + 10); // creer differents endroit d'apparaition des Aliens entre 10 et 590, j'ai uriliser 590 car j'ai enlever le radian de l'Alien
      const RadianExtraTerrestres = Math.floor(Math.random() * (15 - 9) + 9);  // pour avoir des Aliens de radian different de 9 jusqu'à 15 pour donner un tache complementaire au jeux
      const ExtraTerrestresY1 = RadianExtraTerrestres + 1; // j'ai mis +1 pour ne pas entrer dans la conditon qui detecte la collision de la balle avec le mur du haut
      let ExtraTerrestresVitesseVersCoter = 1; // par defaut il commence de partir vers la droit au debut
      if (ExtraTerrestresX1 < 200){ // mais pour donner un effet reel au jeu, j'ai mis des Alien qui par au debut vers gauche et d'autre vers droite
        ExtraTerrestresVitesseVersCoter = -ExtraTerrestresVitesseVersCoter; // je change le sens des etra_terrestres 
      };
      extraTerrestreslist.push(new extraTerrestres(ExtraTerrestresX1, ExtraTerrestresY1, RadianExtraTerrestres, ExtraTerrestresVitesseVersCoter)); // creer un nouveau Alien et l'ajouter dans le tableau
    }, 2000) // intervalle de 2seconde
  }

  function AnimateBalles() { // la fonction qui fait l'animation des balles
    let valScore = 0; //initialisation du score
    let jeuxIntervalle = window.setInterval(() => { // je creer un intervalle de 10ms et je l'affecte à une variable pour utiliser cette variable pour supprimer l'intervale aprés quand le jeux termine
      context.clearRect(0, 0, canvas.width, canvas.height); // je supprime à chaque fois le dessin d'avant pour mettre à jour le jeux
      lostInSpace.dessinBateauJoueur(); // je dessins le bateau à chaque mise à jour
      balles.forEach((balle, balleIndex) => { // je parcours les elements de la liste qui contient les balles et aussi en sauvgardant leur indices
        balle.updateBalle(); // je mis à jour chaque balle pour donner un effet de mouvement
        if (balle.BalleY1 - balle.RadianBalle < 0 || balle.BalleVitesse <= 0){// le cas ou la balle depasse le canvas en haut ou bien quand sa vitesse et nulle
          balles.splice(balleIndex, 1); // je suprime la balle de la liste balles
        }
      });

      extraTerrestreslist.forEach((exTerrestres, exTerrestresIndex) => { // je parcours les elements de la liste qui contient les extraTerrestres et aussi en sauvgardant leur indices
        exTerrestres.updateExtraTerrestres(); // je mis à jour les extra-terrestre pour donner un effet de mouvement
        const distanceHumainEtexTerrestre = Math.hypot(lostInSpace.BateauX1 - exTerrestres.ExtraTerrestresX1, lostInSpace.BateauY1 - exTerrestres.ExtraTerrestresY1); // je calcule la distance entre le bateau et les extra-terrestres
        if (distanceHumainEtexTerrestre - exTerrestres.RadianExtraTerrestres - lostInSpace.RadianBateau < 1){ // le cas ou le bateau et en collision avec un extra-terrestre
          window.clearInterval(jeuxIntervalle); // je stop le jeu(l'appelle à l'intervalle d'avant) quand il y a une collision entre le bateau terrestre et le bateau extra terrestre
          if(!alert("Game Over\nYour score is: " + valScore + " points")){window.location.reload();} //afficher un message de fin partie et quand le joueur click sur ok la page et automatiquement recharger
        };
        balles.forEach((balle, balleIndex) => {  // je parcours les elements de la liste qui contient les balles et aussi en sauvgardant leur indices
          const distanceBalleEtExTerrestre = Math.hypot(balle.BalleX1 - exTerrestres.ExtraTerrestresX1, balle.BalleY1 - exTerrestres.ExtraTerrestresY1); // je calcule la distance entre la balle et les extra-terrestres
          // collision entre l'alien et la balle
          if (distanceBalleEtExTerrestre - exTerrestres.RadianExtraTerrestres - balle.RadianBalle < 1){ // je regarde le moment ou la distance entre la balle et l'Alien est inferieur à 1 mais il faut enlever la redian de la balle et l'Alien
            valScore += 1; // j'augemte le score car le joueur à tirer sur un alien
            scorediv.innerHTML = valScore; // je mis à jour la valeur dans la div qui contient les scores
            balles.splice(balleIndex, 1); // enlever la balle 
            extraTerrestreslist.splice(exTerrestresIndex, 1); // enlever l'Alien

          };
        });
      });
    }, 10); // intervalle de 10 ms
  }  

  window.addEventListener("keydown", (event) => { // gestion du mouvement du bateau
    let key = event.keyCode;
    if (key == 37){ // click button gauche
      lostInSpace.mouveBateauGauche();
    }
    if (key == 39){ // click button droit
      lostInSpace.mouveBateauDroite();
    }
    if (key == 38){ // click button haut
      lostInSpace.mouveBateauHaut();
    }
    if (key == 40){ // click button bas
      lostInSpace.mouveBateauBas();
    }
    if (key == 32){ // click button espace
      lostInSpace.creerUnNouveauBalle();
    }
  });
  button.addEventListener("click", () => { // quand le joueur click sur le boutton commencez le jeux
    AnimateBalles(); // appeler la fonction qui fait l'annimation des balles
    produireExtraTerrestres(); // et la fonction qui fait la production des aliens à chaque fois
    button.style.display = "none"; // supprimer le boitier quand on click sur commencer
  });
};