import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Brak uprawnień
      </Header>
      <Segment.Inline>
        <Button onClick={() => navigate(-1)}>Wróć do poprzedniej</Button>
      </Segment.Inline>
    </Segment>
  );
};

export default Forbidden;
