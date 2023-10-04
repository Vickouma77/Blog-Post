//import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import "../css/home.css";
import img2 from "../images/write.png";
import img from "../images/read.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  // const [firstName, setFirstName] = useState("");

  const token = JSON.parse(localStorage.getItem("token2"));

  async function fetchUser() {
    const res = await fetch("http://localhost:8999", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": token,
      },
    });

    if (res.ok) {
      const { firstName } = await res.json();
      localStorage.setItem("firstName", firstName);
    }
  }

  fetchUser();


  /*useEffect(() => {
    fetchUser();
  }, [fetchUser]); */

  // console.log(firstName);

  return (
    <>
      <Navbar />
      <main className="main">
        <div className="hero">
          <img src={img2} alt="" />
        </div>
        <div className="slogan">
          <h1>Stay curious</h1>
          <h3>
            Write and read anything you want. Share your stories with the
            world.
          </h3>
          <Link to="/write">Start writing</Link>
        </div>
      </main>
      <section className="section">
        <img src={img} alt="" />
        <div>
          <p>
              "The man who does not read has no advantage over the man who cannot read." </p>
          <p>
            <strong>― Mark Twain</strong>
          </p>
          <Link to="/blogs">Start Reading</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
