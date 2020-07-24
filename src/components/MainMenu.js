import React, { Component } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppsIcon from "@material-ui/icons/Apps";
import PropTypes from "prop-types";
import { toogle_bar } from "../actions/uiActions";
import { LinearProgress } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { fetchCatTipoMetal } from "../api/fetchCatTipoMetal";
import { fetchBandas } from "../api/fetchBandas";
import BandasTable from "./BandasTable";

const drawerWidth = 220;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#3A77A3",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  logo: {
    marginTop: "5px",
  },
  container: {
    padding: theme.spacing(1),
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
  loginButton: {
    position: "relative",
    marginRight: 0,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

class MiniDrawer extends Component {
  state = { anchorEl: null, mobileMoreAnchorEl: null };

  componentDidMount = () => {
    let currentHideNav = window.innerWidth < 1024;
    if (currentHideNav) this.props.toogle_bar(true);
    this.props.fetchCatTipoMetal();
    this.props.fetchBandas();
  };

  render() {
    const { classes } = this.props;

    const menuId = "primary-search-account-menu";
    const mobileMenuId = "primary-search-account-menu-mobile";

    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleMenuClose = () => {
      this.setState({ anchorEl: null });
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    const handleMobileMenuClose = () => {
      this.setState({ mobileMoreAnchorEl: null });
    };

    const progressBarTheme = createMuiTheme({
      overrides: {
        MuiLinearProgress: {
          barColorPrimary: { backgroundColor: "#75A9CE" },
        },
      },
    });

    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      ></Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </MenuItem>
      </Menu>
    );

    let toolbarElements;

    toolbarElements = (
      <div>
        <div className={classes.sectionDesktop}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.props.ui.open,
          })}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => this.props.toogle_bar(this.props.ui.open)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            {toolbarElements}
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.props.ui.open,
            [classes.drawerClose]: !this.props.ui.open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.props.ui.open,
              [classes.drawerClose]: !this.props.ui.open,
            }),
          }}
        >
          <div className={classes.toolbarIcon}>
            <MusicNoteIcon />
          </div>
          <Divider />
          <List>
            <ListItem button key="Bandas">
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Bandas" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {this.props.ui.pending ? (
              <ThemeProvider theme={progressBarTheme}>
                <LinearProgress />
              </ThemeProvider>
            ) : null}
            <BandasTable />
          </Container>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { ui: state.ui };
};

const mapDispatchToProps = (dispatch) => ({
  toogle_bar: (open) => {
    dispatch(toogle_bar(open));
  },
  fetchCatTipoMetal: () => {
    dispatch(fetchCatTipoMetal());
  },
  fetchBandas: () => {
    dispatch(fetchBandas());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MiniDrawer));
