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
import { Event } from "../../../app/models/event";
import { Send } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { useStore } from "../../../app/store/store";
import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import noimage from "../../../app/assets/nophoto.jpeg";
import moment from "moment";

interface Props {
  event: Event;
}

const EventDetailsChat = ({ event }: Props) => {
  const { commentStore, userStore } = useStore();
  const commentGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (event) {
      commentStore.createHubConnection(event.id);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, event.id]);

  useEffect(() => {
    if (commentGroupRef.current) {
      commentGroupRef.current.scrollTop = commentGroupRef.current.scrollHeight;
    }
  }, [commentStore.comments]);

  return (
    <Card key={event?.id} sx={{ marginBottom: 10 }}>
      <CardHeader
        title={"Czat na żywo"}
        sx={{
          bgcolor: "#9c27b0",
          color: "#fff",
        }}
      />
      <CardContent>
        {commentStore.loading && <LinearProgress color="secondary" />}
        <div style={{ maxHeight: "400px", overflowY: "auto" }} ref={commentGroupRef}>
          <Comment.Group>
            {commentStore.comments.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar src={comment.image ?? noimage} />
                  <Comment.Content>
                    <Divider />
                    <Comment.Author>
                      <Link to={`/users/${comment.userName}`}>
                        {userStore.user?.userName === comment.userName ? "Ty" : comment.displayName}
                      </Link>
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{moment(comment.createDate).format("YYYY-MM-DD HH:mm")}</div>
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
            commentStore.addComment(values).then(() => resetForm());
          }}
        >
          {({ isSubmitting, isValid, values, handleChange }) => (
            <Form>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                  color="secondary"
                  multiline
                  rows={4}
                  id="body"
                  name="body"
                  value={values.body}
                  label={"Wiadomość"}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                fullWidth
                disabled={commentStore.loading || !isValid}
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

export default observer(EventDetailsChat);
