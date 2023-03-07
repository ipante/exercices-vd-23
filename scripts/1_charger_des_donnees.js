// IMPORTATION

// charger des données d'un fichier
d3.csv("data/donnees_musique.csv", d => {
    console.log(d)
})

// charger les données de plusieurs fichiers
Promise.all([
    d3.csv("data/amsterdam_weekdays_1.csv"),
    d3.csv("data/amsterdam_weekdays_2.csv"),
]).then(d =>{
    // joindre les deux tableaux
    let tab_complet = d[0].concat(d[1])
    console.log(tab_complet);
})

// FILTRAGE (EXCLURE, COMBINER ET RENOMMER DES DONNEES)
let selection = d3.csv("data/amsterdam_weekdays_1.csv", d =>{
    return {
        capacite : +d.person_capacity,
        satisfaction : Math.ceil(+d.guest_satisfaction_overall).toFixed(2)
    }
}).then(d => {
    // console.log(d[0].satisfaction)
    // console.log(d)
})

// FILTRAGE 2 : FILTER PAR VALEUR
d3.csv("data/amsterdam_weekdays_1.csv").then(
    function(data){
        let d_au_top = data.filter(v => v.guest_satisfaction_overall > 91)
        console.log("au top",d_au_top)
    }
)

// GROUPER PAR VARIABLES
d3.csv("data/amsterdam_weekdays_1.csv").then(
    function(data){
        let regroupement_par_pieces = d3.group(data,d => d.room_type)
        console.log("Regroupement par pièces total : ",regroupement_par_pieces)
        let tab_regroupement_par_pieces = d3.groups(data,d => d.room_type)
        console.log("Tableau regroupement par pièces total : ",tab_regroupement_par_pieces)

        let chambres_privees = regroupement_par_pieces.get("Private room")
    }
)

// REDUIRE PAR VARIABLES
d3.csv("data/amsterdam_weekdays_1.csv").then(
    function(data){
        // trouver le nombre d'appartements
        let t = d3.rollup(data, v => v.length)
        console.log("t",t)

        // trouver le nombre d'appartements superhost ou non
        let u = d3.rollup(data, v => v.length, v => v.host_is_superhost)
        console.log("u",u)
    }

    
)
