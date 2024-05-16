'use server';
import SavePost from '@/app/components/SavePost';
import { useRouter } from 'next/router';
const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <SavePost id={id?.toString()}></SavePost>
    </>
  );
};
export default EditPost;
