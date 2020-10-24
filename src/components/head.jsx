/**
 * Created by jdf-zhongtingbing on 2017/6/6.
 */
import React from "react";
import classNames from "classnames";
import weatherImg from "../assets/image/icon01.png";
import positonIMg from "../assets/image/位置.svg";
import "./head.less";

const prefixCls = "head-ztb";

export default class Table extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { className, title, value = 2 } = this.props;
    const cls = classNames({
      [prefixCls]: true,
      [className]: className,
    });
    return (
      <div className={cls}>
        <div className={`${cls}-title`}>{title}</div>
        <div className={`${cls}-tabs`}>
          <div className={value === 0 ? "checked" : ""}>
            首页
            <div />
          </div>
          <div className={value === 1 ? "checked" : ""}>
            BIM <div />
          </div>
          <div className={value === 2 ? "checked" : ""}>
            视频 <div />
          </div>
          <div className={value === 3 ? "checked" : ""}>
            机械与设备 <div />
          </div>
        </div>
        <div className={`${cls}-right`}>
          <img src={weatherImg} />
          <div className={`${cls}-right-m`}>
            <div className="top">
              <span>晴转多云</span>
              <span>28℃</span>
            </div>
            <div>2020-02-01 09:00</div>
          </div>
          <div className={`${cls}-right-r`}>
            <img src={positonIMg} />
            成都
          </div>
        </div>
      </div>
    );
  }
}
