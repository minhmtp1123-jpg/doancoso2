/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
// If you previously used static assets for products, we now fetch them from backend.
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

//


export const ShopContext = createContext();
const ShopContextProvider = (props) => {

    const currency = '$';

    const delivery_fee = 10;
    // Use env var if present; fall back to localhost for quick local debugging
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'



    const [search, setSearch] = useState('');
    const [showsearch, setShowsearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const [token, setToken] = useState('')

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size')
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;

            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {

            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }

        }



    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];


                    }
                } catch (error) {
                    console.log(error);


                }
            }
        }
        return totalCount;
    }

    useEffect(() => {
        //console.log(cartItems);

    }, [cartItems])

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {

            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })


            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }

        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    const qty = Number(cartItems[items][item]) || 0;
                    const price = itemInfo && (itemInfo.price || itemInfo?.price) ? Number(itemInfo.price) : 0;
                    if (qty > 0 && price > 0) {
                        totalAmount += qty * price;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {

            if (!backendUrl) {
                console.warn('VITE_BACKEND_URL is not defined. Requests may hit the dev server and return index.html.');
            }

            const url = (backendUrl ? backendUrl : '') + '/api/product/list';
            console.log('Fetching products from:', url);
            const response = await axios.get(url);
            //console.log('Product list response content-type:', response.headers && response.headers['content-type']);
            if (response.headers && typeof response.headers['content-type'] === 'string' && response.headers['content-type'].includes('text/html')) {
                console.warn('Received HTML response when expecting JSON — likely hitting frontend dev server.');
            }
            if (response.data && response.data.success) {
                setProducts(response.data.products || []);
                //console.log(response.data)
            } else {
                toast.error(response.data.message)
                console.warn('Unexpected product list response:', response.data);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const getUserCart = async (token) => {
        try {

            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {

                setCartItems(response.data.cartData)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))

        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showsearch, setShowsearch,
        cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount, navigate, backendUrl, setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;