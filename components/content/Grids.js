import { Grid, GridItem } from "@chakra-ui/react";

const GridStyle = {
  pageMargin: "4vw",
  numColumns: 12,
  gutter: 4,
  innerGap: "2vw",
};
function GridSection({ children, ...props }) {
  return (
    <Grid 
      templateColumns={`repeat(${GridStyle.numColumns}, 1fr)`}
      w='100%' 
      h='fit-content' 
      textColor='black' 
      justifyContent='flex-start' 
      alignItems='flex-start' 
      position='relative'
      overflow="hidden"
      pt='10vh' 
      pb='10vh' 
      px={GridStyle.pageMargin}
      gap={GridStyle.gutter}
      {...props}>
        
      {children}
    </Grid>
  );
}

function GridElement({ cols, children, ...props }) {
  return (
    <GridItem 
      colSpan={cols} 
      bgColor='transparent'
      overflow="visible"
      w='100%' 
      h='fit-content' 
      justifyContent='flex-start' 
      alignItems='flex-start' 
      p={GridStyle.innerGap}
      {...props}
      >
      {children}
    </GridItem>
  );
}

export { GridSection, GridElement, GridStyle };