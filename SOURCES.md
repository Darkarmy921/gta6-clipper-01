# Sources and build record — gta6-clipper-01

## Footage source

- **Source:** Rockstar Games' official public upload, "Grand Theft Auto VI Trailer 2"
  (May 2025), Rockstar Games YouTube channel.
- **URL:** https://www.youtube.com/watch?v=VQRLujxTm3c
- **Downloaded in-session** with yt-dlp (installed in-session via
  `pip3 install --user --break-system-packages yt-dlp`), 1080p, 1920×1080,
  30 fps, 166.75 s, 33 MB. No footage from any other creator's video was used,
  nothing was fabricated, and the clip claims nothing it does not show.

## The moment chosen

One contiguous sequence from Trailer 2 — the trailer's climax chase run,
**02:18–02:30 (138–150 s)**:

| Trailer time | Shot |
| --- | --- |
| 02:18–02:20 (138–140 s) | Helicopter hunting low over the swamp and open water |
| 02:20–02:22 (140–142 s) | Jason and Lucia escaping on a jet ski, Vice City skyline behind them |
| 02:22–02:24 (142–144 s) | Low-angle biker with a plane overhead |
| 02:24–02:30 (144–150 s) | Night truck and boat chase |

The pitch background is the golden-hour Vice City vista at **02:33–02:36
(153–156 s)**, slowed to half speed, and the end card is a darkened still of
the jet-ski shot at **02:21 (141 s)**.

**Why this moment:** it opens mid-chase with zero setup — helicopter, spray
and skyline inside the first two seconds — which is what decides whether a
Shorts viewer stays. Two protagonists, motion and a recognisable skyline in a
single frame, in the game's launch week.

## Creative decisions

- **Hook (first 2 s):** the clip opens on the helicopter over the water,
  cutting straight to the jet ski. No title card, no setup.
- **Captions (burned in, DejaVu Sans Bold, white on a translucent black box,
  placed below the video band in the vertical safe area):** "GTA 6 IS HERE"
  (0–4 s), "JASON & LUCIA / OUTRUN EVERYTHING" (4–8 s), "VICE CITY HAS NEVER /
  LOOKED LIKE THIS" (8–12 s).
- **Pitch (on screen AND spoken):** "MAKE CLIPS LIKE THIS / WITH AI"
  (12–18 s, over the vista), "AND EARN MONEY / ON MAKE.FUN" (18–24 s),
  "make.fun/bounty/ / gta6-clipper-01" (24–30 s). Spoken voiceover: "GTA 6 is
  finally here. Jason and Lucia just outran everything Vice City threw at
  them. Now it's your turn. Make clips like this with AI, and earn money on
  make.fun. Go to make.fun slash bounty slash GTA 6 clipper 01. Link in the
  description."
- **Voice:** text-to-speech generated in-session. `edge-tts` was tried first
  and failed (the egress proxy breaks TLS to speech.platform.bing.com:
  `SSL: WRONG_VERSION_NUMBER`), as did `apt-get install espeak-ng` (proxy
  fetch failure). The voice was instead generated with Google Translate's TTS
  endpoint via curl, three chunks under 200 characters each, concatenated and
  sped up 1.2× to fit the 12–30 s pitch window (20.66 s → ~17.2 s).
- **Vertical treatment:** 16:9 footage converted to 1080×1920 with a
  blurred-fill background (the full frame stays visible; nothing important is
  cropped off the sides). The end card is a full-frame still, not blur-fill.
- **Audio:** original trailer audio at full volume for the hook (0–12 s),
  ducked to 25% under the voiceover for the pitch (12–30 s).
- **Title:** "Jason & Lucia Outrun Everything in GTA 6". Tags: #GTA6 #GTAVI #Shorts.

## Exact commands run

Work directory for the build was `~/workspace/makefun/gta6-clipper-01/work/`
(scratch only — the deliverables are the repo files and `clip.mp4`).

