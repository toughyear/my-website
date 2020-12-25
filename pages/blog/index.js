import Link from "next/link";
import { RichText } from "prismic-reactjs";
import React from "react";
import Footer from "../../components/Footer";
import Nav from "../../components/nav";
import { Client } from "../../prismic-configuration";
import Prismic from "prismic-javascript";
import Head from "next/head";

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date(date);

  return today.toLocaleDateString("en-US", options);
}

const index = ({ blogs, metaData }) => {
  console.log(blogs);
  metaData = metaData.results[0].data;

  const og = {
    title: RichText.asText(metaData["blog-title"]),
    description: RichText.asText(metaData.description),
    imageURL: metaData.image.url,
  };
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        {/* Primary Meta Tags  */}
        <meta key="description" name="description" content={og.description} />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rajeevnaruka.com/" />
        <meta key="og:title" property="og:title" content={og.title} />
        <meta
          key="og:description"
          property="og:description"
          content={og.description}
        />
        <meta key="og:image" property="og:image" content={og.imageURL} />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rajeevnaruka.com/" />
        <meta key="twitter:title" property="twitter:title" content={og.title} />
        <meta
          key="twitter:description"
          property="twitter:description"
          content={og.description}
        />
        <meta
          key="twitter:image"
          property="twitter:image"
          content={og.imageURL}
        />

        <meta property="og:site_name" content="Rajeev Singh Naruka" />
        <meta name="twitter:site" content="@RajeevSinghN" />

        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>

        <title>{og.title}</title>
      </Head>

      <div>
        <Nav />
        <div className="w-full max-w-7xl mx-auto px-8">
          {" "}
          <h1 className="blog-title text-6xl  md:text-7xl text-left">
            Code, Numbers <span className="amp">&</span>{" "}
            <span className="primary-color-font">Startups</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-5">
            {blogs.results.map((blog, index) => (
              <div className=" writing-row p-0" key={blog.uid}>
                <div className="writing-date">
                  {formatDate(blog.data.date)}
                  {/* {blog.tags.length > 0
                    ? `${formatDate(
                        blog.data.date
                      )} in: ${blog.tags.map((elem, index) =>
                        index === 0
                          ? elem.toUpperCase()
                          : `| ${elem.toUpperCase()}`
                      )}`
                    : `${formatDate(blog.data.date)}`} */}
                </div>
                <Link href={`blog/${blog.uid}`}>
                  <a>
                    <span className="writing-title">
                      {RichText.render(blog.data["title"])}
                    </span>
                  </a>
                </Link>
                <div className="writing-date"></div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const blogs = await Client().query(
    Prismic.Predicates.at("document.type", "blog"),
    {
      pageSize: 200,
      orderings: "[my.blog.date desc]",
    }
  );

  const metaData = await Client().query(
    Prismic.Predicates.at("document.type", "metadata")
  );

  return {
    props: {
      blogs,
      metaData,
    },
  };
}
