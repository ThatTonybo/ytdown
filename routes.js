const router = require('express').Router();

router
    .get('/', async (req, res) => {
        res.render('index', { error: null });
    })
router
    .post('/', async (req, res) => {
        const video_url = req.body.url;

        if (!video_url) return res.render('index', { error: 'No video URL found.' });

        let video_id = '';
        if (video_url.startsWith('https://youtube.com/watch?v=')) {
            video_id = video_url.spk
        }
    });

module.exports = router;