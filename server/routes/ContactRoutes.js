import { Router } from 'express'
import { verifyToken } from '../middlewares/AuthMiddleware.js'
import { searchContacts, getContactsForDMList } from '../controllers/ContactsController.js'

const contactsRoute = Router()

contactsRoute.post('/search', verifyToken, searchContacts)
contactsRoute.get('/get-contacts-for-dm', verifyToken, getContactsForDMList)

export default contactsRoute