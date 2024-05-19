import { useContext } from "react";
import { useParams } from 'react-router-dom';

import Wrapper from "./Wrapper";
import { StoreContext } from '../../context/StoreContext';
import currencyFormatter from '../../helpers/currency.formatter';

function ProductDetails() {

    const { shoes, addToCart } = useContext(StoreContext);
    const { productId } = useParams();

    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    console.log(productId);


    return (
        <div>

            <div className="w-full md:py-20">
                <Wrapper>

                    {shoes.map((shoe) => {
                        if (shoe.id == productId) {
                            return (
                                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]" key={shoe.id}>
                                    {/* left column start */}
                                    <div className="w-full max-h-[550px] md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                                        <img
                                            className="w-full h-full object-cover object-center rounded-md"
                                            src={shoe.image}
                                            alt={shoe.name}
                                        />

                                    </div>

                                    {/* right column start */}
                                    <div className="flex-[1] py-3">
                                        <div className="text-[34px] font-semibold mb-2 leading-tight">
                                            {shoe.name}
                                        </div>
                                        <div className="text-lg font-semibold mb-5">
                                            {shoe.description}
                                        </div>

                                        {/* PRODUCT PRICE */}
                                        <div className="flex items-center">
                                            <p className="mr-2 text-lg font-semibold">
                                                MRP : {currencyFormatter(shoe.price)}
                                            </p>
                                        </div>
                                        <div className="text-md font-medium text-black/[0.5]">
                                            incl. of taxes
                                        </div>
                                        <div className="text-md font-medium text-black/[0.5] mb-10">
                                            Also includes all applicable duties
                                        </div>

                                        {/* PRODUCT SIZE RANGE START */}
                                        <div className="mb-10">
                                            <div className="flex justify-between mb-2">
                                                <div className="text-md font-semibold">
                                                    Select Size
                                                </div>
                                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                                    Select Guide
                                                </div>
                                            </div>
                                            {/* HEADING END */}

                                            {/* SIZE START */}
                                            <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                                                {sizeOptions.map((size, index) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer"
                                                    >
                                                        {size}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* ADD TO CART BUTTON START */}
                                        <button
                                            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                                            onClick={() => addToCart(productId)}
                                        >
                                            Add to Cart
                                        </button>
                                        {/* ADD TO CART BUTTON END */}

                                        <div>
                                            <div className="text-lg font-bold mb-5">
                                                Product Details
                                            </div>
                                            <div className="markdown text-md mb-5">
                                                {shoe.description}
                                            </div>
                                        </div>
                                    </div>
                                    {/* right column end */}
                                </div>
                            );
                        }
                        return null; // return null if shoe id doesn't match productId
                    })}


                </Wrapper>
            </div>

        </div>
    )
}

export default ProductDetails