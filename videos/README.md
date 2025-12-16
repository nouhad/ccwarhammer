# Videos Folder

This folder is for storing video files that can be converted to GIFs for use on the website.

## Usage

1. Upload your video file to this folder
2. Use ffmpeg to convert it to a GIF format

## Example Conversion Command

```bash
# Convert video to looping GIF
ffmpeg -i input-video.mp4 -vf "fps=10,scale=800:-1:flags=lanczos" -loop 0 output.gif
```

## Supported Video Formats

- MP4
- MOV
- AVI
- WebM
- And other formats supported by ffmpeg
