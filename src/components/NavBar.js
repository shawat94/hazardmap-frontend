import AppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LoginForm from './LoginForm'

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Hazard Map
                </Typography> 
                <Button color="inherit">Login</Button>
            </Toolbar>
            <LoginForm/>
        </AppBar>
    )
}

export default NavBar