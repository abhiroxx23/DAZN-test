import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    rating: Number,
    streamingLink: String
})

export const movieModel = mongoose.model('Movie',movieSchema)