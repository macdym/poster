import { useState, useEffect } from "react";
import { User } from "../../../app/models/user";
import { Tab } from "semantic-ui-react";
import ProfilePhotosList from "./ProfilePhotosList";
import ProfileBio from "./ProfileBio";
import ProfileEvents from "./ProfileEvents";
import ProfileFollowings from "./ProfileFollowings";
import ProfileAbout from "./ProfileAbout";
import { useStore } from "../../../app/store/store";
import ProfileFollowers from "./ProfileFollowers";
import ProfileBackgroundPhotosList from "./ProfileBackgroundPhotosList";

interface Props {
  profile: User | null;
}

const ProfileContent = ({ profile }: Props) => {
  const [activePaneIndex, setActivePaneIndex] = useState(0);
  const { userStore } = useStore();

  useEffect(() => {
    const storedIndex = localStorage.getItem("activePaneIndex");
    if (storedIndex === null) {
      setActivePaneIndex(0);
    }
  }, []);

  const handleTabChange = (e: any, { activeIndex }: any) => {
    setActivePaneIndex(activeIndex);
    localStorage.setItem("activePaneIndex", activeIndex.toString());
  };

  let panes = [
    {
      menuItem: "Aktywności",
      render: () => <ProfileEvents />,
    },
    {
      menuItem: "O mnie",
      render: () => <ProfileAbout />,
    },
    {
      menuItem: "Ustawienia profilu",
      render: () => <ProfileBio profile={profile} />,
    },
    {
      menuItem: "Zdjęcia",
      render: () => <ProfilePhotosList photos={profile?.photos?.filter(x => !x.isBackgroundPhoto)} />,
    },
    {
      menuItem: "Zdjęcia w tle",
      render: () => <ProfileBackgroundPhotosList photos={profile?.photos?.filter(x => x.isBackgroundPhoto)} />,
    },
    {
      menuItem: "Obserwuje",
      render: () => <ProfileFollowings />,
    },
    {
      menuItem: "Obeserwujący",
      render: () => <ProfileFollowers />,
    },
  ];

  if (profile?.userName !== userStore.user?.userName) {
    panes = panes.filter((x) => x.menuItem !== "Ustawienia profilu");
  }

  return (
    <Tab
      activeIndex={activePaneIndex}
      onTabChange={handleTabChange}
      style={{ color: "black" }}
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default ProfileContent;
