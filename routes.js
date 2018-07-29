const router = require('express').Router();

const fs = require('fs')
    , ytdl = require('ytdl-core')
    , path = require('path')
    , ffmpeg   = require('fluent-ffmpeg-extended')
    , rs = require('randomstring');

router.get('/', async (req, res) => {
    res.render('index', { error: null });
})
router
    .post('/', async (req, res) => {
        try {
            const code = `${rs.generate(12)}`;
            const video_url = req.body.url;
            const format_chosen = req.body['format'];

            if (!video_url)
            return res.render('index', { error: { type: 'error', msg: 'No video URL found, provide a youtube.com or youtu.be video link.' } });

            if (format_chosen !== 'mp3' && format_chosen !== 'mp4' && !format_chosen && format_chosen === '')
            return res.render('index', { error: { type: 'error', msg: 'No format supplied, please select "mp3" or "mp4".' } });

            if (format_chosen === 'mp4') {
                const s = ytdl(`${video_url}`, { filter: (format) => format.container === `mp4` })
                .pipe(fs.createWriteStream(path.resolve(`${code}.mp4`)));

                s.on('end', () => {
                    return res.render('index', { error: { type: 'success', msg: `Video downloaded to ${code}.mp4, <a href="/download/${code}.mp4">click here</a> to download it.` } });
                });
            }
            if (format_chosen === 'mp3') {
                const stream = ytdl(`${video_url}`, { filter: (format) => format.container === `mp4` });

                ffmpeg(stream)
                withAudioBitrate('128k').toFormat('mp3').savetoFile(`${__dirname}/${code}.mp3`, async(stdout, stderr) => {
                    return res.render('index', { error: { type: 'success', msg: `Video downloaded to ${code}.mp3, <a href="/download/${code}.mp3">click here</a> to download it.` } });
                });
            }

        }
        catch (err) {
            console.error(err);
            return res.render('index', { error: { type: 'error', msg: 'An error occured: "'+err+'"' } });
        }
    });

    router.get('/download/:id', async (req, res) => {
        let thing = req.params.id;
        if (!thing) return res.redirect('/');

        try {
            res.sendFile(path.resolve(__dirname + `/${thing}`));
        }
        catch (err) {
            return res.render('index', { error: { type: 'error', msg: 'Unable to find that download: the file doesn\'t exist, was deleted, or you don\'t have access.' } });
        }
    });

module.exports = router;