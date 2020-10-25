import React from "react";
import { Icon } from "antd-mobile";
import sxtImg from "../../assets/image/摄像头.svg";
import sxtImg2 from "../../assets/image/摄像头 (2).svg";

import "./left.less";
const prefixCls = "left-oio";
class Left extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expendList: [0, 1, 2, 3],
    };
  }

  titleClick = (index) => {
    const { expendList } = this.state;
    const newList =
      expendList.indexOf(index) === -1
        ? [...expendList, index]
        : expendList.filter((item) => item !== index);
    this.setState({
      expendList: newList,
    });
    if (expendList.indexOf(index) === -1) {
      this.props.onPaClick(index);
    }
  };

  render() {
    const {
      menuData = [],
      typeChange,
      radioType,
      value,
      onChange,
    } = this.props;
    const { expendList } = this.state;

    return (
      <div className={prefixCls}>
        <div className="top-tag">
          <span>监控</span>
        </div>
        <div className="title1">
          <div />
          <div>播放所有</div>
        </div>
        <div className="btns">
          <div
            className={radioType === 0 ? "checked" : ""}
            onClick={() => {
              typeChange(0);
            }}
          >
            2X2
          </div>
          <div
            className={radioType === 1 ? "checked" : ""}
            onClick={() => {
              typeChange(1);
            }}
          >
            3X3
          </div>
          <div
            className={radioType === 2 ? "checked" : ""}
            onClick={() => {
              typeChange(2);
            }}
          >
            全屏
          </div>
        </div>
        <div className={"tree"}>
          {menuData.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className="title1"
                  onClick={() => {
                    this.titleClick(index);
                  }}
                >
                  <div />
                  <div>{item.name}</div>
                  <Icon type={expendList.indexOf(index) > -1 ? "up" : "down"} />
                </div>
                <div
                  style={{
                    marginTop: "12px",
                    display: expendList.indexOf(index) > -1 ? "block" : "none",
                  }}
                >
                  {item.devices.map((child, index) => {
                    return (
                      <div
                        className={`${
                          value === child.deviceId ? "check" : ""
                        } child`}
                        key={index}
                        onClick={() => {
                          onChange(
                            child.deviceId,
                            item.name,
                            child.name,
                            child.url
                          );
                        }}
                      >
                        <img
                          src={value === child.deviceId ? sxtImg : sxtImg2}
                        />
                        <span>{child.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Left;
