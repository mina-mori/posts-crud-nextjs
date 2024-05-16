import connectDB from '../../../utils/connect-db';
import Post from '../../../schemas/Post';

connectDB();
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const posts = id ? await getPostById(id.toString()) : await getAllPosts();
    return Response.json(posts);
  } catch (error) {
    console.error('Error in GET handler:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const post = await createPost(request.json());
    return Response.json(post);
  } catch (error) {
    console.error('Error in GET handler:', error);
    throw error;
  }
}
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') ?? '';
    const posts = await deletePost(id.toString());
    return Response.json(posts);
  } catch (error) {
    console.error('Error in GET handler:', error);
    throw error;
  }
}

// export default async function handler(req: Request, res: any) {
//   const { method } = req;
//   console.log('req: ', req);
//   switch (method) {
//     case 'GET':
//       const { searchParams } = new URL(req.url);
//       const id = searchParams.get('id');
//       return id ? await getPostById(id?.toString()) : await getAllPosts();

//     case 'POST':
//       return createPost(req, res);

//     case 'PUT':
//       return updatePost(req, res);
//     case 'DELETE':
//       return deletePost(req, res);

//     default:
//       res.status(405).json({ message: 'Method not allowed' });
//       break;
//   }
// }

//Function to get all posts

async function getAllPosts() {
  return await Post.find({});
}

// Function to get a post by ID
async function getPostById(id: string) {
  return await Post.findOne({ id: id });
}

// Function to create a new post
async function createPost(body: any) {
  'use server';

  const { title, content } = await body;
  const newPost = new Post({ title, content });
  return await newPost.save();
}
// Function to update an existing post
async function updatePost(req: any, res: any) {
  try {
    const { id } = req.query;
    const { title, content } = req.body;

    // Find the post by id and update it
    const updatedPost = await Post.findOneAndUpdate(
      { id: id },
      { title, content },
      { new: true }
    );

    // Check if the post was not found
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating post' });
  }
}
// Function to delete an existing post
async function deletePost(id: string) {
  return await Post.findOneAndDelete({ id: id });
}
