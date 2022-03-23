import path from "path";
import fs from "fs";
// マークダウンファイルを解析するプラグイン
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const postsDirectory = path.join(process.cwd(), "posts");
// console.log(postsDirectory);

export function getPostsData() {
  // ファイル名のオブジェクト
  const fileNames = fs.readdirSync(postsDirectory);
  // console.log(fileNames)
  const allPostsData = fileNames.map((filename) => {
    // ファイル名から拡張子を取り除く
    const id = filename.replace(/\.md$/, "");

    // マークダウンファイルのパスを取得
    const fullPath = path.join(postsDirectory, filename);
    
    // ファイルの中身を読み取る
    const fileContents = fs.readFileSync(fullPath, "utf8");
    
    // マークダウンファイルで記載したデータをオブジェクトとして取得する
    const matterResult = matter(fileContents);
    // console.log(matterResult)

    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

export function getPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      }
    };
  });
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  // HTMLに変換
  const blogContent = await remark()
  .use(html)
  .process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  }
}
