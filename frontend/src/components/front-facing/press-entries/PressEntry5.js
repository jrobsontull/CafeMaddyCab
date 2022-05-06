import { useEffect } from 'react';

import Navbar from '../Navbar';
import Logo from '../Logo';
import Footer from '../Footer';

import EntryPhoto from '../../../assets/img/pressphotos/entry-5.webp';
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
            快看世界／害怕坐紐約地鐵？亞裔搭出租車 她幫您報銷
          </h2>
          <img src={EntryPhoto} alt="Entry Header" className="entry-img" />
          <div className="entry-details">
            <p className="author">By 何卓賢</p>
            <p className="date">04/14/2021</p>
          </div>
          <div className="press-text">
            <p>
              在紐約地鐵,亞裔遭無故攻擊事件頻發,很多人不再敢坐地鐵,卻支付不起出租車費用。家住布魯克林的28歲亞裔Madeline
              Park決定幫忙
            </p>
            <p>
              一開始,她個人投入2000美金,鼓勵害怕坐地鐵但必須要出行的亞裔先搭出租車,後問她報銷車費。沒想到她的點子一夜間獲讚無數,她的Venmo賬號上不斷有人捐款,支持她的行動。
            </p>
            <p>
              現在,波士頓、舊金山和洛杉磯等城市也有志願者成立了類似的Instagram賬號,幫助有需要的亞裔。
            </p>

            <div className="read-more">
              Finish reading on{' '}
              <a
                href="https://www.worldjournal.com/wj/story/121469/5389175"
                target="_blank"
                rel="noopener noreferrer"
              >
                世界日報...
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
