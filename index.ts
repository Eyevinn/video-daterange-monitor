import Hls, { Events, FragChangedData } from "hls.js";
import { EmitterBaseClass } from "./lib/EmitterBaseClass";

export enum MonitorEvents {
  ALL = "*",
  DATA_RECEIVED = "data_received",
  DATA_TRIGGERED = "data_triggered",
}

export class VideoDateRangeMonitor extends EmitterBaseClass {
  private playerEngine?: HTMLVideoElement | Hls;
  private checkInStreamMetaDataReference?: () => void;

  constructor() {
    super();
  }

  public monitor(playerEngine) {
    this.destroy();
    this.playerEngine = playerEngine;
    if (this.playerEngine instanceof Hls) {
      this.checkInStreamMetaDataReference = this.hlsjsListener.bind(this);
      this.playerEngine.on(
        Hls.Events.FRAG_CHANGED,
        this.checkInStreamMetaDataReference
      );
    }
    if (this.playerEngine instanceof HTMLVideoElement) {
      this.checkInStreamMetaDataReference = this.nativeListener.bind(this);
      this.playerEngine.textTracks.addEventListener(
        "addtrack",
        this.checkInStreamMetaDataReference
      );
    }
  }

  private nativeListener(evt: any) {
    const track: TextTrack = evt.track;
    if (track.kind === "metadata") {
      track.mode = "hidden";
      track.addEventListener("cuechange", (cueChangeEvent: any) => {
        if (
          cueChangeEvent.target &&
          (cueChangeEvent.target as any).activeCues
        ) {
          const cues: TextTrackCueList = (cueChangeEvent.target as any)
            .activeCues;
          if (!cues) return;
          const payload: any = {};
          for (let i = 0; i < cues.length; i++) {
            const cue = cues[i];
            if (!cue) return;
            const cueValue = (cue as any).value;
            payload[cueValue.key] = cueValue.data;
            if (!cueValue) return;
          }
          this.emit(MonitorEvents.DATA_RECEIVED, { ...payload });
        }
      });
    }
  }

  private hlsjsListener(e: Events.FRAG_CHANGED, data: FragChangedData): void {
    const tags = data.frag.tagList;
    tags.forEach((tag) => {
      if (
        Array.isArray(tag) &&
        tag.length > 1 &&
        tag[0] === "EXT-X-DATERANGE"
      ) {
        const data = tag[1].split(",");
        if (!data || !Array.isArray(data)) return;
        const payload = {};
        data.forEach((info: string) => {
          const infoSplit = info.split("=");
          const key = infoSplit[0];
          const value = infoSplit[1].replace(/"/g, "");
          payload[key] = value;
        });
        this.emit(MonitorEvents.DATA_RECEIVED, { ...payload });
      }
    });
  }

  public destroy() {
    if (this.playerEngine instanceof Hls) {
      this.playerEngine.destroy();
    }
    if (
      this.checkInStreamMetaDataReference &&
      this.playerEngine instanceof HTMLVideoElement &&
      (this.playerEngine as HTMLVideoElement).textTracks
    ) {
      this.playerEngine.textTracks.removeEventListener(
        "addtrack",
        this.checkInStreamMetaDataReference
      );
    }
  }
}
