import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const Wrapper = styled.div`
    padding: 0.5rem 1.5rem 1rem 1.5rem;
    background-color: white;
    h2 {
        text-decoration: dashed underline;
    }
    transform: translate(0,-100px);
    border-radius: 5px;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.1);
`;

class PieChart extends React.Component{
    
    constructor(props){
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount(){
        this.drawGraph();
    }

    drawGraph = () => {
        //Filter Data for d3.
        let languages = this.props.repos.map(repo => repo.language);
        let resultData = []; 
        languages.forEach(language => {
            const index = resultData.findIndex(result => result.language === language);
            if(index >= 0){
                resultData[index].frequency += 1;
            } else {
                let result = {
                    language: language,
                    frequency: 1
                };
                resultData.push(result);
            }
        });

        // Drawing pie chart.
        const pie = d3.pie()
            .sort(null)
            .value(d => d.frequency);

        const arc =d3.arc()
            .innerRadius(0)
            .outerRadius(100);

        const color = d3.scaleOrdinal(d3['schemeSet3'])
            .domain(resultData.map(resultData => resultData.language));

        const svg = d3.select(this.chartRef.current)
            .append('svg')
                .attr('width', 400)
                .attr('height', 400);

        const legends = svg.append('g')
            .attr('width',100)
            .attr('height',100)
            .attr('transform','translate(270,0)');

        const graph = svg.append('g')
            .attr('width', 200)
            .attr('height',200)
            .attr('transform','translate(100,150)'); 

        

        graph.selectAll('path')
            .data(pie(resultData))
            .enter()
            .append('path')
                .attr('fill', d => color(d.data.language))
                .transition().duration(2000)
                    .attrTween('d', (data) => {
                        var i = d3.interpolate(data.endAngle,data.startAngle);
                        return function(t){
                            data.startAngle = i(t);
                            return arc(data);
                        }
                    });
        
        legends.selectAll("mydots")
            .data(resultData)
            .enter()
            .append("circle")
                .attr("cx", 0)
                .attr("cy", (d,i) => 10 + i*25 ) 
                .attr("r", 7)
                .style("fill", d => color(d.language));
        
        
        legends.selectAll("mylabels")
            .data(resultData)
            .enter()
            .append("text")
                .attr("x", 10)
                .attr("y", (d,i) => 10 + i*25 )  
                .style("fill", d => color(d.language))
                .text(d => d.language)
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle");
        
    }

    render(){
        return (
            <Wrapper>
                <h2>Top Languages</h2>
                <div ref={this.chartRef} />            
            </Wrapper>
        );
    }
}

export default PieChart;