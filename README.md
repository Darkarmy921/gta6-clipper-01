# Jason & Lucia Outrun Everything in GTA 6 — gta6-clipper-01

[![make.fun bounty](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![Rank](https://make.fun/badge/gta6-clipper-01/Darkarmy921/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![Reward](https://make.fun/badge/gta6-clipper-01/Darkarmy921/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

Entry for the make.fun bounty **"Clip GTA 6 for the most YouTube views"** ($500, top 20 share). The entry is a public YouTube Short: a 30-second vertical cut of Rockstar's official GTA VI Trailer 2, which then pitches make.fun to the viewer. Places go by the video's views at the deadline — the most watched wins.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.

## The clip

**Title:** Jason & Lucia Outrun Everything in GTA 6

**The moment (one contiguous sequence, Trailer 2, 02:18–02:30):** the trailer's climax chase run — a helicopter hunting over the Leonida swamp and open water, Jason and Lucia escaping on a jet ski with the Vice City skyline behind them, a low-angle biker shot with a plane overhead, and the night boat chase. It opens mid-chase with zero setup: motion, spray and skyline in the first two seconds, which is what holds a Shorts viewer.

**Structure (30 seconds, 1080×1920, H.264 + AAC):**

| Time | What you see | What it says |
| --- | --- | --- |
| 0:00–0:12 | The chase run (Trailer 2, 02:18–02:30), vertical blur-fill, original trailer audio | "GTA 6 IS HERE" → "JASON & LUCIA OUTRUN EVERYTHING" → "VICE CITY HAS NEVER LOOKED LIKE THIS" |
| 0:12–0:18 | Golden-hour Vice City vista (Trailer 2, 02:33–02:36), slowed to half speed | "MAKE CLIPS LIKE THIS WITH AI" |
| 0:18–0:30 | End card: darkened jet-ski still from 02:21 | "AND EARN MONEY ON MAKE.FUN" → "make.fun/bounty/gta6-clipper-01" |

**The make.fun pitch** is on screen for the whole second half and spoken too, in a voiceover generated in the build session: *"GTA 6 is finally here. Jason and Lucia just outran everything Vice City threw at them. Now it's your turn. Make clips like this with AI, and earn money on make.fun. Go to make.fun slash bounty slash GTA 6 clipper 01. Link in the description."*

**Footage:** Rockstar Games' official public trailer only — Grand Theft Auto VI Trailer 2, Rockstar Games YouTube channel, https://www.youtube.com/watch?v=VQRLujxTm3c. No footage from other creators, nothing fabricated, nothing claimed that the clip does not show. Full source notes and the exact build commands are in [SOURCES.md](SOURCES.md).

## How the clip was made

In the build session, with ffmpeg only: the trailer was downloaded from Rockstar's official YouTube upload, the 02:18–02:30 chase run was trimmed and converted to vertical 9:16 with a blurred-fill background (the full 16:9 frame stays visible, nothing important cropped off the sides), captions were burned in with ffmpeg drawtext, the golden-hour vista was slowed to half speed under the first pitch line, and the end card was built from a darkened still of the jet-ski shot. The voiceover was generated in-session with a text-to-speech voice and mixed under the ducked trailer audio. Every frame was inspected after rendering before the file was kept.

## Posting the clip (YouTube)

The clip is `clip.mp4` in this repository. It is posted by the channel owner as a **public** Short (a vertical clip under 60 seconds becomes a Short automatically):

1. Upload `clip.mp4` to YouTube from your channel, visibility **Public**, any time after the bounty opened (2026-11-20T01:00:00Z) and before it closes (2026-11-23T01:00:00Z).
2. Title: `Jason & Lucia Outrun Everything in GTA 6`
3. Description: copy `youtube-description.txt` exactly — its first line is the bounty's required line (word for word) and its second line is the account's play code `makefun-orca-wreath-pocket`. Both must stay in the description until the results are out.
4. Tags: `#GTA6 #GTAVI #Shorts`.
5. Keep the video public until the results are out (due 2026-12-07). A video gone or no longer public at the deadline takes no place.
6. Copy the video's address (Share → Copy) and put it in `VIDEO.json` as `{"url": "https://www.youtube.com/shorts/<id>"}` — the placeholder there now is not a real video and the gate refuses it until it is replaced.

Never buy views or use bots or view services: an entry whose views were bought or botted is disqualified.

## The program

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from this repository to `/output/VIDEO.json`. That is all it does — the house reads the video's views itself through the YouTube Data API.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/VIDEO.json` is then byte-identical to this directory's `VIDEO.json`.
