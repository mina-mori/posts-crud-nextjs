export class PostService {
  private static _instance: PostService;
  constructor() {}
  public static getInstance() {
    if (!this._instance) {
      this._instance = new PostService();
    }
    return this._instance;
  }
  getPostDetails = async (id: string) => {
    'use server';
    return fetch(`/api/posts?id=${id}`, { cache: 'no-store' });
  };
  getAllPosts = async () => {
    'use server';
    return fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
  };
  createPost = async (post: { title: string; content: string }) => {
    'use server';
    return fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
  };
  updatePost = async (post: { id: string; title: string; content: string }) => {
    'use server';
    return fetch(`http://localhost:3000//api/posts?id=${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
  };
  deletePost = async (id: string) => {
    'use server';
    return fetch(`http://localhost:3000//api/posts?id=${id}`, {
      method: 'DELETE',
    });
  };
}
