import { FC, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';

const MainHeader: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  const handleNavigate = useCallback(
    (route: string) => {
      router.push(route);
    },
    [router.push],
  );

  const handleNavigateMobileMenu = useCallback((route: string) => {
    handleNavigate(route);
    handleCloseNavMenu();
  }, []);

  const handleOpenNavMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    [],
  );

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    [],
  );

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
    handleCloseUserMenu();
  }, [signOut, handleCloseUserMenu]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            {session ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={() => handleNavigateMobileMenu('/')}>
                  <Typography textAlign="center">Hotel List</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigateMobileMenu('/add-hotel')}
                >
                  <Typography textAlign="center">Add New Hotel</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleNavigateMobileMenu('/about')}>
                  <Typography textAlign="center">About Us</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={() => handleNavigateMobileMenu('/sign-in')}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleNavigateMobileMenu('/sign-up')}>
                  <Typography textAlign="center">Sign Up</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
          {!loading && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {session ? (
                <>
                  <Button
                    onClick={() => handleNavigate('/')}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Hotel List
                  </Button>
                  <Button
                    onClick={() => handleNavigate('/add-hotel')}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Add New Hotel
                  </Button>
                  <Button
                    onClick={() => handleNavigate('/about')}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    About Us
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleNavigate('/sign-in')}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleNavigate('/sign-up')}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          )}

          {session && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleOutlinedIcon fontSize="large" />
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
                <MenuItem onClick={handleSignOut}>
                  <OutputOutlinedIcon />
                  <Typography textAlign="center" marginLeft="5px">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
