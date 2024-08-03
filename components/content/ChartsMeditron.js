// import React, { useRef, useEffect, useState } from 'react';
// import { VStack, Flex, HStack, GridItem, Box, Text, Image, Tooltip } from '@chakra-ui/react';
// import "react-multi-carousel/lib/styles.css";
// import * as d3 from 'd3';
// import {GridSection, GridElement} from "@/components/content/Grids";

// const graphColors = {
//   'bg': "#3F7464",
//   'content': "white",

// }
// const MedQAData = [
//     { name: 'Meditron', 'Accuracy': 75.8, 'size': 70, fill: '#6C5CE7', 'logoUrl': '/assets/img/meditron.png' },
//     { name: 'Open SOTA', 'Accuracy': 69.2, 'size': 70, fill: '#211c4a'},
//     { name: 'Med-PaLM', 'Accuracy': 67.6, 'size': 540, fill: '#211c4a', 'logoUrl': '/assets/icons/google.svg' },
//     { name: 'Med-PaLM 2', 'Accuracy': 86.5, 'size': 540, fill: '#211c4a', 'logoUrl': '/assets/icons/google.svg' },
//     { name: 'GPT-3.5', 'Accuracy': 53.6, 'size': 175, fill: '#211c4a', 'logoUrl': '/assets/icons/openai.svg' },
//     { name: 'GPT-4', 'Accuracy': 82.3, 'size': 1760, fill: '#211c4a', 'logoUrl': '/assets/icons/openai.svg' },
//   ];

// const PubMedQAData = [
//     { name: 'Meditron', 'Accuracy': 81.6, 'size': 70, fill: '#6C5CE7', 'logoUrl': '/assets/img/meditron.png' },
//     { name: 'Open SOTA', 'Accuracy': 77.5, 'size': 70, fill: '#211c4a' },
//     { name: 'Med-PaLM', 'Accuracy': 79.0, 'size': 540, fill: '#211c4a', 'logoUrl': '/assets/icons/google.svg' },
//     { name: 'Med-PaLM 2', 'Accuracy': 81.8, 'size': 540, fill: '#211c4a', 'logoUrl': '/assets/icons/google.svg' },
//     { name: 'GPT-3.5', 'Accuracy': 60.2, 'size': 175, fill: '#211c4a', 'logoUrl': '/assets/icons/openai.svg' },
//     { name: 'GPT-4', 'Accuracy': 74.4, 'size': 1760, fill: '#211c4a', 'logoUrl': '/assets/icons/openai.svg' },
// ];

// const MedMCQAData = [
//     { name: 'Meditron', 'Accuracy': 66.7, 'size': 70, fill: '#6C5CE7', 'logoUrl': '/assets/img/meditron.png' },
//     { name: 'Open SOTA', 'Accuracy': 59.2, 'size': 70, fill: '#6C5CE7' },
//     { name: 'Med-PaLM', 'Accuracy': 57.6, 'size': 540, fill: '#211c4a', 'logoUrl': '/assets/icons/google.svg' },
//     { name: 'Med-PaLM 2', 'Accuracy': 72.3, 'size': 540, fill: '#211c4a', 'logoUrl': '/assets/icons/google.svg' },
//     { name: 'GPT-3.5', 'Accuracy': 51.0, 'size': 175, fill: '#211c4a', 'logoUrl': '/assets/icons/openai.svg' },
//     { name: 'GPT-4', 'Accuracy': 72.4, 'size': 1760, fill: '#211c4a', 'logoUrl': '/assets/icons/openai.svg' },
// ];

// const Bar = ({ data, index }) => {
//   const barColor = index === 0 ? 'white' : '#211c4a';
//   const textColor = index === 0 ? '#6C5CE7' : 'white';
//   const borderColor = index === 0 ? '#6C5CE7' : '#211c4a';
//   const logo = index === 1 ? null : <Image src={data[index].logoUrl} alt="Logo" width={"40px"} height={"40px"} />;
  
