import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Logo } from "../Components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <h3>Welcome to Job Tracking App – Simplify Your Job Search!</h3>
          <p>
            🚀 Take control of your job search journey with our easy-to-use job
            tracking app. Whether you're actively searching for a new
            opportunity or casually exploring your options, we've got you
            covered.
          </p>
          <p>
            📁 Organize Applications: Easily track job applications in one
            place. See stages like "<span>Applied</span>", "
            <span>Interview</span>," "<span>Processing</span>," and "
            <span>Declined</span>."
          </p>
          <p>
            📊 Visual Progress: Get quick insights on your job hunt. Monitor
            application stages on the dashboard.
          </p>
          <p>
            🗂️ Categorize Swiftly: Move applications as your job search
            progresses. <span>Manage interviews</span>, <span>responses</span>,
            and <span>decisions with ease</span>.
          </p>
          <p>
            📅 Stay on Schedule: Set reminders for deadlines and interviews.
            Keep your job search organized.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
