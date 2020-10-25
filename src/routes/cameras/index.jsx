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
      accessToken: "",
      menuData: [],
      radioType: 0,
      menuValue: "",
      position: "",
      cameriaName: "",
      pageNo: 1,
    };
  }

  componentDidMount() {
    getProjectService().then((res) => {
      const { items } = res;
      if (Array.isArray(items) && items.length > 0) {
        sessionStorage.setItem("ProjectId", items[0].id);
      }
      getVideoDeviceServive().then((res) => {
        this.setState({
          menuData: res.items,
          position: res.items[0] && res.items[0].name,
          menuValue: res.items[0] && res.items[0].id,
        });
      });
    });
    // const res = [
    //   {
    //     id: "1319483104331677696",
    //     name: "围墙2",
    //     devices: [
    //       {
    //         hdUrl: "ezopen://open.ys7.com/E47619067/1.hd.live",
    //         url: "ezopen://open.ys7.com/E47619067/1.live",
    //         accessToken:
    //           "at.2996d07z83ins7gg3hc6z6sxd7nxxv0y-8oi340h86o-1h77o9k-jeo2ktf7c",
    //         deviceId: "1319967022892277773",
    //         name: "南城-元美社区",
    //         sn: "E47619067",
    //       },
    //       {
    //         hdUrl: "ezopen://open.ys7.com/E47619068/1.hd.live",
    //         url: "ezopen://open.ys7.com/E47619068/1.live",
    //         accessToken:
    //           "at.2996d07z83ins7gg3hc6z6sxd7nxxv0y-8oi340h86o-1h77o9k-jeo2ktf7c",
    //         deviceId: "1319967022892277774",
    //         name: "莞城-新风路",
    //         sn: "E47619068",
    //       },
    //       {
    //         hdUrl: "ezopen://open.ys7.com/E47619071/1.hd.live",
    //         url: "ezopen://open.ys7.com/E47619071/1.live",
    //         accessToken:
    //           "at.2996d07z83ins7gg3hc6z6sxd7nxxv0y-8oi340h86o-1h77o9k-jeo2ktf7c",
    //         deviceId: "1319967022892277775",
    //         name: "南城-石鼓社区",
    //         sn: "E47619071",
    //       },
    //       {
    //         hdUrl: "ezopen://open.ys7.com/E47619072/1.hd.live",
    //         url: "ezopen://open.ys7.com/E47619072/1.live",
    //         accessToken:
    //           "at.2996d07z83ins7gg3hc6z6sxd7nxxv0y-8oi340h86o-1h77o9k-jeo2ktf7c",
    //         deviceId: "1319967022892277776",
    //         name: "厚街-厚新路",
    //         sn: "E47619072",
    //       },
    //     ],
    //   },
    // ];

    // this.setState({ menuData: res });
  }

  typeChange = (radioType) => {
    const { isSingle } = this.state;
    this.setState({ radioType, isSingle: !isSingle }, () => {
      this.setState({
        isSingle,
      });
    });
  };

  menuValueChange = (menuValue, position, cameriaName, url, accessToken) => {
    this.setState(
      {
        menuValue,
        position,
        cameriaName,
        url,
        accessToken,
        isSingle: false,
      },
      () => {
        this.setState({
          isSingle: true,
        });
      }
    );
  };

  onPaClick = (index, id) => {
    const { menuData } = this.state;
    this.setState(
      {
        isSingle: true,
        showIndex: index,
        position: menuData[index].name,
        cameriaName: "",
        menuValue: id,
        pageNo: 1,
      },
      () => {
        this.setState({
          isSingle: false,
        });
      }
    );
  };

  onPageChange = (pageNo) => {
    this.setState({ pageNo: pageNo, isSingle: true }, () => {
      this.setState({
        isSingle: false,
      });
    });
  };

  videosRender = () => {
    const { showIndex, radioType, menuData, pageNo } = this.state;
    const pageSize = radioTypeMap1[radioType];
    const showingData = (menuData[showIndex] || { devices: [] }).devices.slice(
      (pageNo - 1) * pageSize,
      pageNo * pageSize
    );
    return showingData.map((item, index) => (
      <Video
        key={index}
        urlSrc={item.url}
        videoId={item.deviceId}
        accessToken={item.accessToken}
        title={item.name}
      />
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
      pageNo,
      accessToken,
    } = this.state;
    const showingItem = menuData[showIndex] || {};
    const showingData = showingItem.devices || [];
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
              cameriaName ? ">" + cameriaName : ""
            }`}</div>
            <div
              className={`radios-wrap ${
                isSingle ? "one" : radioTypeMap[radioType]
              }`}
            >
              {isSingle ? (
                <Video
                  urlSrc={url}
                  videoId={menuValue}
                  title={cameriaName}
                  accessToken={accessToken}
                />
              ) : (
                this.videosRender()
              )}
            </div>
            {!isSingle && (
              <div className="page-line">
                <Pagination
                  current={pageNo}
                  total={showingData.length}
                  pageSize={pageSize}
                  onChange={this.onPageChange}
                />
              </div>
            )}
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
