import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 0.5rem 1.5rem 1rem 1.5rem;
    background-color: white;
    transform: translate(0,-100px);
    border-radius: 5px;
    h2 {
        text-decoration: dashed underline;
    }
    box-shadow: 0px 3px 15px rgba(0,0,0,0.1);
`;


class BarChart extends React.Component{

    constructor(props){
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount(){
        this.drawGraph()
    }

    drawGraph(){

        let data = this.props.repos.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0,5);

        const svg = d3.select(this.chartRef.current)
            .append('svg')
                .attr('width', 400)
                .attr('height',400);
        
        const graph = svg.append('g')
            .attr('width', 350)
            .attr('height', 350)
            .attr('transform','translate(50,0)');

        const yAxisGroup = graph.append('g');
        const xAxisGroup = graph.append('g')
            .attr('transform','translate(0,350)');

        const y = d3.scaleLinear()
            .range([0,350])
            .domain([d3.max(data, d => d.stargazers_count ),0]);

        const x = d3.scaleBand()
            .range([0,350])
            .domain(data.map(item => item.name))
            .paddingInner(0.2)
            .paddingOuter(0.2);

        const color = d3.scaleOrdinal(d3['schemeSet3'])
            .domain(data.map(item => item.name));

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        xAxisGroup.call(xAxis);
        yAxisGroup.call(yAxis);

        graph.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
                .attr('width', x.bandwidth)
                .attr('height', 0)
                .attr('fill', d => color(d.name))
                .attr('x', d => x(d.name))
                .attr('height', 350)
                .transition().duration(1000)
                    .attr('y',  d => y(d.stargazers_count))
                    .attr('height', d => 350 - y(d.stargazers_count));

        xAxisGroup.selectAll('text')
            .attr('text-anchor','end')
            .attr('transform','rotate(-15)');
        
    }

    render(){
        return <Wrapper>
            <h2>Most Starred</h2>
            <div ref={this.chartRef}></div>
        </Wrapper>
    }
}

export default BarChart;