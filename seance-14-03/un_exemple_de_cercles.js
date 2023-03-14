let selection = d3.csv("../data/amsterdam_weekdays_1.csv", d => {
    return {
        capacite: +d.person_capacity,
        satisfaction: Math.ceil(+d.guest_satisfaction_overall).toFixed(2)
    }
}).then(d => {

    // créer le canevas
    let toile = d3.select("body")
        .append("svg")
            .attr("width",window.innerWidth)
            .attr("height",window.innerHeight)

    // ajouter des cercles
    toile.selectAll("circle")
        .data(d)
        .enter()
        .append("circle")
            .attr("cx",(d,i) => 5*i)
            .attr("cy",20)
            .attr("width",20)
            .attr("height",30)
            .attr("r",2)
            .attr("opacity",0.2)
})