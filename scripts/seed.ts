import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding start...");

  // 1. データを格納する配列を準備
  const posts = [];

  // 2. ループで10件分のデータオブジェクトを作成
  for (let i = 1; i <= 10; i++) {
    posts.push({
      title: `記事タイトル ${i}: Prismaでのデータ作成`,
      content: `これは ${i} 番目の記事の本文です。\nテストデータとして自動生成されました。`,
      author: `User-${i}`, // 著者を連番で作成
      category: i % 2 === 0 ? "Technology" : "Life", // 偶数・奇数でカテゴリを分ける
      published: i % 3 === 0, // 3回に1回は true (公開済み) にする
    });
  }

  // 3. createMany で一括登録
  // ※ createMany は SQLite, PostgreSQL, MySQL など主要なDBで使えます
  const result = await prisma.post.createMany({
    data: posts,
  });

  console.log(`✅ ${result.count} 件の Post データを作成しました。`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
