import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options= {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operation related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version:  '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Ffotos-gratis%2Famor&psig=AOvVaw3wH6BAESn0-rpIYUAYKl9s&ust=1713303349749000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCy5L2WxYUDFQAAAAAdAAAAABAE');
            height: 120px;
            width: 120px;
        }
    `,
    customSiteTitle: 'Documentacion REST API / TYPSCRIPT'

}
export default swaggerSpec
export {
    swaggerUiOptions
}