const router = require('express').Router();

const fs = require('fs')
    , ytdl = require('ytdl-core')
    , path = require('path')
    , ffmpeg   = require('fluent-ffmpeg')
    , rs = require('randomstring');

router.get('/', async (req, res) => {
    res.render('index', { error: null });
})
router
    .post('/', async (req, res) => {
        try {
        const video_url = req.body.url;
        const format_chosen = req.body.format;

        if (!video_url) return res.render('index', { error: 'No video URL found.' });
        if (!format_chosen) return res.render('index', { error: 'No format provided.' });
        if (format_chosen !== 'mp3' && format_chosen !== 'mp4') return res.render('index', { error: 'Incorrect/unsupported format supplied, please use "mp3" or "mp4".' });

        let video_id;
        if (video_url.startsWith('https://youtube.com/watch?v=')) {
            video_id = video_url.split('?v=')[1];
        }
        if (video_url.startsWith('https://youtu.be/')) {
            video_id = video_url.split('be/')[1];
        }

        const code = `${rs.generate(12)}`;
        if (format_chosen === 'mp4') {
            const s = ytdl(`${video_url}`, { filter: (format) => format.container === `mp4` })
            .pipe(fs.createWriteStream(path.resolve(`${code}.mp4`)));

            s.on('end', () => {
                res.redirect(`/download/${code}.mp4`);
            });
        }
        if (format_chosen === 'mp3') {
            const stream = ytdl(`${video_url}`, { filter: (format) => format.container === `mp4` });

            ffmpeg(stream)
                .audioBitrate(128)
                .save(`${__dirname}/${code}.mp3`)
                .on('end', () => {
                    res.redirect(`/download/${code}.mp3`);
                });
        }

        }
        catch(err) {
            console.error(err);
            return res.render('index', { error: 'Unknown error: "'+err+'"' });
        }
    });

    router.get('/download/:id', async (req, res) => {
        let thing = req.params.id;
        if (!thing) return res.redirect('/');

        res.sendFile(path.resolve(__dirname + `/${thing}`));
    });

module.exports = router;