import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Avatar, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import logo from '../../../assets/logo/ChatGPT Image Sep 12, 2025, 11_54_02 PM.png'
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useSnackbarStore } from '../../../store';



interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children?: React.ReactNode
    toggleTheme: any
    mode: string
}

const drawerWidth = 240;

export const NavigationBar = (props: Props) => {

    const { window, children, toggleTheme, mode } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const { decoded, clearAuth, planDetails } = useAuthStore()
    const { showSnackbar } = useSnackbarStore()
    const settings = [
        { item: 'Dashboard', onClick: () => navigate('/dashboard') },
        {
            item: 'Logout', onClick: () => {
                clearAuth();
                showSnackbar("Logout Successfull", "success")
            }
        }
    ];
    const navItems = [
        { item: 'Features', onClick: () => { } },
        { item: 'Pricing', onClick: () => navigate('/plans') },
        { item: 'About Us', onClick: () => { } },
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography sx={{ my: 2 }}>
                <img
                    src={logo}
                    alt="logo"
                    loading="lazy"
                    width={100}
                    style={{ marginTop: '8px' }}
                />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item?.item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item?.item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleStartFreeTrial = () => {
        if (!decoded) {
            navigate("/signUp", { state: { PageName: "Plans & Pricing", RouteName: "/plans" } })
        } else {
            navigate("/plans")
        }
    }


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav"
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        borderRadius: '20px',
                        width: '90%',
                        right: '5%',
                        top: '5%',
                        "& .MuiToolbar-root": {
                            minHeight: 60,
                        },
                    })}>
                    <Toolbar>
                        <Grid container sx={{ width: '100%' }}>
                            <Grid size={4} >

                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{ mr: 2, display: { sm: 'none' } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    component="div"
                                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                                >
                                    <img
                                        src={logo}
                                        alt="logo"
                                        loading="lazy"
                                        width={100}
                                        style={{ marginTop: '8px' }}
                                    />
                                </Typography>

                            </Grid>

                            <Grid size={4} container justifyContent="center">
                                <Box sx={{ display: { xs: 'none', sm: 'block' }, mt: 0.4 }}>
                                    {navItems.map((item) => (
                                        <Button key={item.item} onClick={item?.onClick} sx={(theme) => ({
                                            color: theme.palette.text.primary,
                                            borderRadius: '10px',
                                            mx: 1
                                        })}>
                                            {item?.item}
                                        </Button>
                                    ))}
                                </Box>
                            </Grid>

                            <Grid size={4} container justifyContent="flex-end" >
                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    {!planDetails?.data && <Button variant="contained" size="small" sx={{ mx: 2 }} onClick={handleStartFreeTrial}>Start free trial</Button>}
                                    {!decoded && <Button variant="outlined" size="small" onClick={() => navigate("/login")}>Sign in</Button>}
                                    <IconButton onClick={toggleTheme}
                                        sx={{
                                            backgroundColor: "background.paper",
                                            boxShadow: 2,
                                            marginLeft: 2,
                                            marginRight: 1
                                            // "&:hover": {
                                            //   backgroundColor: "#757575",
                                            //   color: "white",
                                            // }
                                        }}
                                    >
                                        {mode === "light" ? <NightlightIcon sx={(theme) => ({
                                            color: theme.palette.text.primary,
                                        })}
                                        /> :
                                            <LightModeIcon sx={(theme) => ({
                                                color: theme.palette.text.primary,
                                            })}
                                            />
                                        }
                                    </IconButton>
                                    {decoded &&
                                        <>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                    <Avatar alt={decoded?.name} src="/static/images/avatar/2.jpg" />
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1.5,
                                                        px: 2,
                                                        py: 1.5,
                                                    }}
                                                >
                                                    <Avatar alt={decoded?.name} src="/user.png" sx={{ width: 40, height: 40 }} />
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            {decoded?.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {decoded?.email}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Divider />
                                                {settings.map((setting) => (
                                                    <MenuItem key={setting.item} onClick={() => {
                                                        handleCloseUserMenu
                                                        setting.onClick()
                                                    }}>
                                                        <Typography sx={{ textAlign: 'center' }}>{setting.item}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </>
                                    }

                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </>
    )
}
