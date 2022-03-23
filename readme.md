Video Daterange Monitor
===

Emits daterange data when exposed in the hls stream

## Usage

```js
import { VideoDateRangeMonitor, MonitorEvents } from "@eyevinn/video-daterange-monitor";

const videoElement = document.querySelector("video");
const videoDateRangeMonitor = new VideoDateRangeMonitor();
videoDateRangeMonitor.on(MonitorEvents.ALL, (event, data) => {
  console.log(`[Daterange] ${event}:`, data);
});
videoDateRangeMonitor.monitor(videoElement);
```

The `monitor` method can take either a video element or a hls.js instance as argument.

## About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in the sense that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This gives us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
