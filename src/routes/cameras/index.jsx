import React from "react";
import { connect } from "dva";
import Head from "components/head";
import Left from "./left";
import Video from "components/ztbVideo";
import { Pagination } from "antd";
import "antd/lib/pagination/style/css"; // 加载 CSS
import "./index.less";

const prefixCls = "cameras-view74aa1b";

const radioTypeMap = {
  0: "two",
  1: "three",
  2: "one",
};
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      menuData: [
        {
          value: "围墙",
          id: "01",
          children: [
            {
              value: "东北角1",
              id: "0101",
            },
            {
              value: "东北角2",
              id: "0102",
            },
            {
              value: "东北角3",
              id: "0103",
            },
          ],
        },
        {
          value: "项目部",
          id: "02",
          children: [
            {
              value: "项目部1",
              id: "0201",
            },
            {
              value: "项目部2",
              id: "0202",
            },
            {
              value: "东项目部3",
              id: "0203",
            },
          ],
        },
      ],
      radioType: 0,
      menuValue: "",
      position: "",
      cameriaName: "",
    };
  }

  componentDidMount() {
    // var myVideo = document.getElementById("video1");
    // if (myVideo.paused) myVideo.play();
    // else myVideo.pause();
  }

  typeChange = (radioType) => {
    this.setState({ radioType });
  };

  menuValueChange = (menuValue, position, cameriaName) => {
    this.setState({ menuValue, position, cameriaName });
  };

  onPageChange = (page) => {
    console.log(page);
  };
  render() {
    const {
      menuData,
      radioType,
      menuValue,
      position,
      cameriaName,
    } = this.state;
    return (
      <div className={prefixCls}>
        <Head title="龙景家园" value={2} />
        <div className={`${prefixCls}-main`}>
          <Left
            typeChange={this.typeChange}
            radioType={radioType}
            menuData={menuData}
            value={menuValue}
            onChange={this.menuValueChange}
          />
          <div className="right">
            <div className="tips">{`当前位置 >  ${position} > ${cameriaName}`}</div>
            <div className={`radios-wrap ${radioTypeMap[radioType]}`}>
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              {/* <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" />
              <Video urlSrc="https://www.runoob.com/try/demo_source/mov_bbb.mp4" /> */}
            </div>
            <div className="page-line">
              <Pagination
                defaultCurrent={1}
                total={10}
                pageSize={4}
                onChange={this.onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Index);
