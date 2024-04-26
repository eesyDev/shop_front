import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const token = process.env.REACT_APP_SANITY_TOKEN
export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2024-04-22',
    useCdn: true,
    token: token
});

const builder = imageUrlBuilder(client);

export  const urlFor = (source) => builder.image(source); 