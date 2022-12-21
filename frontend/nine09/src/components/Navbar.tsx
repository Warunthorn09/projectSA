import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AdminInterface } from "../models/IAdmins";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
//import { GetAdminByID } from "../services/HttpClientService";

function Navbar() {
  const [admin, setAdmin] = useState<Partial<AdminInterface>>({});
  // const [imageUrl, setImageUrl] = useState({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/admin";
  };

  //const fetchAdmin = async () => {
    //let res = await GetAdminByID();
    //if (res) {
      // console.log(res);
      //setAdmin(res);
    //}
  //};

  //useEffect(() => {
    //fetchAdmin();
  //}, []);

  return (
    <Fragment>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
            bgcolor: "#F7F5F2",
            p: 1,
            gap: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: "#8BBCCC",
              zIndex: 1,
              pl: 3.5,
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              textAlign="center"
              style={{ fontWeight: "bold" }}
              lineHeight="1.2"
              pl={1}
            >
              <Link
                to="/admin"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                SUT
                <br />
                HOTEL
              </Link>
            </Typography>
          </Box>
          {/* Show info admin */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* <Box>
              <Typography
                variant="h3"
                component="div"
                sx={{ flexGrow: 1 }}
                color="#000"
                style={{ fontSize: "10rem" }}
              >
                <span style={{ opacity: "0.5" }}>| </span>
                {admin.Username}
              </Typography>
            </Box> */}
            <Box>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar
                  alt=""
                  src="https://lzd-live-th-member.oss-ap-southeast-1.aliyuncs.com/352b418384a1434b961e22549d3d88d1_c92cff71c580421ca947ea98e09b21b0.jpg"
                  sx={{ width: 56, height: 56 }}
                />
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={Logout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </div>
      {/* <Outlet /> */}
    </Fragment>
  );
}

export default Navbar;