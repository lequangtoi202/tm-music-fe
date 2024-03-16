import { Avatar, Box, Grid, List, ListItemAvatar, ListItem as ListItemMui } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
const ListItem: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(3)].map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <List dense={true}>
            <ListItemMui>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <Box>Huỳnh Tấn Phát</Box>
            </ListItemMui>
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListItem;
