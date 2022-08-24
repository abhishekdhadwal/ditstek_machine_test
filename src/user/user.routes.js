import express from 'express';
import controller from './user.controller.js';
import { verify_token } from '../auth/index.auth.js';
const router = express.Router();


router.post("/users/signup", controller.create_user)
router.post("/users/login", controller.user_login)
router.put("/users", verify_token, controller.update_users)
router.get("/users", controller.list_users)
router.delete("/users/:_id", verify_token, controller.delete_a_user)


export default router


