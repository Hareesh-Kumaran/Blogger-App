import "../Styles/Footer/Footer.css";
import { ReactComponent as Twitter } from "../public/twitter.svg";
import { ReactComponent as Insta } from "../public/instagram.svg";
export default function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="contact-form-wrapper">
        <form>
          <label>Feedback</label>
          <textarea />
          <button>Send</button>
        </form>
      </div>
      <div className="social-media-container">
        <u>Follow us</u>
        <div className="media-wrapper">
          <Twitter />
          <span>@blogo_official_1</span>
        </div>
        <div className="media-wrapper">
          <Insta />
          <span>@ig_blogo_official</span>
        </div>
      </div>
    </div>
  );
}