//   return (
//     <VStack w="20%" h="100%" display="flex" alignItems="center" justifyContent="flex-end" fontSize="2xl">
//       <VStack w="100%" h={data[index].Accuracy + "%"} borderRadius={"2vw 2vw 0 0"} alignItems="center" justifyContent="space-between" fontSize="2xl" pb={"1vw"} border="3px" borderStyle="solid" borderColor={borderColor} bg={barColor} color={textColor}>
//         <Text fontWeight={"light"} fontSize={"2xl"} alignContent="center" justifyContent={"center"} display="flex" mt={"2vh"}>
//           {data[index].Accuracy}%
//         </Text>
//         <VStack w="100%" display="flex" alignItems="center" justifyContent="center" fontSize="2xl" color={textColor}>
//           {logo}
//           <Text fontWeight={"400"} fontSize={"lg"} justifyContent="center" textAlign="center" display="flex" letterSpacing={"-0.05rem"}>
//             {data[index].name}
//           </Text>
//           <Text fontWeight={"light"} fontSize={"lg"} justifyContent="center" textAlign="center" display="flex">
//             {data[index].size}B
//           </Text>
//         </VStack>
//       </VStack>
//     </VStack>
//   );
// }

// const BarChart = ({ data, title }) => {
//   return (
//     <VStack w="100%" h="70vh" display="flex" justifyContent="center" fontSize="2xl" alignItems="center">
//       <HStack w="100%" h="100%" spacing={"1vw"} alignItems="flex-end" justifyContent="flex-start"  pl={"1vw"} pr={"1vw"} mt={"-10vh"}>
//         {data.map((barData, index) => (
//           <Bar key={index} data={data} index={index} fill={barData.fill} />
//         ))}
//       </HStack>
//       <Text fontWeight={"300"} fontSize={"2xl"} alignContent="center" display="flex" mb={"2vh"} color="gray.600" mt={"1vh"}>
//         {title}
//       </Text>
//     </VStack>
//   );
// }

// // DEPRECATED
// const ScatterPlot = ({ data, title }) => {
//   const svgRef = useRef();
//   const [tooltip, setTooltip] = useState(null);

//   const width = 600;
//   const height = 400;

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Define margins
//     const margin = { top: 30, right: 30, bottom: 50, left: 50 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     // Create scales
//     const xScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.size)])
//       .range([0, innerWidth])
//       .nice();

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.Accuracy)])
//       .range([innerHeight, 0])
//       .nice();

//     // Create axis
//     const xAxis = d3.axisBottom(xScale).ticks(5);
//     const yAxis = d3.axisLeft(yScale).ticks(5);

//     // Draw x-axis
//     svg.select('.x-axis')
//       .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
//       .call(xAxis);

//     // Draw y-axis
//     svg.select('.y-axis')
//       .attr('transform', `translate(${margin.left},${margin.top})`)
//       .call(yAxis);

//     // Draw x-axis label
//     svg.select('.x-axis-label')
//       .attr('text-anchor', 'middle')
//       .attr('font-family', 'Helvetica Neue')
//       .attr('font-size', '18px')
//       .attr('x', width / 2)
//       .attr('y', height - 10)
//       .text('Model size (B of parameters)');

//     // Draw y-axis label
//     svg.select('.y-axis-label')
//       .attr('text-anchor', 'middle')
//       .attr('font-family', 'Helvetica Neue')
//       .attr('font-size', '18px')
//       .attr('transform', 'rotate(-90)')
//       .attr('x', - height / 2)
//       .attr('y', 15)
//       .text('Accuracy');

//     // Draw points with logos
//     svg.selectAll('.point')
//       .data(data)
//       .enter()
//       .append('image')
//       .attr('class', 'point')
//       .attr('x', d => xScale(d.size) + margin.left - 10) // Adjust icon position
//       .attr('y', d => yScale(d.Accuracy) + margin.top - 10) // Adjust icon position
//       .attr('width', 30) // Adjust icon size as needed
//       .attr('height', 30) // Adjust icon size as needed
//       .attr('xlink:href', d => d.logoUrl) // Set the logo URL
//       .on('mouseover', (event, d) => {
//         setTooltip({
//           x: event.pageX,
//           y: event.pageY,
//           content: d
//         });
//       })
//       .on('mouseout', () => {
//         setTooltip(null);
//       });

//   }, [data]);

