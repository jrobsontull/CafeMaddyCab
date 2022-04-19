import { useEffect } from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

import Logo from '../../../assets/img/logo.svg';
import EntryPhoto from '../../../assets/img/pressphotos/entry-1.jpeg';

function PressEntry() {
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />

        <div className="title-logo">
          <div className="logo">
            <img src={Logo} alt="Cafe Maddy Cab" />
          </div>
          <div className="cmc-title">
            <h1>Cafe Maddy Cab</h1>
            <p>NYC cab rides for Asian women, LGBTQ+ and elderly in need</p>
          </div>
        </div>
        <hr />
        <div className="press-entry">
          <div className="info-box" id="press-entry-title">
            Woman raises over $100k in 2 days to pay for Asian Americans' taxi
            rides amid rise in hate crimes
          </div>
          <img src={EntryPhoto} alt="EntryPhoto" />
          <div className="info-box" id="press-entry-content">
            <div className="entry-details">
              <p>By Jon Haworth</p>
              <p>04/06/2021</p>
            </div>
            After seeing constant news reports and one shocking video after
            another of the recent spate of hate crimes against Asian Americans
            throughout the country, Maddy Park felt scared.<br></br>
            <br></br>&quot;Last week I took the train [in New York City]. It was
            a 30-minute commute and I realized every minute of that commute I
            was terrified. I was scared that any moment in time someone might
            say a racial slur or attack me. Worst of all I thought that if
            something were to happen to me, nobody would stand up,&quot; Park
            told ABC News&apos; New York City station WABC.<br></br>
            <br></br>According to Stop AAPI Hate, a nonprofit organization that
            tracks such incidents, there were more than 3,795 hate incidents --
            including verbal harassment and physical assault -- against Asian
            Americans and Pacific Islanders in the United States from March 19,
            2020 to Feb. 28, 2021.<br></br>
            <br></br>This got her thinking.
          </div>
        </div>
        <div className="btn-link">
          <a
            href="https://abcnews.go.com/US/woman-raises-100k-days-pay-asian-americans-taxi/story?id=76895475"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on ABC News
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
