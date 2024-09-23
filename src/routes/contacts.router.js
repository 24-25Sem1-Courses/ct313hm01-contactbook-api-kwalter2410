const express = require('express');
const contactsController = require('../controllers/contacts.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const avatarUpload = require('../middlewares/avatar-upload.middleware');
const router = express.Router();
module.exports.setup = (app) => {
    app.use('/api/v1/contacts', router);
    /**
 * @swagger
 * /api/v1/contacts:
 *  get:
 *    summary: Get contacts by filter
 *    description: Get contacts by filter
 *    parameters:
 *      - in: query
 *        name: favorite
 *        schema:
 *          type: boolean
 *        description: Filter by favorite status
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Filter by contact name
 *      - $ref: '#/components/parameters/limitParam'
 *      - $ref: '#/components/parameters/pageParam'
 *    tags:
 *      - contacts
 *    responses:
 *      200:
 *        description: A list of contacts
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [success]
 *                data:
 *                  type: object
 *                  properties:
 *                    contacts:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Contact'
 *                    metadata:
 *                      $ref: '#/components/schemas/PaginationMetadata'
 *      400:
 *        description: Bad Request - Invalid query parameters
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [error]
 *                message:
 *                  type: string
 *                  description: Details about the error
 *      404:
 *        description: Not Found - No contacts found matching the filter
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [error]
 *                message:
 *                  type: string
 *                  description: No contacts found
 *      500:
 *        description: Internal Server Error - Unexpected error occurred
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [error]
 *                message:
 *                  type: string
 *                  description: Details about the internal error
 */

    router.get('/', contactsController.getContactsByFilter);
    
    /**
 * @swagger
 * /api/v1/contacts:
 *  post:
 *    summary: Create a new contact
 *    description: Create a new contact
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Contact'
 *    tags:
 *      - contacts
 *    responses:
 *      201:
 *        description: A new contact created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [success]
 *                data:
 *                  type: object
 *                  properties:
 *                    contact:
 *                      $ref: '#/components/schemas/Contact'
 *      400:
 *        description: Bad Request - Validation errors
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [error]
 *                message:
 *                  type: string
 *                  description: Details about validation errors
 *      409:
 *        description: Conflict - Contact already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [error]
 *                message:
 *                  type: string
 *                  description: Details about the conflict
 *      500:
 *        description: Internal Server Error - Unexpected error occurred
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  description: The response status
 *                  enum: [error]
 *                message:
 *                  type: string
 *                  description: Details about the internal error
 */

    router.post('/', avatarUpload, contactsController.createContact);

/**
 * @swagger
 *  /api/v1/contacts:
 *    delete:
 *      summary: Delete all contacts
 *      description: Delete all contacts
 *      tags:
 *        - contacts
 *      responses:
 *        200:
 *          description: All contacts deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: The response status
 *                    enum: [success]
 *                  message:
 *                    type: string
 *                    description: Confirmation message
 *        404:
 *          description: Not Found - No contacts to delete
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: The response status
 *                    enum: [error]
 *                  message:
 *                    type: string
 *                    description: No contacts found to delete
 *        500:
 *          description: Internal Server Error - Unexpected error occurred
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    description: The response status
 *                    enum: [error]
 *                  message:
 *                    type: string
 *                    description: Details about the internal error
 */

    router.delete('/', contactsController.deleteAllContacts);
    router.all('/', methodNotAllowed);

    /**
     * @swagger
     *  /api/v1/contacts/{id}:
     *    get:
     *      summary: Get contact by ID
     *      description: Get contact by ID
     *      parameters:
     *        - $ref: '#/components/parameters/contactIdParam'
     *      tags:
     *        - contacts
     *      responses:
     *        200:
     *          description: A contact
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  status:
     *                    type: string
     *                    description: The response status
     *                    enum: [success]
     *                  data:
     *                    type: object
     *                    properties:
     *                      contact:
     *                        $ref: '#/components/schema/Contact'
     */
    router.get('/:id', contactsController.getContact);

    /**
     * @swagger
     *   /api/v1/contacts/{id}:
     *     put:
     *       summary: Update contact by ID
     *       description: Update contact by ID
     *       parameters:
     *         - $ref: '#/components/parameters/contactIdParam'
     *       requestBody:
     *         required: true
     *         content:
     *           multipart/form-data:
     *             schema:
     *               $ref: '#/components/schemas/Contact'
     *       tags:
     *         - contacts
     *       responses:
     *         200:
     *           description: An updated contact
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   status:
     *                     type: string
     *                     description: The response status
     *                     enum: [success]
     *                   data:
     *                     type: object
     *                     properties:
     *                       contact:
     *                         $ref: '#/components/schemas/Contact'
     */
    router.put('/:id', avatarUpload, contactsController.updateContact);
    
    /**
     * @swagger
     *   /api/v1/contacts/{id}:
     *     delete:
     *       summary: Delete contact by ID
     *       description: Delete contact by ID
     *       parameters:
     *         - $ref: '#/components/parameters/contactIdParam'
     *       tags:
     *         - contacts
     *       responses:
     *         200:
     *           description: Contact deleted
     *           $ref: '#/components/responses/200NoData'
     */
    router.delete('/:id', contactsController.deleteContact);
    router.all('/:id', methodNotAllowed);
};