//   return (
//     <div>
//       <h2>{title}</h2>
//       <svg ref={svgRef} width={width} height={height}>
//         <g className="x-axis" />
//         <g className="y-axis" />
//         <text className="x-axis-label" />
//         <text className="y-axis-label" />
//       </svg>
//       {tooltip && (
//         <Tooltip
//           label={`Model Name: ${tooltip.content.name}, Company: ${tooltip.content.name}, Size: ${tooltip.content.size}, Accuracy: ${tooltip.content.Accuracy}%`}
//           placement="top"
//           hasArrow
//           bg="blue.500"
//           color="white"
//           borderRadius="md"
//           p={2}
//           zIndex={9999}
//           style={{ position: 'absolute', left: tooltip.x + 'px', top: tooltip.y + 'px' }}
//         >
//           <div />
//         </Tooltip>
//       )}
//     </div>
//   );
// };

// const Scatter = () => {
//   return (
//     <div>
//       <ScatterPlot data={MedQAData} title="MedQA" />
//       <ScatterPlot data={PubMedQAData} title="PubMedQA" />
//       <ScatterPlot data={MedMCQAData} title="MedMCQA" />
//     </div>
//   );
// };


// function Cell({children, row, col, ...props}) {
//   return (
//     <GridElement cols={1} rows={1} rowStart={row} colStart={col} p={0} textColor="black" {...props} children={
//       <Flex  justifyContent="center" alignItems="center" p={0} m={0} >
//         {children}
//       </Flex>
//     }/>
//   );
// }

// function ModelCell ({name, size, logoUrl, row, col, logoSize, ...props}) {
//   return (
//       <Cell row={row} col={col} {...props} children={
//         <VStack w="100%" h="100%" justifyContent="flex-end" alignItems="center" spacing={"0"} pb={"2"} {...props}>
//           {logoUrl &&
//             <Image src={logoUrl} alt="Meditron" width={logoSize} height={logoSize} />
//           }
//           <Text className="table" textAlign="center" pt={"2"}>
//             {name}
//           </Text>
//           <Text className="subbody" textAlign="center" color={"gray.500"}>
//             {size}
//           </Text>
//         </VStack>
//       }/>
//     );
//   }

//   function ResultCell ({result, row, col, ...props}) {
//     return (
//       <Cell row={row} col={col}  {...props} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="tablebold" textAlign="center">
//             {result}
//           </Text>
//         </VStack>
//       }/>
//     );
//   }


// const Meditron70BTable = () => {
//   const subtitleColor = "gray.500";
//   const numModels= 7;
//   const numBenchmarks=3;
//   const bgColor = "white"; 
//   const props = {
//     h: "7vw",
//     w: "6vw"
//   }

//   return (
//     <Box bgColor={bgColor} w="fit-content" h="fit-content" p="0" borderRadius="2vw" justifyContent="center" alignItems="center">
//     <GridSection templateColumns={`repeat(${numModels+1}, 1fr)`} gap={0} textColor={graphColors.content} cols={numModels+1} rows={numBenchmarks+1} p={"8"} overflow="visible">
      
//       <Cell row={1} col={1} {...props}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={1} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={2} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={3} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={4} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>

//       <Cell row={2} col={1} {...props}
//         children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             MedQA
//           </Text>
//           <Text className="subbody" textAlign="center" color={subtitleColor}>
//             4-options
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={3} col={1} {...props}
//         children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             MedMCQA
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={4} col={1} {...props}
//         children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             PubmedQA
//           </Text>
//         </VStack>
//       }/>
//       <ModelCell name="Meditron-2" size="70B" logoUrl="/assets/logos/MeditronBall.svg" row={1} col={2} {...props} logoSize="30px"/>
//       <ResultCell result="75.8" row={2} col={2} {...props}/>
//       <ResultCell result="66.7" row={3} col={2} {...props}/>
//       <ResultCell result="81.6" row={4} col={2} {...props}/>

//       <Cell row={1} col={3} {...props}
//         children={
//         <VStack w="100%" h="100%" justifyContent="flex-end" alignItems="center" spacing={"0"} pb="2" {...props}>
//           <Text className="table" textAlign="center">
//             Open SOTA
//           </Text>
//           <Text className="subbody" textAlign="center" color={subtitleColor}>
//             70B
//           </Text>
//         </VStack>
//       }/>
//       <ResultCell result="69.2" row={2} col={3} {...props}/>
//       <ResultCell result="59.2" row={3} col={3} {...props}/>
//       <ResultCell result="77.5" row={4} col={3} {...props}/>

//       <ModelCell name="Llama-2" size="70B" logoUrl="/assets/icons/meta.svg" row={1} col={4} {...props} logoSize="30px"/>
//       <ResultCell result="59.2" row={2} col={4} {...props}/>
//       <ResultCell result="62.7" row={3} col={4} {...props}/>
//       <ResultCell result="79.0" row={4} col={4} {...props}/>

