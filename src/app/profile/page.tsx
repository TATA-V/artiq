import ProfileInfo from 'src/components/Profile/ProfileInfo';
import DefaultLayout from 'src/components/provider/DefaultLayout';
import MyPosts from 'src/components/Profile/MyPosts';

function ProfilePage() {
  return (
    <>
      <ProfileInfo />
      <DefaultLayout>
        <MyPosts />
      </DefaultLayout>
    </>
  );
}

export default ProfilePage;
