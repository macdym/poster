import { observer } from "mobx-react-lite";
import { List, Image, Popup } from "semantic-ui-react";
import { User } from "../../../app/models/user";
import { Link } from "react-router-dom";
import ProfileCard from "../../users/profile/ProfileCard";
import nophoto from "../../../app/assets/nophoto.jpeg";

interface Props {
  users?: User[];
}

const style = {
  borderColor: "rgba(162, 20, 190, 0.73)",
  borderWidth: 4,
};

const EventListItemUsers = ({ users }: Props) => {
  return (
    <List horizontal>
      {users?.map((user) => (
        <Popup
          hoverable
          key={user.userName}
          style={{ background: user.following ? "rgba(162, 20, 190, 0.73)" : "rgba(255, 255, 255, 0.63)"  }}
          trigger={
            <List.Item
              key={user.userName}
              to={`/users/${user.userName}`}
              as={Link}
              style={{ color: "black" }}
            >
              <Image
                bordered
                size="mini"
                circular
                src={user.image ?? nophoto}
                style={user.following ? style : null}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={user} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default observer(EventListItemUsers);
