/**
 * Created by jdf-zhongtingbing on 2017/6/6.
 */
import React from "react";
import { Slider } from "antd";
// import classNames from "classnames";
import qpImg from "../assets/image/全屏.svg";
import sxtImg2 from "../assets/image/摄像头 (2).svg";
import jtImg from "../assets/image/截图.svg";
import ylImg from "../assets/image/音量.svg";
import htImg from "../assets/image/话筒.svg";
import EZUIKit from "ezuikit-js";

import "antd/lib/slider/style/css"; // 加载 CSS

import "antd/dist/antd.css";

import "./ztbVideo.less";

// const prefixCls = "video-ztb";

export default class ZtbVideo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      voice: 30,
    };
  }

  onFull = () => {
    this.video.requestFullscreen();
  };

  play = () => {
    this.player.play();
    this.setState({
      playing: true,
    });
  };

  componentDidMount() {
    const { videoId, accessToken, urlSrc } = this.props;
    this.initVideo(videoId, accessToken, urlSrc);
  }

  initVideo = (videoId, accessToken, urlSrc) => {
    this.player = new EZUIKit.EZUIKitPlayer({
      id: videoId,
      accessToken,
      url: urlSrc,
      audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      openSoundCallBack: (data) => console.log("开启声音回调", data),
      closeSoundCallBack: (data) => console.log("关闭声音回调", data),
      startSaveCallBack: (data) => console.log("开始录像回调", data),
      stopSaveCallBack: (data) => console.log("录像回调", data),
      capturePictureCallBack: (data) => console.log("截图成功回调", data),
      fullScreenCallBack: (data) => console.log("全屏回调", data),
      getOSDTimeCallBack: (data) => console.log("获取OSDTime回调", data),
    });
    this.player.play();
  };

  voiceChange = (voice) => {
    this.setState({ voice });
    this.video.volume = voice / 100;
  };

  videoClick = () => {
    this.player.stop();
    this.setState({
      playing: false,
    });
  };

  render() {
    const { videoId, title } = this.props;
    const { playing, voice } = this.state;
    // console.log(videoId, "videoId");
    return (
      <div className="video-ztb-wrap">
        <div className="video-ztb">
          <div className="video-container" id={videoId}></div>
          {!playing && (
            <div onClick={this.play} className="start-btn">
              <div />
            </div>
          )}
          <div className="video-btns">
            <div className="v-name">{title}</div>
            <div className="v-right">
              <div className="v-tip">延时播放</div>
              <div className="v-tip">回放</div>
              <div className="v-tip">标/高清</div>
              <div className="v-tip">状态:正常</div>
              <img className="ht" src={htImg} />
              <img className="w17-13" src={sxtImg2} />
              <div className="w15-15">
                <img src={ylImg} />
                <Slider
                  value={voice}
                  onChange={this.voiceChange}
                  className="yl-control"
                  vertical
                />
              </div>

              <img className="w16-16" src={jtImg} />
              <img onClick={this.onFull} className="w13-13" src={qpImg} />
              <div className="xzbd">下载本地</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
