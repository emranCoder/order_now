import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CoffeeIcon from "@mui/icons-material/Coffee";
import SetMealIcon from "@mui/icons-material/SetMeal";
import RamenDiningIcon from "@mui/icons-material/RamenDining";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 15,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    width: "30px",
    height: "30px",
    "border-radius": "50%",
  },
}));

export default function OrderMenuBox() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="container max-lg:hidden">
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <StyledBadge
            badgeContent={4}
            color="secondary"
            className="flex flex-auto mr-3"
          >
            <ListItemIcon>
              <CoffeeIcon />
            </ListItemIcon>
            <ListItemText primary="Beverages" />
          </StyledBadge>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <StyledBadge
            badgeContent={4}
            color="secondary"
            className="flex flex-auto mr-3"
          >
            <ListItemIcon>
              <SetMealIcon />
            </ListItemIcon>
            <ListItemText primary="Biriyani" />
          </StyledBadge>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <StyledBadge
            badgeContent={4}
            color="secondary"
            className="flex flex-auto mr-3"
          >
            <ListItemIcon>
              <RamenDiningIcon />
            </ListItemIcon>
            <ListItemText primary="Breakfast" />
          </StyledBadge>
        </ListItemButton>
      </List>
      <Divider />
    </div>
  );
}
