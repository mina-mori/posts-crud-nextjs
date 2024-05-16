import styles from '@/styles/SavePost.module.css';
import { PostService } from '@/services/PostService';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { revalidatePath, revalidateTag } from 'next/cache';

const SavePost = async (props: { id?: string }) => {
  const postService = new PostService();

  // const getPostDetails = async (postId: string) => {
  //   try {
  //     const response = await postService.getPostDetails(postId?.toString());
  //     if (response.ok) {
  //       const post: any = await response.json();
  //       if (post) {
  //         return post;
  //       } else {
  //         console.error('Post not found');
  //         return undefined;
  //       }
  //     } else {
  //       console.error('API Error:', response.statusText);
  //       return undefined;
  //     }
  //   } catch (error) {
  //     console.error('Error making API request:', error);
  //     return undefined;
  //   }
  // };
  // let post = props.id
  //   ? await getPostDetails(props.id?.toString())
  //   : { title: '', content: '' };
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const payload = {
      id: props.id ? props.id?.toString() : '',
      title: formData.get('title')?.toString() ?? '',
      content: formData.get('content')?.toString() ?? '',
    };
    try {
      const response = props.id
        ? await postService.updatePost(payload)
        : await postService.createPost(payload);
      if (response.ok) {
        revalidatePath('/ViewPosts', 'page');
      } else {
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };

  return (
    <>
      <h1>{props.id ? 'Edit Post' : 'Add Post'}</h1>
      <form className={`${styles.postForm}`} action={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input name='title' type='text' id='title' required />
        <br />
        <label htmlFor='content'>Content:</label>
        <textarea name='content' id='content' required></textarea>
        <br />
        <button type='submit'>Save</button>
        <Link href='/'>
          <button type='button' className='mx-1'>
            Cancel
          </button>
        </Link>
      </form>
    </>
  );
};

export default SavePost;
