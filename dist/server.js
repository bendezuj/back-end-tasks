import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});
app.post('/tasks', async (req, res) => {
    const { title, color } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                color,
            },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: { title, color, completed },
        });
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
