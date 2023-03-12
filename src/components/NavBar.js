import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import LoginForm from './LoginForm'

const NavBar = () => {
    return (
        <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h6" color="inherit" component="div">
                        Hazard Map
                    </Typography> 
                    <Box sx={{ position: 'relative', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap', flexDirection: 'row', display: 'flex', marginLeft: 'auto' }}>
                        <LoginForm/>
                    </Box>
                </Toolbar>
        </AppBar>
    )
}

export default NavBar