//       <ModelCell name="GPT-3.5" size="175B" logoUrl="/assets/icons/openai.svg" row={1} col={5} {...props} logoSize="25px"/>
//       <ResultCell result="53.6" row={2} col={5} {...props}/>
//       <ResultCell result="51.0" row={3} col={5} {...props}/>
//       <ResultCell result="60.2" row={4} col={5} {...props}/>

//       <ModelCell name="GPT-4" size="1760B" logoUrl="/assets/icons/openai.svg" row={1} col={6} {...props} logoSize="25px"/>
//       <ResultCell result="82.3" row={2} col={6} {...props}/>
//       <ResultCell result="72.4" row={3} col={6} {...props}/>
//       <ResultCell result="74.4" row={4} col={6} {...props}/>

//       <ModelCell name="MedPaLM" size="540B" logoUrl="/assets/icons/google.svg" row={1} col={7} {...props} logoSize="30px"/>
//       <ResultCell result="67.6" row={2} col={7} {...props}/>
//       <ResultCell result="57.6" row={3} col={7} {...props}/>
//       <ResultCell result="79.0" row={4} col={7} {...props}/>

//       <ModelCell name="MedPaLM-2" size="540B" logoUrl="/assets/icons/google.svg" row={1} col={8} {...props} logoSize="30px"/>
//       <ResultCell result="86.5" row={2} col={8} {...props}/>
//       <ResultCell result="72.3" row={3} col={8} {...props}/>
//       <ResultCell result="81.8" row={4} col={8} {...props}/>

//       <GridItem colSpan={1} rowSpan={numBenchmarks+1} colStart={2} rowStart={1}  border="2px" borderColor="#6C5CE7" borderStyle="solid" shadow="xl" shadowColor="#6C5CE7" borderRadius="2vw" h="105%" w="100%" p={0} m={0} bgColor="transparent" zIndex="1" transform="translate(0px, -10px)"/>

      
//     </GridSection>
//     </Box>
//   );
// }

// const MeditronTable = () => {
//   const props = {
//     h: "7vw",
//     w: "8vw",
//   }
//   const numModels=8;
//   const numBenchmarks=3;
//   const bgColor = "white"; 
//   const subtitleColor = "gray.500";

//   return (
//     <Box bgColor={bgColor} w="fit-content" h="fit-content" px="20px" borderRadius="2vw" justifyContent="center" alignItems="center" py="50px">
//     <GridSection templateColumns={`repeat(${numModels+1}, 1fr)`} gap={0} textColor={graphColors.content} cols={numModels+1} rows={numBenchmarks+1} p={"1vw"} overflow="visible">
//       <Cell row={1} col={1}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={1} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={2} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={3} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={4} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>

//       <Cell row={2} col={1} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             MedQA
//           </Text>
//           <Text className="subbody" textAlign="center" color={subtitleColor}>
//             4-options
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={3} col={1} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             MedMCQA
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={4} col={1} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             PubmedQA
//           </Text>
//         </VStack>
//       }/>

//       <Cell row={1} col={2} {...props} children={
//         <VStack w="100%" h="100%" justifyContent="flex-end" alignItems="center" spacing={"0"} pb={"2"} {...props}>
//           <Image src="/assets/logos/MeditronBall.svg" alt="Meditron" width={"30px"} height={"30px"} />
//           <Text className="table" textAlign="center" pt={"2"}>
//             Llama-3<br/>Meditron v1.0
//           </Text>
//           <Text className="subbody" textAlign="center" color={"gray.500"}>
//           8B
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={2} col={2}  {...props} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="tablebold" textAlign="center" fontWeight="bold">
//             60.6
//           </Text>
//         </VStack>
//       }/>
//       <ResultCell result="58.4" row={3} col={2} {...props}/>
//       <Cell row={4} col={2}  {...props} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="tablebold" textAlign="center" fontWeight="bold">
//             78.0
//           </Text>
//         </VStack>
//       }/>

//       <ModelCell name="Llama-3" size="8B" logoUrl="/assets/icons/meta.svg" row={1} col={3} {...props} logoSize="30px"/>
//       <ResultCell result="60.6" row={2} col={3} {...props}/>
//       <ResultCell result="56.6" row={3} col={3} {...props}/>
//       <ResultCell result="74.8" row={4} col={3} {...props}/>

