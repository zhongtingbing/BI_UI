import React from "react";
import { connect } from "dva";
import Head from "components/head";
import Left from "./left";
import Video from "components/ztbVideo";
import { Pagination } from "antd";
import "antd/lib/pagination/style/css"; // 加载 CSS
import { getProjectService, getVideoDeviceServive } from "../../services/query";
import "./index.less";

const prefixCls = "cameras-view74aa1b";

const radioTypeMap = {
  0: "two",
  1: "three",
  2: "one",
};
const radioTypeMap1 = {
  0: 4,
  1: 9,
  2: 1,
};

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      url: "",
      isSingle: false,
      showIndex: 0,
      menuData: [
        // {
        //   value: "围墙",
        //   id: "01",
        //   children: [
        //     {
        //       value: "东北角1",
        //       id: "0101",
        //     },
        //     {
        //       value: "东北角2",
        //       id: "0102",
        //     },
        //     {
        //       value: "东北角3",
        //       id: "0103",
        //     },
        //   ],
        // },
        // {
        //   value: "项目部",
        //   id: "02",
        //   children: [
        //     {
        //       value: "项目部1",
        //       id: "0201",
        //     },
        //     {
        //       value: "项目部2",
        //       id: "0202",
        //     },
        //     {
        //       value: "东项目部3",
        //       id: "0203",
        //     },
        //   ],
        // },
      ],
      radioType: 0,
      menuValue: "",
      position: "",
      cameriaName: "",
      pageNo: 0,
    };
  }

  componentDidMount() {
    // var myVideo = document.getElementById("video1");
    // if (myVideo.paused) myVideo.play();
    // else myVideo.pause();
    getProjectService().then((res) => {
      const { items } = res;
      if (Array.isArray(items) && items.length > 0) {
        sessionStorage.setItem("ProjectId", items[0].id);
      }
    });
    getVideoDeviceServive().then((res) => {
      this.setState({
        menuData: res.items,
      });
    });
  }

  typeChange = (radioType) => {
    this.setState({ radioType });
  };

  menuValueChange = (menuValue, position, cameriaName, url) => {
    this.setState({ menuValue, position, cameriaName, url, isSingle: true });
  };

  onPaClick = (index) => {
    const { menuData } = this.state;
    this.setState({
      isSingle: false,
      showIndex: index,
      position: menuData[index].name,
      cameriaName: "",
    });
  };

  onPageChange = (pageNo) => {
    console.log(pageNo);
    // this.setState({ pageNo });
  };

  videosRender = () => {
    const { showIndex, radioType, menuData, pageNo } = this.state;
    const pageSize = radioTypeMap1[radioType];
    const showingData = (menuData[showIndex] || { devices: [] }).devices.slice(
      pageNo * pageSize,
      (pageNo + 1) * pageSize
    );
    return showingData.map((item, index) => (
      <Video key={index} urlSrc={item.url} />
    ));
  };
  render() {
    const {
      menuData,
      radioType,
      menuValue,
      position,
      cameriaName,
      url,
      isSingle,
      showIndex,
    } = this.state;

    const showingData = menuData[showIndex] || [];
    const pageSize = radioTypeMap1[radioType];
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
            onPaClick={this.onPaClick}
          />
          <div className="right">
            <div className="tips">{`当前位置 >  ${position}  ${
              cameriaName ? ">" : "" + cameriaName
            }`}</div>
            <div
              className={`radios-wrap ${
                isSingle ? "one" : radioTypeMap[radioType]
              }`}
            >
              {isSingle ? <Video urlSrc={url} /> : this.videosRender()}
            </div>
            <div className="page-line">
              <Pagination
                defaultCurrent={1}
                total={showingData.length}
                pageSize={pageSize}
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
