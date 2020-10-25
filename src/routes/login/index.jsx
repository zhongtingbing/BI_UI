import React from "react";
import { connect } from "dva";
import { Input, Button, Icon, Checkbox, message } from "antd";
import { routerRedux } from "dva/router";
import textImg from "../../assets/image/txt.png";
import tipImg from "../../assets/image/向下.svg";
import "antd/lib/input/style/css"; // 加载 CSS
import "antd/lib/button/style/css"; // 加载 CSS
import "antd/lib/icon/style/css"; // 加载 CSS
import "antd/lib/checkbox/style/css"; // 加载 CSS
import "antd/lib/message/style/css"; // 加载 CSS

import "./index.less";
import { loginService } from "../../services/query";

const prefixCls = "login-view";

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFirstStep: true,
      name: localStorage.getItem("name") || "",
      password: localStorage.getItem("password") || "",
      isRemember: localStorage.getItem("isRemember") === "true" || false,
    };
  }

  componentDidMount() {}
  userChange = (e) => {
    this.setState({ name: e.target.value });
  };

  psChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  rememberChange = (e) => {
    this.setState({ isRemember: e.target.checked });
  };

  onLogin = () => {
    const { password, name, isRemember } = this.state;
    if (!name) {
      message.warn("请输入用户名");
      return;
    }
    if (!password) {
      message.warn("请输入密码");
      return;
    }
    loginService({ name, password, isRemember })
      .then((res) => {
        message.success("登录成功");
        sessionStorage.setItem("accessToken", res.accessToken);
        if (isRemember) {
          localStorage.setItem("name", name);
          localStorage.setItem("password", password);
          localStorage.setItem("isRemember", "true");
        } else {
          localStorage.removeItem("name");
          localStorage.removeItem("password");
          localStorage.removeItem("isRemember");
        }
        this.props.routerGo("/cameras");
      })
      .catch((err) => {});
  };

  render() {
    const { password, name, isRemember, isFirstStep } = this.state;
    return (
      <div className={prefixCls}>
        <div className={"img-wrap"}>
          <img src={textImg} alt="" />
        </div>
        {!isFirstStep && (
          <div className={`${prefixCls}-form`}>
            <Input
              onChange={this.userChange}
              value={name}
              prefix={<Icon type="user" />}
              placeholder="请输入账号"
            />
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="请输入密码"
              onChange={this.psChange}
              value={password}
            />
            <Button onClick={this.onLogin} type="primary">
              登录
            </Button>
            <span className="jzma">记住密码</span>
            <Checkbox checked={isRemember} onChange={this.rememberChange} />
          </div>
        )}
        {isFirstStep && (
          <div className="down-tip">
            <img
              onDoubleClick={() => {
                this.setState({ isFirstStep: false });
              }}
              src={tipImg}
            />
          </div>
        )}

        <div className="tips">技术支持：物知云</div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    routerGo(path, data = {}) {
      dispatch(
        routerRedux.push({
          pathname: path,
          state: {
            ...data,
          },
        })
      );
    },
  };
}

export default connect(null, mapDispatchToProps)(Index);
