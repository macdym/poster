import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Keep looking don't settle!
      </Header>
      <Segment.Inline>
        <Button onClick={() => navigate(-1)}>Wróć do poprzedniej</Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
