let compteur = 0;

console.log(d3.version)

// t = [4,5,6]
// t[1]
// t = [[3,4],[4,5]]
// t[0][0]

let d1 = [[1,87],[24,66],[35,23]];
let d2 = [[45,55],[17,92],[83,54],[46,44]];

let w = window.innerWidth;
let h = window.innerHeight;

// définir mon canevas et l'ajouter à la page
let svg = d3.select("body")
            .append("svg")
                .attr("width",w)
                .attr("height",h)

// créer deux échelles
let echelleX = d3.scaleLinear()
                    .domain([1,100])
                    .range([40,w-40])

let echelleY = d3.scaleLinear()
                    .domain([1,100])
                    .range([h-40,40])

function modifier(donnees){
    // sélectionner les cercles
    // lier les données
    let selection = svg.selectAll("circle").data(donnees);

    // enter() pour les cercles ajoutés
    selection.enter()
        .append("circle")
            .transition()
            .attr("cx", d => echelleX(d[0]))
            .attr("cy", d => echelleY(d[1]))
            .attr("r",20)

    // (update) pour les cercles modifiés
    selection.transition()
        .attr("cx", d => echelleX(d[0]))
        .attr("cy", d => echelleY(d[1]))
        .style("fill","blue")

    // exit pour les cercles supprimés
    selection.exit().remove()
}

// changer de données chaque n ms
setInterval(function(){
    console.log("ok")
    if(compteur%2 == 0){
        modifier(d1)
    }
    else{
        modifier(d2)
    }
    compteur++;
},2000)