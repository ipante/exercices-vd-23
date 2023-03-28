'use strict';
/*
Puisque le nombre de valeurs change,
nous devons également changer les axes,
par exemple en les supprimant, puis en
les recréant. Pour saisir l'axe à
supprimer il faut qu'il soit identifé,
d'où l'ajout d'une classe au bloc "g"
(cf. lignes 47 et 108)

*/

// création du canevas
const canevas = d3.select("body").append("svg")
  .attr("width", 960)
  .attr("height", 500);
  
// génération de données aléatoires
// tableau d'objets
const donnees = d3.range(20).map(function(d, i) { 
  return {"id": i+1, "value": Math.ceil(Math.random()*6)};
});

// création d'une échelle pour les X
const x = d3.scaleBand()
  .domain(donnees.map(d => d.id))
  .range([100, 800]);

const y = d3.scaleLinear()
  .domain([0,d3.max(donnees, d => d.value)])
  .range([300, 0]);

// création des rectangles
canevas.selectAll("rect")
  .data(donnees)
  .enter()
  .append("rect")
    .attr("y", d => 400 - y(6-d.value))
    .attr("x", d => x(d.id))
    .attr("width", x.bandwidth())
    .attr("height", d => y(6-d.value))
    .style('fill','lightgreen')
    .style('stroke','green');

// ajouter l'axe des X
canevas.append("g")
  .classed('axeX',true)
  .attr("transform", 'translate(0,400)')
  .call(d3.axisBottom(x));

// ajouter l'axe des Y
canevas.append("g")
  .attr("transform", 'translate(100,100)')
  .call(d3.axisLeft(y).ticks(6));

document.querySelector('button')
  .addEventListener('click', function(e){
    e.preventDefault();
    // nouveau jeu de données
   const donnees = d3.range(d3.randomUniform(10, 50)()).map(function(d, i) { 
    return {"id": i+1, "value": Math.ceil(Math.random()*6)
    };
});
  // création d'une échelle pour les X
const x = d3.scaleBand()
  .domain(donnees.map(d => d.id))
  .range([100, 800]);

const y = d3.scaleLinear()
  .domain([0,d3.max(donnees, d => d.value)])
  .range([300, 0]);
  
  // création des rectangles
  canevas.selectAll("rect")
  .data(donnees)
  .enter()
  .append("rect")
    .attr("y", d => 400 - y(6-d.value))
    .attr("x", d => x(d.id))
    .attr("width", x.bandwidth())
    .attr("height", d => y(6-d.value))
    .style('fill','lightgreen')
    .style('stroke','green');
  
   // modification des rectangles 
  canevas.selectAll("rect")
  .data(donnees)
    .transition()
    .duration(100)
    .attr("y", d => 400 - y(6-d.value))
    .attr("x", d => x(d.id))
    .attr("width", x.bandwidth())
    .attr("height", d => y(6-d.value))
    .style('fill','lightgreen')
    .style('stroke','green');
  
    canevas.selectAll("rect")
  .data(donnees)
    .exit()
        .transition()
            .duration(100)
            .attr("height", 0)
            .remove();

d3.select('.axeX').remove();
  
 // ajouter l'axe des X
canevas.append("g")
  .classed('axeX',true)
  .attr("transform", 'translate(0,400)')
  .call(d3.axisBottom(x));
})