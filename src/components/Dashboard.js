import {connect} from "react-redux";
import {useState } from "react";
import Card from "./Card";

const Dashboard = ({authedUser, questions, users}) => {
    const [isDefaultView, setIsDefaultView] = useState(true);

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));

    return (
        <div>
            <h1 className="text-3xl font-bold mt-9" data-testid="heading">Dashboard</h1>
            <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
            checked={isDefaultView}
            onChange={() => setIsDefaultView(true)}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">
            Unanswered
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            autoComplete="off"
            checked={!isDefaultView}
            onChange={() => setIsDefaultView(false)}
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio2">
            Answered
          </label>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
            isDefaultView ? questions
                    .filter(unanswered)
                    .map((question) => (
                        <li key={question.id}>
                            <Card question={question} author={users[question.author]}/>
                        </li>
                    )) : questions
                    .filter(answered)
                    .map((question) => (
                        <li key={question.id}>
                            <Card question={question} author={users[question.author]}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Dashboard);
