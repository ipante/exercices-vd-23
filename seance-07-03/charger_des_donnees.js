/*
    https://observablehq.com/@d3/d3-group
*/

// IMPORTATION

// charger des données d'un fichier
d3.csv("../data/donnees_musique.csv", d => {
    console.log(d)
})

// charger les données de plusieurs fichiers
Promise.all([
    d3.csv("../data/amsterdam_weekdays_1.csv"),
    d3.csv("../data/amsterdam_weekdays_2.csv"),
]).then(d => {
    // joindre les deux tableaux
    let tab_complet = d[0].concat(d[1])
    console.log(tab_complet);
})

// PREPARATION AUTOMATIQUE DES DONNEES
let selection_avec_nombres = d3.csv("../data/amsterdam_weekdays_1.csv",d3.autoType).then(d => console.log("nombres reconnus: ",d))


// FILTRAGE (EXCLURE, COMBINER ET RENOMMER DES DONNEES)
let selection = d3.csv("../data/amsterdam_weekdays_1.csv", d => {
    return {
        capacite: +d.person_capacity,
        satisfaction: Math.ceil(+d.guest_satisfaction_overall).toFixed(2)
    }
}).then(d => {
    // console.log(d[0].satisfaction)
    // console.log(d)
})

// FILTRAGE 2 : FILTER PAR VALEUR
d3.csv("../data/amsterdam_weekdays_1.csv").then(
    function (data) {
        let d_au_top = data.filter(v => v.guest_satisfaction_overall > 91)
        console.log("au top", d_au_top)
    }
)

// GROUPER PAR VARIABLES
d3.csv("../data/amsterdam_weekdays_1.csv").then(
    function (data) {
        let regroupement_par_pieces = d3.group(data, d => d.room_type)
        console.log("Map : regroupement par pièces total : ", regroupement_par_pieces)
        let tab_regroupement_par_pieces = d3.groups(data, d => d.room_type)
        console.log("Tableau regroupement par pièces total : ", tab_regroupement_par_pieces)

        let chambres_privees = regroupement_par_pieces.get("Private room");
        console.log("chambres privées", chambres_privees)

        let tab_regroupement_par_pieces_et_capacite = d3.group(data, d => d.room_type, d => d.person_capacity)
        console.log("Tableau regroupement par pièces et capacite : ", tab_regroupement_par_pieces_et_capacite)

        let chambres_privees_capacites = tab_regroupement_par_pieces_et_capacite.get("Private room").get("3.0")
        console.log("chambres privées & capacité", chambres_privees_capacites)
    }
)

// REDUIRE PAR VARIABLES
d3.csv("../data/amsterdam_weekdays_1.csv").then(
    function (data) {
        // trouver le nombre d'appartements
        let t = d3.rollup(data, v => v.length)
        console.log("t", t)

        // trouver le nombre d'appartements superhost ou non
        let u = d3.rollup(data, v => v.length, v => v.host_is_superhost)
        console.log("u", u)
    }
)

const salesData = [
    { category: 'Electronics', product: 'Laptop', sales: 1000 },
    { category: 'Electronics', product: 'Phone', sales: 500 },
    { category: 'Clothing', product: 'Shirt', sales: 300 },
    { category: 'Clothing', product: 'Pants', sales: 200 }
];

const salesByCategory = d3.rollup(
    salesData,
    products => d3.sum(products, product => product.sales),
    products => products.category
);

console.log(salesByCategory);

// convertir les valeurs numériques en chiffres
d3.csv("../data/donnees_musique.csv", function(d) {
    return {
        tonalite: d.tonalite,
        usage: d.usage,
        moment: d.moment,
        nombre: Number(d.nombre),
    }
}).then(function(data) {
    console.log(data)
})

// somme des nombres
d3.csv("../data/donnees_musique.csv").then(function(data) {
    const somme = d3.rollup(
        data,
        musiques => d3.sum(musiques, musique => musique.nombre)
    )
    console.log(somme)
})

// somme des nombres
d3.csv("../data/donnees_musique.csv").then(function(data) {
    let somme = 0;
    data.forEach(ligne => somme += Number(ligne.nombre))
    console.log(somme)
})

// convertir les valeurs numériques en chiffres et somme
d3.csv("../data/donnees_musique.csv", function(d) {
    return {
        tonalite: d.tonalite,
        usage: d.usage,
        moment: d.moment,
        nombre: Number(d.nombre),
    }
}).then(function(data) {
    let somme = 0;
    data.forEach(ligne => somme += ligne.nombre)
    console.log(somme)
})

// somme des nombres en fonction de l'usage
d3.csv("../data/donnees_musique.csv").then(function(data) {
    const somme = d3.rollup(
        data,
        musiques => d3.sum(musiques, musique => musique.nombre),
        musiques => musiques.usage
    )
    console.log("ligne 140",somme)
})

// Convertion des valeurs via une fonction
function conversion_valeurs(d) {
    return {
        id: d.id,
        realSum: +d.realSum,
        room_type: d.room_type,
        room_shared: d.room_shared == "True",
        room_private: d.room_private == "True",
        person_capacity: +d.person_capacity,
        host_is_superhost: d.host_is_superhost == "True",
        multi: +d.multi,
        biz: +d.biz,
        cleanliness_rating: +d.cleanliness_rating,
        guest_satisfaction_overall: +d.guest_satisfaction_overall,
        bedrooms: +d.bedrooms,
        dist: +d.dist,
        metro_dist: +d.metro_dist,
        attr_index: +d.attr_index,
        attr_index_norm: +d.attr_index_norm,
        rest_index: +d.rest_index,
        rest_index_norm: +d.rest_index_norm,
        lng: +d.lng,
        lat: +d.lat,
    }
}
Promise.all([
    d3.csv("../data/amsterdam_weekdays_1.csv", conversion_valeurs),
    d3.csv("../data/amsterdam_weekdays_2.csv", conversion_valeurs),
]).then(d => {
    // joindre les deux tableaux
    let tab_complet = d[0].concat(d[1])
    console.log(tab_complet);
})

