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

import "antd/lib/slider/style/css"; // 加载 CSS

// import "antd/dist/antd.css";

import "./ztbVideo.less";

const prefixCls = "video-ztb";

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
    this.video.play();
    this.setState({
      playing: true,
    });
  };

  componentDidMount() {
    this.video.play();
  }

  voiceChange = (voice) => {
    this.setState({ voice });
    this.video.volume = voice / 100;
  };

  videoClick = () => {
    this.video.pause();
    this.setState({
      playing: false,
    });
  };

  render() {
    const {
      className,
      urlSrc = "http://10.66.69.77:8080/hls/mystream.m3u8",
    } = this.props;
    const { playing, voice } = this.state;
    const testUrl = "https://www.runoob.com/try/demo_source/mov_bbb.mp4";

    return (
      <div className="video-ztb-wrap">
        <div className="video-ztb">
          <video
            autoplay
            muted
            ref={(refs) => (this.video = refs)}
            onClick={this.videoClick}
            src={urlSrc}
            playsInline
            webkit-playsinline
          >
            {/* <source src={urlSrc} /> */}
          </video>
          {!playing && (
            <div onClick={this.play} className="start-btn">
              <div />
            </div>
          )}

          <div className="video-btns">
            <div className="v-name">东北角001</div>
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
