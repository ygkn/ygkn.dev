import { Resvg } from "@resvg/resvg-js";
import { loadDefaultJapaneseParser } from "budoux";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";

const parser = loadDefaultJapaneseParser();

const notoSansJPData = await fetch(
  "https://api.fontsource.org/v1/fonts/noto-sans-jp/japanese-900-normal.ttf"
).then((res) => res.arrayBuffer());

const iconBase64Data = await readFile(
  join(new URL(import.meta.url).pathname, "..", "..", "public", "icon.jpg"),
  { encoding: "base64" }
);

export function getStaticPaths() {
  const posts = Object.keys(import.meta.glob("../posts/**/*.md"));

  return posts.map((filename) => ({
    params: { slug: filename.replace(/^.*\/(.*)\.md$/, "$1") },
  }));
}

export async function get({ params: { slug } }: { params: { slug: string } }) {
  const {
    frontmatter: { title },
  } = await import(`../posts/${slug}.md`);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 900,
          padding: 32,
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                height: 64,
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: `data:image/jpeg;base64,${iconBase64Data}`,
                    width: 512,
                    height: 512,
                    style: {
                      height: 64,
                      width: 64,
                      borderRadius: 64,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      marginLeft: 16,
                      lineHeight: 1,
                    },
                    children: "ygkn.dev",
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                marginTop: 32,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
              },
              children: parser.parse(title).map((segment) => ({
                type: "div",
                props: {
                  style: {
                    display: "flex",
                  },
                  children: segment,
                },
              })),
            },
          },
        ],
      },
    },
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: "Noto Sans JP",
          weight: 900,
          style: "normal",
          data: notoSansJPData,
        },
      ],
    }
  );

  const pngBuffer = new Resvg(svg).render().asPng();

  return {
    body: pngBuffer,
    encoding: "binary",
  };
}
