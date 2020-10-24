import React from "react";
import { Icon } from "antd-mobile";
import weatherImg from "../../assets/image/icon01.png";
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
                  <div>{item.value}</div>
                  <Icon type={expendList.indexOf(index) > -1 ? "up" : "down"} />
                </div>
                <div
                  style={{
                    marginTop: "12px",
                    display: expendList.indexOf(index) > -1 ? "block" : "none",
                  }}
                >
                  {item.children.map((child, index) => {
                    return (
                      <div
                        className={`${value === child.id ? "check" : ""} child`}
                        key={index}
                        onClick={() => {
                          onChange(child.id, item.value, child.value);
                        }}
                      >
                        <img src={weatherImg} />
                        <span>{child.value}</span>
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