Download and inspection:

    ~/.local/bin/yt-dlp --no-download --get-title "https://www.youtube.com/watch?v=VQRLujxTm3c"
    ~/.local/bin/yt-dlp -f "bv*[height<=1080]+ba/b[height<=1080]" --merge-output-format mp4 -o trailer2.mp4 "https://www.youtube.com/watch?v=VQRLujxTm3c"
    ffprobe -v error -show_entries format=duration,size -show_entries stream=codec_type,width,height,r_frame_rate -of default=noprint_wrappers=1 trailer2.mp4
    ffmpeg -y -v error -i trailer2.mp4 -vf "fps=1/10,scale=320:180,tile=6x3" thumbs/contact.jpg
    ffmpeg -y -v error -ss 15 -i trailer2.mp4 -t 45 -vf "fps=1/3,scale=320:180,tile=5x3" thumbs/chase.jpg
    ffmpeg -y -v error -ss 125 -i trailer2.mp4 -t 35 -vf "fps=1/3,scale=320:180,tile=4x3" thumbs/vista.jpg
    ffmpeg -y -v error -ss 136 -i trailer2.mp4 -t 15 -vf "fps=1,scale=320:180,tile=5x3" thumbs/jetski.jpg
    ffmpeg -y -v error -ss 149 -i trailer2.mp4 -t 8 -vf "fps=1,scale=320:180,tile=4x2" thumbs/t150.jpg

Voiceover (three chunks, Google Translate TTS via curl):

    curl -s -m 30 -A "Mozilla/5.0" -o tts1.mp3 "https://translate.google.com/translate_tts?ie=UTF-8&q=GTA%206%20is%20finally%20here.%20Jason%20and%20Lucia%20just%20outran%20everything%20Vice%20City%20threw%20at%20them.&tl=en&client=tw-ob"
    curl -s -m 30 -A "Mozilla/5.0" -o tts2.mp3 "https://translate.google.com/translate_tts?ie=UTF-8&q=Now%20it%27s%20your%20turn.%20Make%20clips%20like%20this%20with%20AI%2C%20and%20earn%20money%20on%20make.fun.&tl=en&client=tw-ob"
    curl -s -m 30 -A "Mozilla/5.0" -o tts3.mp3 "https://translate.google.com/translate_tts?ie=UTF-8&q=Go%20to%20make.fun%20slash%20bounty%20slash%20G%20T%20A%206%20clipper%2001.%20Link%20in%20the%20description.&tl=en&client=tw-ob"
    printf 'file tts1.mp3\nfile tts2.mp3\nfile tts3.mp3\n' > ttslist.txt
    ffmpeg -y -v error -f concat -safe 0 -i ttslist.txt -c copy tts.mp3

Caption text files (cap1.txt … capC2.txt) were written with printf, one
caption per file, then the still for the end card was extracted:

    ffmpeg -y -v error -ss 141 -i trailer2.mp4 -frames:v 1 frame141.png

Segment A — chase run, 12 s, vertical blur-fill, three captions:

    FONT=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
    ffmpeg -y -v error -ss 138 -t 12 -i trailer2.mp4 -filter_complex "[0:v]split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40[bg2];[fg]scale=1080:608[fg2];[bg2][fg2]overlay=(W-w)/2:(H-h)/2,drawtext=fontfile=$FONT:textfile=cap1.txt:fontsize=64:fontcolor=white:borderw=2:bordercolor=black:box=1:boxcolor=black@0.55:boxborderw=18:x=(w-text_w)/2:y=1300:enable='between(t,0,4)',drawtext=fontfile=$FONT:textfile=cap2.txt:fontsize=64:fontcolor=white:borderw=2:bordercolor=black:box=1:boxcolor=black@0.55:boxborderw=18:x=(w-text_w)/2:y=1260:line_spacing=10:enable='between(t,4,8)',drawtext=fontfile=$FONT:textfile=cap3.txt:fontsize=64:fontcolor=white:borderw=2:bordercolor=black:box=1:boxcolor=black@0.55:boxborderw=18:x=(w-text_w)/2:y=1260:line_spacing=10:enable='between(t,8,12)'[v]" -map "[v]" -c:v libx264 -pix_fmt yuv420p -r 30 -an segA.mp4