//       <ModelCell name="Mistral" size="7B" logoUrl="/assets/icons/mistral.png" row={1} col={4} {...props} logoSize="30px"/>
//       <ResultCell result="41.1" row={2} col={4} {...props}/>
//       <ResultCell result="40.2" row={3} col={4} {...props}/>
//       <ResultCell result="17.8" row={4} col={4} {...props}/>

//       <ModelCell name="BioMistral" size="7B" row={1} col={5} {...props} logoSize="30px"/>
//       <ResultCell result="42.8" row={2} col={5} {...props}/>
//       <ResultCell result="48.1" row={3} col={5} {...props}/>
//       <ResultCell result="77.5" row={4} col={5} {...props}/>

//       <ModelCell name="Llama-2" size="7B" logoUrl="/assets/icons/meta.svg" row={1} col={6} {...props} logoSize="40px"/>
//       <ResultCell result="49.6" row={2} col={6} {...props}/>
//       <ResultCell result="54.4" row={3} col={6} {...props}/>
//       <ResultCell result="61.8" row={4} col={6} {...props}/>

//       <ModelCell name="Meditron-2" size="7B" logoUrl="/assets/logos/MeditronBall.svg" row={1} col={7} {...props} logoSize="30px"/>
//       <ResultCell result="52.0" row={2} col={7} {...props}/>
//       <Cell row={3} col={7}  {...props} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="tablebold" textAlign="center" fontWeight="bold">
//             59.2
//           </Text>
//         </VStack>
//       }/>
//       <ResultCell result="74.4" row={4} col={7} {...props}/>

//       <ModelCell name="Llama-2" size="70B" logoUrl="/assets/icons/meta.svg" row={1} col={8} {...props} logoSize="40px"/>
//       <ResultCell result="59.2" row={2} col={8} {...props}/>
//       <ResultCell result="62.7" row={3} col={8} {...props}/>
//       <ResultCell result="78.0" row={4} col={8} {...props}/>

//       {/*  add a vertical column spanning all rows on the Llama-2 with left border */}
//       <GridItem colSpan={1} rowSpan={numBenchmarks+1} colStart={8} rowStart={1}  borderLeft={"1px"} borderLeftColor={"gray.400"} borderLeftStyle="dashed" h="100%" w="100%" p={0} m={0} bgColor="transparent" zIndex="1" transform="translate(3px, 0)"/>
//       <ModelCell name="Meditron-2" size="70B" logoUrl="/assets/logos/MeditronBall.svg" row={1} col={9} {...props} logoSize="30px"/>
//       <ResultCell result="75.8" row={2} col={9} {...props}/>
//       <ResultCell result="66.7" row={3} col={9} {...props}/>
//       <ResultCell result="81.6" row={4} col={9} {...props}/>

//       <GridItem colSpan={1} rowSpan={numBenchmarks+1} colStart={2} rowStart={1}  border="2px" borderColor="#6C5CE7" borderStyle="solid" shadow="xl" shadowColor="#6C5CE7" borderRadius="2vw" h="125%" w="102%" p={0} m={0} bgColor="transparent" zIndex="1" transform="translate(-2px, -50px)"/>

      
//     </GridSection>
//     </Box>
//   );
// }


// const MeditronVTable = () => {
  
//   const numModels= 3;
//   const numBenchmarks=3;
//   const bgColor = "white"; 
//   const props = {
//     h: "7vw",
//     w: "8vw"
//   }

//   return (
//     <Box bgColor={bgColor} w="fit-content" h="fit-content" p="0" borderRadius="2vw" justifyContent="center" alignItems="center">
//     <GridSection templateColumns={`repeat(${numModels+1}, 1fr)`} gap={0} textColor={graphColors.content} cols={numModels+1} rows={numBenchmarks+1} p={"8"} overflow="visible">
      
//       <Cell row={1} col={1} {...props}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={1} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%" h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={2} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%"  h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={3} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%"  h={props.h}/>
//       <GridElement cols={numModels+1} rows={1} rowStart={4} colStart={1} borderBottom={"1px"} borderColor={"gray.300"} borderStyle="solid" p={0} textColor="black" w="100%"  h={props.h}/>

