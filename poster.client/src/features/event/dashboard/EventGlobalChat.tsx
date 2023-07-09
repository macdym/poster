import {
  Card,
  CardHeader,
  CardContent,
  Button,
  FormControl,
  TextField,
  LinearProgress,
  Divider,
} from "@mui/material";
import { Comment } from "semantic-ui-react";
import { Send } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { useStore } from "../../../app/store/store";
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import noimage from "../../../app/assets/nophoto.jpeg";
import moment from "moment";

const EventGlobalChat = () => {
  const { globalChatStore, userStore } = useStore();
  const commentGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    globalChatStore.createHubConnection();
    return () => {
      globalChatStore.clearComments();
    };
  }, [globalChatStore]);

  useEffect(() => {
    if (commentGroupRef.current) {
      commentGroupRef.current.scrollTop = commentGroupRef.current.scrollHeight;
    }
  }, [globalChatStore.comments]);

  return (
    <Card sx={{ marginBottom: 10 }}>
      <CardHeader
        title={"Czat na żywo"}
        sx={{
          bgcolor: "#9c27b0",
          color: "#fff",
        }}
      />
      <CardContent>
        {globalChatStore.loading && <LinearProgress color="secondary" />}
        <div
          style={{ maxHeight: "180px", overflowY: "auto" }}
          ref={commentGroupRef}
        >
          <Comment.Group>
            {globalChatStore.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image ?? noimage} />
                <Comment.Content>
                  <Divider />
                  <Comment.Author>
                    <Link to={`/users/${comment.userName}`}>
                      {userStore.user?.userName === comment.userName
                        ? "Ty"
                        : comment.displayName}
                    </Link>
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>
                      {moment(comment.createDate).format("YYYY-MM-DD HH:mm")}
                    </div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
                <Divider />
              </Comment>
            ))}
          </Comment.Group>
        </div>
        <Formik
          initialValues={{ body: "" }}
          onSubmit={(values, { resetForm }) => {
            globalChatStore.addComment(values).then(() => resetForm());
          }}
        >
          {({ isSubmitting, isValid, values, handleChange }) => (
            <Form>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  color="secondary"
                  multiline
                  rows={3}
                  id="body"
                  name="body"
                  value={values.body}
                  label={"Wiadomość"}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                fullWidth
                disabled={globalChatStore.loading || !isValid}
                startIcon={<Send />}
                variant="contained"
                color="secondary"
                style={{ marginTop: 5 }}
                type="submit"
              >
                Wyślij
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default observer(EventGlobalChat);
