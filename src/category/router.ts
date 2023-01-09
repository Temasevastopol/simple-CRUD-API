import { Router } from 'express';
import { User } from './user';
import { createUser, deleteUser, getUsers, getUserById } from './repository';

const router = Router();

router.get('/', async(req, res) => {
    const users = await getUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const userId = Number(req.params.id);
    if (!userId) {
        return res.sendStatus(400);
    }
    const user = await getUserById(userId);
    if (!user) {
        return res.sendStatus(404);
    }
    res.json(user);
})

router.delete('/:id', async (req, res) => {
    const userId = Number(req.params.id);
    if (!userId)  {
        return res.sendStatus(400);
    }
    try {
        await deleteUser(userId);
        return res.sendStatus(200);        
    } catch (e) {
        return res.status(404).send(e);
    }
})

router.post('/', async (req, res) => {
    const data = req.body as User;
    if (!data.username) return res.sendStatus(400);
    try {
        const newUser = await createUser(data);
        return res.json(newUser);
    } catch (e) {
        return res.status(400).send(e)
    }
})
export default router;


