import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MaterialIcon from "material-icons-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";

const Navbar = (admin) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <IconButton component={Link} to="/product">
        <MaterialIcon
          icon="production_quantity_limits"
          size={30}
          color="#2a1d52"
          invert
        />
      </IconButton>

      <IconButton component={Link} to="/login">
        <MaterialIcon
          icon="power_settings_new"
          size={30}
          color="#2a1d52"
          invert
        />
      </IconButton>
    </Menu>
  );

  return (
    <AppBar
      style={{
        background: "linear-gradient(115deg, #2a1d52, transparent 200%)",
      }}
      position="static">
      <Toolbar>
        <Tooltip title="Page d'accueil">
          <IconButton component={Link} to="/">
            <MaterialIcon icon="house" size={50} color="#ffffff" invert />
          </IconButton>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton component={Link} to="/product">
            <MaterialIcon
              icon="production_quantity_limits"
              size={38}
              color="#ffffff"
              invert
            />
          </IconButton>

          {admin.admin ? (
            <IconButton component={Link} to="/">
              <MaterialIcon
                icon="power_settings_new"
                size={38}
                color="#ffffff"
                invert
              />
            </IconButton>
          ) : (
            <Tooltip title="Partie Admin">
              <IconButton component={Link} to="/admin">
                <MaterialIcon icon="unlock" size={38} color="#ffffff" invert />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit">
            <MaterialIcon icon="widgets" size={40} color="#ffffff" />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMobileMenu}
    </AppBar>
  );
};

export default Navbar;
