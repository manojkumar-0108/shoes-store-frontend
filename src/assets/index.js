
import images from './images/index';

export const BACKEND_BASE_URL = 'http://13.201.77.73'

export const assets = {
    images,
}

export const API_END_POINTS = {
    SHOES: '/api/frontend/shoes',
    USERS: '/api/frontend/users',
    CARTS: '/api/frontend/carts',
    ORDERS: '/api/frontend/orders'
}


import { categoryImages } from './images/index';

export const shoesCategories = [
    {
        category: "Sneakers",
        image: categoryImages.sneakerLogo
    },
    {
        category: "Boots",
        image: categoryImages.bootLogo
    },
    {
        category: "Athletic Shoes",
        image: categoryImages.athleticShoeLogo
    },
    {
        category: "Sandals",
        image: categoryImages.sandalLogo
    },
    {
        category: "Loafers",
        image: categoryImages.loggerLogo
    },
    {
        category: "Oxfords",
        image: categoryImages.oxfordLogo
    },
    {
        category: "Bluchers",
        image: categoryImages.blucherLogo
    },
    {
        category: "Slippers",
        image: categoryImages.slipperLogo
    },
    {
        category: "Moccasins",
        image: categoryImages.moccasinLogo
    }
]