//       <Cell row={2} col={1} {...props}
//         children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             Path-VQA
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={3} col={1} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             VQA-Rad
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={4} col={1} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="table" textAlign="center">
//             Slake-VQA
//           </Text>
//         </VStack>
//       }/>
//       <ModelCell name="Meditron-V" size="7B" logoUrl="/assets/logos/MeditronVBall.svg" row={1} col={2} {...props} logoSize="30px"/>
//       <Cell row={2} col={2}  {...props} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="tablebold" textAlign="center" fontWeight="bold">
//             75.8
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={3} col={2}  {...props} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="tablebold" textAlign="center" fontWeight="bold">
//             66.7
//           </Text>
//         </VStack>
//       }/>
//       <Cell row={4} col={2}  {...props} children={
//         <VStack w="100%" h="100%" justifyContent="center" alignItems="center" spacing={"0"} {...props}>
//           <Text className="tablebold" textAlign="center" fontWeight="bold">
//             81.6
//           </Text>
//         </VStack>
//       }/>

//       <ModelCell name="Llama-2 V" size="7B" logoUrl="/assets/icons/meta.svg" row={1} col={3} {...props} logoSize="40px"/>
//       <ResultCell result="69.2" row={2} col={3} {...props}/>
//       <ResultCell result="59.2" row={3} col={3} {...props}/>
//       <ResultCell result="77.5" row={4} col={3} {...props}/>

//       <ModelCell name="MedPaLM M" size="540B" logoUrl="/assets/icons/google.svg" row={1} col={4} {...props} logoSize="30px"/>
//       <ResultCell result="59.2" row={2} col={4} {...props}/>
//       <ResultCell result="62.7" row={3} col={4} {...props}/>
//       <ResultCell result="79.0" row={4} col={4} {...props}/>

//       <GridItem colSpan={1} rowSpan={numBenchmarks+1} colStart={2} rowStart={1}  border="2px" borderColor="#6C5CE7" borderStyle="solid" shadow="xl" shadowColor="#6C5CE7" borderRadius="2vw" h="108%" w="100%" p={0} m={0} bgColor="transparent" zIndex="1" transform="translate(-2px, -10px)"/>

      
//     </GridSection>
//     </Box>
//   );
// }

// const MeditronGraph = () => {
//   return (
//     <GridSection templateColumns={`repeat(${6}, 1fr)`}  h="fit-content" pt={"2vh"} pb={0} gap={0} px={0} textColor={graphColors.content}>
            
//             <GridElement cols={6} rowStart={1} colStart={1} h="50vh" p={0}  pb={"6vh"} pl={"4vw"} pr={"2vw"}>
//               <Box h="100%" borderRadius="0 0 0 2vw" borderBottom={"2px"} borderLeft={"2px"} borderColor={graphColors.content} borderStyle="solid" position="relative">
//                 <Box w="20px" h="20px" position="absolute" top = "0" left = "0" transform="translate(-60%, -80%)">
//                   <Image src="/assets/icons/triangle.svg" alt="triangle" width={20} height={20}/>
//                 </Box>
//                 <Box w="20px" h="20px" position="absolute" bottom = "0" right = "0" transform="translate(80%, 42%) rotate(90deg)">
//                   <Image src="/assets/icons/triangle.svg" alt="triangle" width={20} height={20} />
//                 </Box>
//                 <Box w="100%" h="100%" position="absolute" bottom = "0" left = "0" transform="translate(-70px, 0) ">
//                   <Text fontSize="lg" fontWeight="400" position="absolute" bottom = "50%" left = "0" transform="rotate(270deg)">
//                     Intelligence
//                   </Text>
//                 </Box>

//                 <Box w="100%" h="100%" position="absolute" bottom = "0" right = "0" transform="translate(0px, 40px) ">
//                   <Text fontSize="lg" fontWeight="400" position="absolute" bottom = "0" right = "50%" textAlign="center">
//                     Cost
//                   </Text>
//                 </Box>  
//               </Box>
//             </GridElement>

//             <GridElement id="meditron-medqa" cols={1} rows={1} rowStart={1} colStart={2} h="44vh" p={0}>
//               <Box w="100%" h="100%" position="relative" p={0}>
//                 <Box w="80px" h="80px" bgColor={graphColors.content} borderRadius="50%" position="absolute" bottom={MedQAData[0].Accuracy-20 + "%"} left = "0%">
//                   <Box bgColor={graphColors.bg} borderRadius="50%" position="absolute" top = "50%" left = "50%" transform="translate(-50%, -50%)" w={"20px"} h={"20px"}/>
//                 </Box>
//               </Box>
//             </GridElement>

