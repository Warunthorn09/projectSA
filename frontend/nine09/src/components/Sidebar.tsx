import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const menu = [
  { name: "ห้องพัก", path: "create-room" },
  { name: "พนักงาน", path: "employee" },
  { name: "ตรวจสอบเงิน", path: "payment" },
  { name: "Check In", path: "check-in" },
  { name: "Check Out", path: "check-out" },
];

function Sidebar() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#8BBCCC",
          position: "fixed",
          p: 2,
          pt: 10,
          top: 0,
          left: 0,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: "5rem",
            fontSize: "1.3rem",
          }}
        >
          <List>
            {menu.map((item, index) => (
              <Link
                to={item.path}
                key={item.name}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <ListItem button disablePadding>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: "1.3rem",
                      textAlign: "center",
                      marginBottom: "2rem",
                      height: "auto",
                    }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}

export default Sidebar;