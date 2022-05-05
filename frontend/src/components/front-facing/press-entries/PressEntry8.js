import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-8.webp';
import DonateWhite from '../../../assets/img/donate_icon_white.svg';

function PressEntry() {
  // Scroll to top on component load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />
        <Logo />

        <div className="press-entry">
          <h2 className="title">
            This fund will give money to Asian, elderly and LGBTQ people who
            need safe rides
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By Carmen Reinicke</p>
            <p className="date">05/04/2022</p>
          </div>
          <div className="press-text">
            <p>
              When Madeline Park wound down Café Maddy Cab in July 2021, she
              hoped that the fund, which reimbursed cab fares and gave out free
              ride vouchers for Asian, elderly and LGBTQ people who felt unsafe
              on New York City subways, wouldn&apos;t be needed again.
            </p>
            <p>
              Park, 29, started the fund in April 2021 after realizing she was
              terrified to take the subway to work. She put up $2,000 of her own
              money, and through donations, raised about $250,000 and reimbursed
              more than 7,800 rides in four months.
            </p>
            <p>
              But crimes against Asians in New York have continued. In 2021,
              there were 131 hate crimes against Asians, according to data from
              the New York City Police Department. That compares to 28 in 2020
              and only one recorded in 2019. There have been 17 more attacks
              this year through the end of March.
            </p>
            <p>
              Now, the fund is relaunching this month with a fundraising target
              of more than $800,000 and the goal of running for as long as
              it&apos;s needed in the community.
            </p>

            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://www.cnbc.com/2022/05/04/fund-giving-asian-elderly-and-lgbtq-people-free-cab-rides-to-relaunch.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                CNBC...
              </a>
            </div>
          </div>
        </div>
        <div className="btn-link" id="landing-page">
          <a
            href="https://www.gofundme.com/f/cafemaddycab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={DonateWhite} alt="Donate" className="icon" />
            <div className="text">Donate</div>
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
