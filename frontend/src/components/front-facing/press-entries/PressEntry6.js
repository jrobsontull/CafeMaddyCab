import { useEffect } from 'react';

import Navbar from '../Navbar';
import Footer from '../Footer';

import Logo from '../../../assets/img/logo.svg';
import EntryPhoto from '../../../assets/img/pressphotos/entry-6.jpeg';

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
            快看世界／害怕坐紐約地鐵？亞裔搭出租車 她幫您報銷
          </div>
          <img src={EntryPhoto} alt="EntryPhoto" />
          <div className="info-box" id="press-entry-content">
            <div className="entry-details">
              <p>By 何卓賢</p>
              <p>04/14/2021</p>
            </div>
            在紐約地鐵,亞裔遭無故攻擊事件頻發,很多人不再敢坐地鐵,卻支付不起出租車費用。家住布魯克林的28歲亞裔Madeline
            Park決定幫忙<br></br> <br></br>
            一開始,她個人投入2000美金,鼓勵害怕坐地鐵但必須要出行的亞裔先搭出租車,後問她報銷車費。沒想到她的點子一夜間獲讚無數,她的Venmo賬號上不斷有人捐款,支持她的行動。
            <br></br> <br></br>
            現在,波士頓、舊金山和洛杉磯等城市也有志願者成立了類似的Instagram賬號,幫助有需要的亞裔。
          </div>
        </div>
        <div className="btn-link">
          <a
            href="https://www.worldjournal.com/wj/story/121469/5389175"
            target="_blank"
            rel="noopener noreferrer"
          >
            繼續閱讀世界日報
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PressEntry;
