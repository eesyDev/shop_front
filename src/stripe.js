import { loadStripe } from '@stripe/stripe-js';


let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51McN7VEQc6TYnPrSA4b6GjIECDTHpmfstGk3sR03J0rnbHwkSuCdZ1JKKyruS1p86JR36FeRKDCvDZKcjkx07Ru900zHGQSwZE')
    }

    return stripePromise;
}

export default getStripe;
