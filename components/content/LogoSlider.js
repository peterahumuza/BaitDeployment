import Slider from 'react-infinite-logo-slider'
import { Flex, Box, Image, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';


const LogoSlider = (...props) => {

    const slideStyle = {
        width: "200vw",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        margin: "0",
    };

    const logoStyle = {
        height: '42px',
        width: 'auto',
        margin: 'auto'
    };

    const sliderStyle = {
        width: '100vw', 
        filter : 'grayscale(100%)',
        zIndex: 2,
        p: 0,
        
    };

    function LogoSlide({ src, alt, href }) {
        return (
            <Slider.Slide >
                <Box style={slideStyle}>
                    <Link href={href} aria-label={alt}>
                        <Image src={src} alt={alt} style={logoStyle}/>
                    </Link>
                </Box>
            </Slider.Slide>
        );
    }
    return (
        <Flex w="100%" h="fit-content" py="4" bgColor={useColorModeValue("transparent", "white")} justifyContent="center" alignItems="center" overflow="hidden">
            <Slider {...props} slidesToShow={1} autoplay={true} dots={false} arrows={false} style={sliderStyle} spacing={0} >
                <LogoSlide src="/assets/img/epfl.png" alt="EPFL" href="https://www.epfl.ch/en/" />
                <LogoSlide src="/assets/img/yale.png" alt="Yale" href="https://www.yale.edu/" />
                <LogoSlide src="/assets/img/WHO.png" alt="WHO" href="https://www.who.int" />
                <LogoSlide src="/assets/img/logo_chuv.png" alt="CHUV" href="https://www.chuv.ch/fr/chuv-home" />
                <LogoSlide src="/assets/icons/HUG.svg" alt="HUG" href="https://www.hug.ch/" />
                {/* <LogoSlide src="/assets/icons/ICRC.svg" alt="ICRC" href="https://www.icrc.org/" /> */}
                <LogoSlide src="/assets/icons/epfl_ai_center.svg" alt="EPFL AI Center" href="https://ai.epfl.ch" />
                <LogoSlide src="/assets/icons/Inselspital.svg" alt="Inselspital" href="https://www.insel.ch/" />
                <LogoSlide src="/assets/icons/KNH.png" alt="KNH" href="https://knh.or.ke" />
            </Slider>
        </Flex>
    )
}              
                     
export default LogoSlider;