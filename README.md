⚡ **ytdown** — A fat-free, quick, open source YouTube downloader.  
   [Check it out live here.](https://ytdown.glitch.me)

## What is this?
ytdown is a quick, small node.js YouTube downloader/converter, that can download any* YouTube video in mp3 or mp4, just by providing a video link.  
  
*\* limted to non-protected videos, some cannot be downloaded due to country or law/copyright restrictions.*

## Don't these already exist? Why did you make your own?
I made this since I regularly download songs to listen to offline, but usually I run into an issue: the existing downloaders either break lots, or are so full of ads they just hurt. I made my own for personal use so I could download my songs without the need to go through the pain of ads. I've also made it open source and hosted a public version for others to use, because why not? It does help. :smile:

## Can I run my own copy?
Of course! You'll need to have some spare space on your PC (or on your VPS or such that will host this), as well as the latest stable versions of node.js and npm (plus git). Just use `git clone https://github.com/ThatTonybo/ytdown.git` to clone the files, head into the folder and run `npm install`, then run `node .` to start ytdown, which will run on port 3000 by default.

## Ideas/current to-do list:
PS: If you think you could do any of these, go ahead and submit a PR with the code and I'll happily add it!  
  
- [ ] Delete downloaded files after 24 hours?  
- [ ] Instead of using a random string for the downloaded file, get the video title/ID and set it as that.  
- [ ] Add a "downloading" page to show progress?  
- [x] ~~Add some error handlers, like a "run out of space" error for things that actually kill the process.~~
- [ ] A better UI design that fully works on mobile. **[in progress]**  

## Screenshots?
![Success!](https://i.imgur.com/UL7F30W.png)
![Oh no an error..](https://i.imgur.com/Ef6fCcV.png)

Made with :heart: by ThatTonybo — [buy me a coffee :coffee:](https://paypal.me/tonyboo)!
