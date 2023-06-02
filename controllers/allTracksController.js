const Track = require('../models/trackModel')




const getAllTracks = async (req, res) => {
    const { authorization } = req.headers
    let tracks
    if (authorization !== 'all')
        tracks = await Track.find({ 'genre': authorization }).sort({ createdAt: -1 })
    else
        tracks = await Track.find({}).sort({ createdAt: -1 })

    res.status(200).json(tracks)
}

module.exports = { getAllTracks }