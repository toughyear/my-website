import React, { useEffect } from "react";
import TweetEmbed from "react-tweet-embed";

export default function MyTopTweets({ data }) {
  return (
    <div>
      <div className="about-intro">
        <hr className="mb-10" />
        {data.intro[0].text}
        <br />
      </div>
      {data["tweet-ids"].map((tweet) => (
        <TweetEmbed
          className="my-10"
          key={tweet.tweet}
          id={tweet.tweet}
          placeholder={"loading"}
          options={{ theme: "light" }}
        />
      ))}
    </div>
  );
}
