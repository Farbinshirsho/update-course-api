const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    modules: [
        {
            moduleName: { type: String, required: true },
            videos: [
                {
                    title: { type: String, required: true },
                    url: { type: String, required: true }
                }
            ]
        }
    ]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
