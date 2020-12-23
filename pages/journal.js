import Link from "next/link";
import { RichText } from "prismic-reactjs";
import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/nav";
import { Client } from "../prismic-configuration";
import Prismic from "prismic-javascript";
import moment from "moment";
import Head from "next/head";

function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const today = new Date(date);

  return today.toLocaleDateString("en-US", options);
}

function giveTime(DateStr) {
  let entryDate = new Date(DateStr);
  var momentObj = moment(entryDate);
  return momentObj.format("LLLL");
}

const index = ({ journals, metaData }) => {
  metaData = metaData.results[0].data;

  const og = {
    title: RichText.asText(metaData["journal-title"]),
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
        <div className="w-full max-w-4xl mx-auto px-8">
          {" "}
          <h1 className="blog-title text-6xl mb-10 md:text-7xl text-left">
            Weight of<span className="amp"> </span>
            <span className="primary-color-font"> Thoughts</span>
          </h1>
          <h1 className=" text-2xl mb-10 text-left font-serif italic">
            Journal with random thoughts and ideas that float around in my head.
          </h1>
          <div className="grid grid-cols-1 gap-y-10">
            {journals.results.map((journal, index) => (
              <div className=" writing-row p-0" key={journal.uid}>
                <div className="writing-date">
                  {giveTime(journal.data.time)}
                </div>

                <div className="writing-title font-serif italic">
                  {RichText.render(journal.data["title"])}
                </div>
                <div className="">{RichText.render(journal.data["entry"])}</div>
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
  const journals = await Client().query(
    Prismic.Predicates.at("document.type", "journal"),
    {
      pageSize: 200,
    }
  );

  const metaData = await Client().query(
    Prismic.Predicates.at("document.type", "metadata")
  );

  return {
    props: {
      journals,
      metaData,
    },
  };
}
