import styles from '@/styles/ViewPosts.module.css';
import { PostService } from '@/services/PostService';
import Link from 'next/link';

const ViewPosts = async () => {
  const postService = PostService.getInstance();

  const getPosts = async () => {
    'use server';
    try {
      const response = await postService.getAllPosts();
      if (response.ok) {
        const posts = await response.json();
        return posts;
      } else {
        console.error('API Error:', response.statusText);

        // Check if response body is empty or not valid JSON
        const responseBody = await response.text();

        try {
          const errorData = JSON.parse(responseBody);
          console.error('API Error Data:', errorData);
        } catch (jsonError) {
          console.error('Error parsing JSON in response body:', jsonError);
        }

        return [];
      }
    } catch (error) {
      console.error('Error making API request:', error);
      return [];
    }
  };

  let posts = (await getPosts()) ?? [];
  const deletePost = async (formData: FormData) => {
    'use server';
    const postId = formData.get('postId') ?? '';
    try {
      const response = await postService.deletePost(postId.toString());
      if (response.ok) {
        posts = (await getPosts()) ?? [];
      } else {
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };
  return (
    <>
      <h1>Posts</h1>
      <div>
        <Link href={'/SavePost'}>
          <button>Add New Post</button>
        </Link>
      </div>
      <table className={styles.postTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: IPost, index: number) => (
            <tr key={index}>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <Link href={`/SavePost/${post.id}`}>
                  <button className='mx-1'>Edit</button>
                </Link>
                <form action={deletePost}>
                  <button
                    id='delete-id'
                    className='mx-1 background-red'
                    type='submit'
                    name='postId'
                    value={post.id}
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ViewPosts;
