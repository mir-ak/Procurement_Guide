import React from "react";
import "../styles/Footer.css";
import IconButton from "@mui/material/IconButton";
import {
  TwitterOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MobileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";

const Footer = () => {
  const handleClickGit = () => {
    window.open("https://github.com/mir-ak/");
  };
  const handleClickTwit = () => {
    window.open("https://twitter.com/xmirak_x");
  };
  const handleClickLinK = () => {
    window.open("https://www.linkedin.com/in/mir-ak/");
  };
  const handleClicMail = () => {
    window.open("mailto:aiteldjoudikarim06@gmail.com");
  };
  const handleClicTel = () => {
    window.open("tel:+33769632389");
  };
  return (
    <div className="footer">
      <Toolbar>
        <Box sx={{ flexGrow: 0.5 }} />

        <IconButton onClick={handleClickTwit}>
          <TwitterOutlined style={{ fontSize: "40px", color: "#4FEDD2" }} />
        </IconButton>

        <IconButton onClick={handleClickGit}>
          <GithubOutlined style={{ fontSize: "40px", color: "#4FEDD2" }} />
        </IconButton>

        <IconButton onClick={handleClickLinK}>
          <LinkedinOutlined style={{ fontSize: "40px", color: "#4FEDD2" }} />
        </IconButton>

        <Tooltip title="aiteldjoudikarim06@gmail.com">
          <IconButton onClick={handleClicMail}>
            <MailOutlined style={{ fontSize: "40px", color: "#4FEDD2" }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="+33 7 69 63 23 89">
          <IconButton onClick={handleClicTel}>
            <MobileOutlined style={{ fontSize: "40px", color: "#4FEDD2  " }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </div>
  );
};

export default Footer;
