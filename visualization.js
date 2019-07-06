document.addEventListener("DOMContentLoaded", () => {

    const width = 800;
    const height = 400;

    const container = d3.select("#viz");

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border", "1px dashed #000");

    d3.json("/countries.json")
        .then(countries => {

            // Different Projections:
            // https://github.com/d3/d3-geo#azimuthal-projections

            const projection = d3.geoBonne()
                .rotate([-20.0, 0.0])
                .center([0.0, 52.0])
                .parallel(52)
                .translate([width / 2, height / 2])
                .scale(580)
                .precision(.1);

            const path = d3.geoPath().projection(projection);

            const europe = svg.selectAll("path")
                .data(countries.features)
                .enter()
                .append("path")
                .attr("d", d => path(d))
                .attr("stroke", "grey")
                .attr("stroke-width", "0.5")
                .attr("fill", "rgb(60,61,70)");

            d3.csv("/cities.csv")
                .then(cities => {


                    const cirlces = svg.selectAll('circle')
                        .data(cities)
                        .enter()
                        .append('circle')
                        .attr("cx", d => projection([d.lon, d.lat])[0])
                        .attr("cy", d => projection([d.lon, d.lat])[1])
                        .attr("r", d => d.size / 3)
                        .attr('fill', '#F86B33');
                })
        })

});
