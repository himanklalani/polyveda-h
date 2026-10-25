import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Engineering Insights & Blog | Polyveda',
  description: 'Technical perspectives on industrial packaging, supply chain durability, and the shift to returnable logistics.',
  openGraph: {
    title: 'Engineering Insights & Blog | Polyveda',
    description: 'Technical perspectives on industrial packaging, supply chain durability, and the shift to returnable logistics.',
    url: 'https://polyveda.com/blog',
  },
};

export const dynamic = 'force-dynamic';

import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/Post';

export default async function BlogPage() {
  let posts = [];
  try {
    await dbConnect();
    // Fetch published posts and convert to POJOs with lean()
    const rawPosts = await Post.find({ published: true }).sort({ createdAt: -1 }).lean();
    posts = JSON.parse(JSON.stringify(rawPosts));
  } catch (e) {
    console.warn('Could not fetch blog posts during build/render (DB offline):', e);
  }

  return <BlogClient posts={posts} />;
}