Segment B — golden-hour vista, 3 s slowed to 6 s, pitch line 1
(first built from 151.5–154.5 s, which turned out to be an interior shot, not
the vista; rebuilt from the correct 153–156 s after inspecting the frames):

    ffmpeg -y -v error -ss 153 -t 3 -i trailer2.mp4 -filter_complex "[0:v]setpts=2.0*PTS,split=2[bg][fg];[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=40[bg2];[fg]scale=1080:608[fg2];[bg2][fg2]overlay=(W-w)/2:(H-h)/2,drawtext=fontfile=$FONT:textfile=capB.txt:fontsize=72:fontcolor=white:borderw=2:bordercolor=black:box=1:boxcolor=black@0.55:boxborderw=18:x=(w-text_w)/2:y=1240:line_spacing=12[v]" -map "[v]" -c:v libx264 -pix_fmt yuv420p -r 30 -an segB.mp4

Segment C — end card, 12 s, darkened jet-ski still, pitch lines 2 and 3:

    ffmpeg -y -v error -loop 1 -t 12 -i frame141.png -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,eq=brightness=-0.38:saturation=0.85,drawtext=fontfile=$FONT:textfile=capC1.txt:fontsize=76:fontcolor=white:borderw=2:bordercolor=black:box=1:boxcolor=black@0.55:boxborderw=20:x=(w-text_w)/2:y=780:line_spacing=12:enable='between(t,0,6)',drawtext=fontfile=$FONT:textfile=capC2.txt:fontsize=64:fontcolor=white:borderw=2:bordercolor=black:box=1:boxcolor=black@0.55:boxborderw=20:x=(w-text_w)/2:y=800:line_spacing=12:enable='between(t,6,12)'[v]" -map "[v]" -c:v libx264 -pix_fmt yuv420p -r 30 -an segC.mp4

Concat and audio mix (trailer audio ducked after 12 s, voiceover delayed
11.5 s and sped up 1.2×):

    ffmpeg -y -v error -i segA.mp4 -i segB.mp4 -i segC.mp4 -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1:a=0[outv]" -map "[outv]" -c:v libx264 -pix_fmt yuv420p -r 30 clip_video.mp4
    ffmpeg -y -v error -i clip_video.mp4 -ss 138 -t 30 -i trailer2.mp4 -i tts.mp3 -filter_complex "[1:a]apad,volume='if(lt(t,12),1,0.25)':eval=frame[bg];[2:a]atempo=1.2,adelay=11500:all=1[vo];[bg][vo]amix=inputs=2:duration=first:dropout_transition=0[aout]" -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 160k -t 29.97 clip.mp4

Two defects were found during verification and fixed in-session (see below);
the commands above are the final, corrected versions.

## Verification

- `ffprobe clip.mp4`: H.264 video 1080×1920, 30 fps; AAC audio, 24 kHz,
  mono; duration 29.97 s; 7,449,867 bytes (~7.1 MB).
- Frame inspection at 1 s, 5 s, 10 s, 14 s, 20 s, 27 s (viewed as a contact
  sheet): helicopter hook with "GTA 6 IS HERE", biker with "JASON & LUCIA
  OUTRUN EVERYTHING", boat chase with "VICE CITY HAS NEVER LOOKED LIKE THIS",
  sunset vista with "MAKE CLIPS LIKE THIS WITH AI", darkened jet-ski still
  with "AND EARN MONEY ON MAKE.FUN" and "make.fun/bounty/gta6-clipper-01".
  All captions legible, no black bars, no cropping errors.
- Audio loudness: 0–12 s mean −13.9 dB / max −2.9 dB (trailer full);
  12–30 s mean −23.8 dB / max −8.2 dB (ducked trailer + voiceover, no
  silence in the pitch section).
- Program check: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out
  node main.ts` — out/VIDEO.json byte-identical to repo VIDEO.json
  (placeholder until the clip is posted and the real address is filled in).

## Defects found and fixed in-session

1. First render: `tpad=stop_mode=clone:stop_duration=6` in the concat step
   padded segment B by 6 s instead of topping it up to 6 s, so B ran ~12 s,
   the video totalled 35.97 s, and the final `-t 30` cut truncated the end
   card — the "make.fun/bounty/gta6-clipper-01" line never appeared. Fixed by
   removing the tpad and concatenating directly (total 29.97 s).
2. First segment B used trailer 151.5–154.5 s, which frame inspection showed
   is an interior shot, not the golden-hour vista. Rebuilt B from 153–156 s
   after checking the 149–157 s strip frame by frame.
