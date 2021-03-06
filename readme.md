Video Daterange Monitor
===

Report daterange data into sent in callback, when exposed in the hls stream

## Usage

```js
import { VideoDateRangeMonitor } from "@eyevinn/video-daterange-monitor";

const videoElement = document.querySelector("video");

function inStreamDataHandler(data) {
  console.log(`[DEMO] in stream data:`, data);
}

const videoDateRangeMonitor = new VideoDateRangeMonitor(inStreamDataHandler);

videoDateRangeMonitor.monitor(videoElement);
```

The `monitor` method can take either a video element or a hls.js instance as argument.

## About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in the sense that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This gives us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
