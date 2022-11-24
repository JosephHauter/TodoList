import React, { useState, useEffect } from "react";
import "./App.css";
import { MDBTypography } from "mdb-react-ui-kit";

export default function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  }, []);

  return (
    <div>
      <figure className="mb-0">
        <MDBTypography blockquote>
          <p>{quote}</p>
        </MDBTypography>
        <figcaption className="blockquote-footer mb-0">{author}</figcaption>
      </figure>
    </div>
  );
}
