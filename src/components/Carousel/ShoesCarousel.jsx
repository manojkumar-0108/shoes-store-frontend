
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";


import { assets } from "../../assets";
const { slide_1, slide_2, slide_3, slide_4 } = assets.images;

const slidesData = [
    { id: 1, src: slide_1, alt: 'Slide 1' },
    { id: 2, src: slide_2, alt: 'Slide 2' },
    { id: 3, src: slide_3, alt: 'Slide 3' },
    { id: 4, src: slide_4, alt: 'Slide 4' },
];

const ShoesCarousel = () => {
    return (
        <div className="pb-10">
            <div className="relative text-white text-[20px]  w-full max-w-[1000px] mx-auto rounded-lg overflow-hidden sm:rounded-none">
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showIndicators={false}
                    showStatus={false}
                    renderArrowPrev={(clickHandler, hasPrev) => (
                        <div
                            onClick={clickHandler}
                            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
                        >
                            <BiArrowBack className="text-sm md:text-lg z-0" />
                        </div>
                    )}
                    renderArrowNext={(clickHandler, hasNext) => (
                        <div
                            onClick={clickHandler}
                            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
                        >
                            <BiArrowBack className="rotate-180 text-sm md:text-lg z-0" />
                        </div>
                    )}
                >

                    {slidesData.map(slide => (
                        <div key={slide.id}>
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="aspect-[16/10] md:aspect-auto object-cover object-center"
                            />
                            <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                                Shop now
                            </div>
                        </div>
                    ))}


                </Carousel>
            </div>
        </div>

    );
};

export default ShoesCarousel;
