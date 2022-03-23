import { VideoDateRangeMonitor } from "../index.ts";
import Hls from "hls.js";

const channelEngineHlsStream = "https://demo.vc.eyevinn.technology/channels/adtest/master.m3u8";

function inStreamDataHandler(data) {
  console.log(`[DEMO] in stream data:`, data);
}

const videoDateRangeMonitor = new VideoDateRangeMonitor(inStreamDataHandler);

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