//             <GridElement id="gpt3.5-medqa" cols={1} rows={1} rowStart={1} colStart={3} h="44vh" p={0}>
//             <Box w="100%" h="100%" position="relative" p={0}>
//                 <Box w="80px" h="80px" bgColor={graphColors.content} borderRadius="50%" position="absolute" bottom={MedQAData[4].Accuracy-20 + "%"} left = "0%" >
//                   <Box bgColor={graphColors.bg} borderRadius="50%" position="absolute" top = "50%" left = "50%" transform="translate(-50%, -50%)" w={"40px"} h={"40px"}/>
//                 </Box>
//               </Box>
//             </GridElement>
              
//             <GridElement id="medpalm-medqa" cols={1} rows={1} rowStart={1} colStart={4} h="44vh" p={0}>
//             <Box w="100%" h="100%" position="relative" p={0}>
//                 <Box w="80px" h="80px" bgColor={graphColors.content} borderRadius="50%" position="absolute" bottom={MedQAData[2].Accuracy-20 + "%"} left = "0%">
//                   <Box bgColor={graphColors.bg} borderRadius="50%" position="absolute" top = "50%" left = "50%" transform="translate(-50%, -50%)" w={"60px"} h={"60px"}/>
//                 </Box>
//               </Box>
//             </GridElement>

//             <GridElement id="medpalm2-medqa"  cols={1} rows={1} rowStart={1} colStart={5} h="44vh" p={0}>
//             <Box w="100%" h="100%" position="relative" p={0}>
//                 <Box w="80px" h="80px" bgColor={graphColors.content} borderRadius="50%" position="absolute" bottom={MedQAData[3].Accuracy-20 + "%"} left = "0%" >
//                   <Box bgColor={graphColors.bg} borderRadius="50%" position="absolute" top = "50%" left = "50%" transform="translate(-50%, -50%)" w={"60px"} h={"60px"}/>
//                 </Box>
//               </Box>
//             </GridElement>

//             <GridElement id="gpt4-medqa" cols={1} rows={1} rowStart={1} colStart={6} h="44vh" p={0}>
//               <Box w="100%" h="100%" position="relative" p={0}>
//                 <Box w="80px" h="80px" bgColor={graphColors.content} borderRadius="50%" position="absolute" bottom={MedQAData[5].Accuracy-20 + "%"} left = "0%">
//                   <Box bgColor={graphColors.bg} borderRadius="50%" position="absolute" top = "50%" left = "50%" transform="translate(-50%, -50%)" w={"70px"} h={"70px"}/>
//                 </Box>
//               </Box>
//             </GridElement>

//               <GridElement cols={1} rows={1} rowStart={2} colStart={1} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text className="subbody" w="100%">
//                     Model
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={3} colStart={1} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text className="subbody" w="100%">
//                     Size
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={4} colStart={1} h="5vh" p={0}>
//               <Box w="100%" h="100%" position="relative">
//                   <Text className="subbody" w="100%">
//                     Accuracy
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={2} colStart={2} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     Meditron
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={2} colStart={3} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     GPT-3.5
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={2} colStart={4} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     MedPaLM
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={2} colStart={5} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     MedPaLM-2
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={2} colStart={6} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     GPT-4
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={3} colStart={2} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[0].size}B
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={3} colStart={3} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[4].size}B
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={3} colStart={4} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[2].size}B
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={3} colStart={5} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[3].size}B
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={3} colStart={6} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[5].size}B
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={4} colStart={2} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[0].Accuracy}%
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={4} colStart={3} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[4].Accuracy}%
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={4} colStart={4} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[2].Accuracy}%
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={4} colStart={5} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[3].Accuracy}%
//                   </Text>
//                 </Box>
//               </GridElement>

//               <GridElement cols={1} rows={1} rowStart={4} colStart={6} h="5vh" p={0}>
//                 <Box w="100%" h="100%" position="relative">
//                   <Text class="subbody" w="100%">
//                     {MedQAData[5].Accuracy}%
//                   </Text>
//                 </Box>
//               </GridElement>
//             </GridSection>
//   );
// }
// export { MedQAData, PubMedQAData, MedMCQAData, BarChart, MeditronTable, MeditronGraph, Meditron70BTable, MeditronVTable};