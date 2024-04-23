import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const token = 'skvTKr51n2K2gUI7lu1r3ebfAiSFL9UVCm8ivTW25tEoaokZvwsmtLe16504SGxJCLjV8uGrZ9QQjiH19GdmhngR35cfiVi7OupvCRSnKucqq5WS7EhaUMrJMjae24j8KdueGugpT3B2ZJXOU01mxjD8CxpYXlLbbh9YlTf1GLTc5MJz9MON'
export const client = sanityClient({
    projectId: 'kt37jcmt',
    dataset: 'production',
    apiVersion: '2024-04-22',
    useCdn: true,
    token: token
});

const builder = imageUrlBuilder(client);

export  const urlFor = (source) => builder.image(source); 