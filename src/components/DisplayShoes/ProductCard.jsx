
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

import { API_END_POINTS } from "../../assets";
import images from "../../assets/images";
const { addIconGreen, addIconWhite, removeIconRed } = images;

import currencyFormatter from "../../helpers/currency.formatter";

const ProductCard = ({ data }) => {

    const { id, image, name, description, price } = data;

    const [itemCount, setItemCount] = useState(0);

    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    return (

        <div
            className=" transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer rounded-md overflow-hidden drop-shadow-xl"
        >

            <div className="relative w-full mx-auto h-[300px]">
                <img
                    className="w-full h-full object-cover object-center"
                    src={API_END_POINTS.IMAGES + '/' + image}
                    alt={name}
                />

                {!cartItems[id]
                    ? <img
                        className='absolute right-0 top-60 rounded-full'
                        onClick={() => addToCart(id)}
                        src={addIconWhite}
                        alt="" />
                    : <div
                        className=" absolute right-0 top-60 rounded-full flex items-center gap-[10px] p-[6px] bg-white">
                        <img
                            className="w-[30px]"
                            src={removeIconRed}
                            onClick={() => removeFromCart(id)}
                            alt="" />

                        <p>{cartItems[id]}</p>

                        <img src={addIconGreen} onClick={() => addToCart(id)} alt="" />
                    </div>
                }
            </div>

            <Link
                to={`/${id}`}
            >
                <div className=" p-4 text-blue-800">

                    <h2 className="text-lg font-medium">
                        {name}
                    </h2>

                    <p
                        className="food-item-desc text-black overflow-hidden h-12 line-clamp-2 whitespace-normal"
                    >
                        {description}
                    </p>


                    <div className="flex items-center text-blue-700">

                        <p className="mr-2 text-lg font-semibold">
                            {currencyFormatter(price)}
                        </p>

                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
