import { Router } from 'express'
import { body, param } from 'express-validator'
import { creteProduct, deleteProduct, getProductById, getProducts, updatedAvailability, updatedProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                       type: string
 *                       description: The Product name
 *                       example: Monitor curvo de 49 Pulgadas
 *                  price:
 *                       type: number
 *                       description: The Product price
 *                       example: 300
 *                  availability:
 *                       type: boolean
 *                       description: The Product availability
 *                       example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
 * 
 */


//Routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a products based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrive 
 *              required: true
 *              schema:
 *                  type: integer
 *          responses: 
 *              200:
 *                  description: Succesfull Response 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post: 
 *      summary: Create a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:    
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Mouse inalambrico"
 *                          price: 
 *                              type: number
 *                              example: 150
 *      responses: 
 *          201:
 *              description: Succesfull Response 
 *              content:
 *                   application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input data
 * 
 */

router.post('/',
    //Validacion
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0 ).withMessage('El precio no es valido'),
        handleInputErrors,
    creteProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrive 
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:    
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Mouse inalambrico"
 *                          price: 
 *                              type: number
 *                              example: 150
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses: 
 *              200:
 *                  description: Succesfull Response 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input data
 */

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0 ).withMessage('El precio no es valido'),
        body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
        handleInputErrors,
    updatedProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrive 
 *              required: true
 *              schema:
 *                  type: integer
 *      responses: 
 *              200:
 *                  description: Succesfull Response 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID 
 */

router.patch('/:id', param('id').isInt().withMessage('ID no valido'), handleInputErrors, updatedAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by ID
 *      tags: 
 *          - Products
 *      description: Returns a message of delete product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *      responses: 
 *              200:
 *                  description: Succesfull Response 
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto eliminado'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID 
 */

router.delete('/:id',  param('id').isInt().withMessage('ID no valido'), handleInputErrors, deleteProduct)

export default router