import { RichText } from "prismic-reactjs";
import Link from "next/link";
import Head from "next/head";
import { Client } from "../../prismic-configuration";
import ProgressBar from "react-scroll-progress-bar";
import Nav from "../../components/nav";
import SyntaxHighlighter from "react-syntax-highlighter";
import allyDark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";
import Footer from "../../components/Footer";
import Prismic from "prismic-javascript";

export default function Blog({ blog, tweetsData }) {
  // console.log(blog);
  const { title } = blog.data;
  const avatar = `https://images.weserv.nl/?url=https://unavatar.now.sh/github/toughyear&w=40`;

  const author = { twitter: "RajeevSinghN", name: "Rajeev Singh Naruka" };

  let og = {
    description: blog.data.description,
  };

  // handle prismic slices

  if (blog) {
    const blogContent = blog.data.body.map((slice, index) => {
      // Render the right markup for the given slice type

      // Text Slice
      if (slice.slice_type === "text") {
        return (
          <div key={`${slice.slice_type}-${index}`} className="my-10">
            {RichText.render(slice.primary.text)}{" "}
          </div>
        );

        // Image Gallery Slice
      } else if (slice.slice_type === "code") {
        return (
          <SyntaxHighlighter
            key={`${slice.slice_type}-${index}`}
            language={RichText.asText(slice.slice_label)}
            style={allyDark}
            className="my-10"
          >
            {RichText.asText(slice.primary["code-content"])}
          </SyntaxHighlighter>
        );
      } else if (slice.slice_type === "quote") {
        return (
          <blockquote key={`${slice.slice_type}-${index}`}>
            {RichText.asText(slice.primary["quote"])}
          </blockquote>
        );
      } else if (slice.slice_type === "image") {
        return (
          <div key={`${slice.slice_type}-${index}`} className="flex flex-col">
            {" "}
            <img
              src={slice.primary["image"].url}
              alt={slice.primary["image"].alt}
              style={{
                width: `${slice.primary["width-percentage"] ?? 100}%`,
              }}
            />
            <p
              className="my-10 italic text-center"
              style={{ fontSize: "1rem" }}
            >
              {RichText.asText(slice.primary["caption"])}
            </p>
          </div>
        );

        // Return null by default
      } else {
        return null;
      }
    });

    return (
      <>
        <Head>
          {/* Primary Meta Tags  */}
          <meta
            key="description"
            name="description"
            content={
              og
                ? og.description
                : `I blog about React, NextJS, TailwindCSS, GraphQL, Firebase, and everything related to web-development or indie hacking and also share about the projects I am working on.`
            }
          />

          {/* Open Graph / Facebook  */}
          <meta key="og:title" property="og:title" content={title} />
          <meta
            key="og:description"
            property="og:description"
            content={
              og
                ? og.description
                : `I blog about React, NextJS, TailwindCSS, GraphQL, Firebase, and everything related to web-development or indie hacking and also share about the projects I am working on.`
            }
          />
          <meta
            key="og:image"
            property="og:image"
            content={
              og
                ? `https://og-image.now.sh/${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg`
                : `https://rajeevnaruka.com/og/mysite-homepage.png`
            }
          />
          {/* Twitter  */}
          <meta key="twitter:title" property="twitter:title" content={title} />
          <meta
            key="twitter:description"
            property="twitter:description"
            content={
              og
                ? og.description
                : `I blog about React, NextJS, TailwindCSS, GraphQL, Firebase, and everything related to web-development or indie hacking and also share about the projects I am working on.`
            }
          />
          <meta
            key="twitter:image"
            property="twitter:image"
            content={
              og
                ? `https://og-image.now.sh/${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg`
                : `https://rajeevnaruka.com/og/mysite-homepage.png`
            }
          />
        </Head>
        <Nav />
        <div className="writing-progress">
          <ProgressBar height="5px" />
        </div>

        <div className="mt-20 w-full max-w-4xl mx-auto px-8">
          <Link href="/blog" as="/blog">
            <a className="back-button">back</a>
          </Link>
          <h1 className="writing-title-h1 text-4xl md:text-6xl">
            {RichText.asText(blog.data["title"])}
          </h1>

          <div className="author">
            <a
              href={`https://twitter.com/${author.twitter}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <img src={avatar} />
              {author.name}
            </a>
          </div>

          <div className="writing-container">
            {blogContent}

            <div className="twitter-follow">
              {RichText.render(tweetsData["twitter-follow"])}
            </div>
          </div>
          <Link href="/blog" as="/blog">
            <a className="back-button mt-10">back</a>
          </Link>
        </div>

        <Footer />
      </>
    );
  }
}

// get static path

export async function getStaticPaths() {
  const blogs = await Client().query(
    Prismic.Predicates.at("document.type", "blog"),
    {
      pageSize: 200,
    }
  );
  let pathsArray = [];
  blogs.results.map((blog, index) => {
    pathsArray.push({ params: { blog: blog.uid } });
  });
  return {
    paths: pathsArray,
    fallback: false, // See the "fallback" section below
  };
}

// this gets called on each request

export async function getStaticProps({ params }) {
  const blog = await Client().getByUID("blog", params.blog);
  const tweetsData = await Client().query(
    Prismic.Predicates.at("document.type", "tweets-section")
  );
  return {
    props: {
      blog,
      tweetsData: tweetsData.results[0].data,
    },
  };
}
