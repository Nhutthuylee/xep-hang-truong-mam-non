import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  }
}));

const Comment = (props) => {
  const { data } = props
  const classes = useStyles();
  return (
    <>

      <List className={classes.root}>
        {data.map(comment => {
          return (
            <React.Fragment key={comment.userId}>
              <ListItem key={comment.userId} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="avatar" src={comment.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={classes.fonts}>
                      {comment.username}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.username}
                      </Typography>
                      {` - ${comment.content}`}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};

export default Comment;