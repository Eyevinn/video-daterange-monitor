import { VideoDateRangeMonitor, MonitorEvents } from "../index.ts";
import Hls from "hls.js";

const channelEngineHlsStream = "https://demo.vc.eyevinn.technology/channels/adtest/master.m3u8";

const videoDateRangeMonitor = new VideoDateRangeMonitor();
videoDateRangeMonitor.on(MonitorEvents.ALL, (event, data) => {
  console.log(`[DEMO] ${event}:`, data);
});
let videoElement;

document.addEventListener("DOMContentLoaded", () => {
  videoElement = document.querySelector("video");

  if (
    // eslint-disable-next-line no-extra-boolean-cast
    !!document
      .createElement("video")
      .canPlayType("application/vnd.apple.mpegurl")
  ) {
    initNativePlayback();
  } else {
    initMediaSourcePlayback();
  }
});

function initNativePlayback() {
  videoElement.src = channelEngineHlsStream;
  videoElement.play();
  videoDateRangeMonitor.monitor(videoElement);
}

function initMediaSourcePlayback() {
  var hls = new Hls();
  hls.attachMedia(videoElement);
  hls.loadSource(channelEngineHlsStream);
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    videoElement.play();
  });
  videoDateRangeMonitor.monitor(hls);
}
