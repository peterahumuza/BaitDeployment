import React, { useRef, useEffect, useState } from 'react';
import { Tooltip } from '@chakra-ui/react';
import * as d3 from 'd3';

const ScatterPlot = ({ data, title }) => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);

  const width = 600;
  const height = 400;

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define margins
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.size)])
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Accuracy)])
      .range([innerHeight, 0])
      .nice();

    // Create axis
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    // Draw x-axis
    svg.select('.x-axis')
      .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
      .call(xAxis);

    // Draw y-axis
    svg.select('.y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    // Draw points with logos
    svg.selectAll('.point')
      .data(data)
      .enter()
      .append('image')
      .attr('class', 'point')
      .attr('x', d => xScale(d.size) + margin.left - 10) // Adjust icon position
      .attr('y', d => yScale(d.Accuracy) + margin.top - 10) // Adjust icon position
      .attr('width', 20) // Adjust icon size as needed
      .attr('height', 20) // Adjust icon size as needed
      .attr('xlink:href', d => d.logoUrl) // Set the logo URL
      .on('mouseover', (event, d) => {
        setTooltip({
          x: event.pageX,
          y: event.pageY,
          content: d
        });
      })
      .on('mouseout', () => {
        setTooltip(null);
      });

  }, [data]);

  return (
    <div>
      <h2>{title}</h2>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
        <text className="x-axis-label" textAnchor="middle" />
        <text className="y-axis-label" textAnchor="middle" />
      </svg>
      {tooltip && (
        <Tooltip
          label={`Model Name: ${tooltip.content.name}, Company: ${tooltip.content.name}, Size: ${tooltip.content.size}, Accuracy: ${tooltip.content.Accuracy}%`}
          placement="top"
          hasArrow
          bg="blue.500"
          color="white"
          borderRadius="md"
          p={2}
          zIndex={9999}
          style={{ position: 'absolute', left: tooltip.x + 'px', top: tooltip.y + 'px' }}
        >
          <div />
        </Tooltip>
      )}
    </div>
  );
};

export default ScatterPlot;
