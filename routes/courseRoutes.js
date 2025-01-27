const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Import the Course model

// Create Course API
router.post('/courses', async (req, res) => {
    const course = new Course(req.body);

    try {
        await course.save();
        res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating course' });
    }
});

// Update Course API
router.patch('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Find the course by ID
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Apply updates to course
        Object.keys(updates).forEach((key) => {
            if (key === 'modules') {
                // Handle module updates
                updates.modules.forEach((modUpdate) => {
                    if (modUpdate._id) {
                        const module = course.modules.id(modUpdate._id);
                        if (module) {
                            Object.assign(module, modUpdate);
                        }
                    } else {
                        // Add new module
                        course.modules.push(modUpdate);
                    }
                });
            } else {
                // Update top-level fields
                course[key] = updates[key];
            }
        });

        await course.save();
        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Course by ID
router.get('/courses/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
