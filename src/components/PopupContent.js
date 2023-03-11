import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useDispatch } from 'react-redux';
import { removeHazard } from '../reducers/hazardsReducer'

const PopupContent = ({ name, category, id}) => {
    const dispatch = useDispatch()
    const handleClickDeleteButton = () => {
        dispatch(removeHazard(id))
    }

    return (
        <Box>
            <Typography>{name}</Typography>
            <Typography>{category}</Typography>
            <Button id="delete-button" onClick={() => handleClickDeleteButton(id)}>Delete</Button>
        </Box>
    )
}

export default PopupContent