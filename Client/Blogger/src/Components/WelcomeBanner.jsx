import { useSelector } from "react-redux";
export default function WelcomeBanner()
{
    const {userDetails}=useSelector(((state)=>state.user))

    return (
      <div className="welcome-Banner-Wrapper">
        <video className="video-Class" autoPlay muted loop>
          <source
            src="https://cdn.dribbble.com/uploads/39421/original/963b4f8739cbdf86ca3f3a23245efd18.mp4?1657824985"
            type="video/mp4"
          ></source>
        </video>
        <div className="welcome-Banner-Message">
            Welcome {(userDetails.firstname)?userDetails.firstname:"Blogger"} ,Lets blog.
        </div>
      </div>
    );
}
