import prisma from "@/lib/prisma";
// import Image from "next/image";
import Link from "next/link";

export type Post = {
  id: number;
  title: string;
  content: string | null; // NULL許容のため
  author: string;
  category: string;
  published: boolean;
};

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { id: "desc" },
  });

  console.log(posts);

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">🦄 幻想動物図鑑</h1>

      {/* 投稿がない場合の表示 */}
      {posts.length === 0 && (
        <p className="text-gray-500 text-center py-10">
          まだ幻想動物が見つかりません。シードを実行しましたか？
        </p>
      )}

      {/* 投稿リスト */}
      <ul className="space-y-4">
        {posts.map((post: Post) => (
          <li
            key={post.id}
            className="border border-gray-200 rounded-lg hover:shadow-md hover:bg-gray-50 transition duration-200 ease-in-out"
          >
            <Link href={`/posts/${post.id}`} className="block p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  {post.title}
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {post.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                発見者: <span className="font-medium">{post.author}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
