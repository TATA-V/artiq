import ProfileInfo from 'src/components/Profile/ProfileInfo';
import DefaultLayout from 'src/components/provider/DefaultLayout';
import MyPosts from 'src/components/Profile/MyPosts';
import Unregister from 'src/components/Profile/Unregister';

function ProfilePage() {
  return (
    <>
      <ProfileInfo />
      <DefaultLayout>
        <MyPosts />
        <Unregister />
      </DefaultLayout>
    </>
  );
}

export default ProfilePage;
