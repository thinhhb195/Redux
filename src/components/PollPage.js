import {connect,useSelector} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {handleAddAnswer} from "../actions/questions";
import "./PollPage.css";
import {Link} from "react-router-dom";

const PollPage = ({dispatch, authedUser, question, author}) => {
    const { question_id } = useParams();
    const navigate = useNavigate();
    const questionsss = useSelector((state) => state.question.questions);

    if (!authedUser || !question || !author) {
        question = questionsss;
        return <Navigate to="/404"/>;
    }

    const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
    const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    const handleOptionOne = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionOne"));
            return <Navigate to="/questions/${question.id}"/>;
    };

    const handleOptionTwo = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionTwo"));
    };

    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + " %";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + " %";
            default:
                return "";
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mt-9">Poll by {author.id}</h1>

            <div className="flex justify-center">
                <img src={author.avatarURL} alt="Profile" className="h-24 w-24"/>
            </div>

            <div className="flex justify-center">
                <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">

                <button onClick={handleOptionOne} disabled={hasVoted}
                        className={"p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " + (hasVotedForOptionOne ? "bg-lime-400" : "")}>
                    <div className={hasVotedForOptionOne ? "chosen" : ""}>
                        <p className="font-bold mb-2">{question.optionOne.text}</p>
                        {!hasVoted &&
                        <p className="underline underline-offset-4 mb-3">Click</p>
                        }
                        {hasVoted &&
                        <p className="text-xs">Votes: {question.optionOne.votes.length} ({calcPercentage("optionOne", question)})</p>
                        }
                    </div>
                </button>
                <Link to={'/questions/' + question.id} id="id">

                <button onClick={handleOptionTwo} disabled={hasVoted}
                        className={"p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " + (hasVotedForOptionTwo ? "bg-lime-400" : "")}>
                    <p className="font-bold mb-2">{question.optionTwo.text}</p>
                    {!hasVoted &&
                    <p className="underline underline-offset-4 mb-3">Click</p>
                    }
                    {hasVoted &&
                    <p className="text-xs">Votes: {question.optionTwo.votes.length} ({calcPercentage("optionTwo", question)})</p>
                    }
                </button>
                </Link>
            </div>
            <Link to={'/questions/' + question.id} id="id">123</Link>

        </div>
    );
};

const mapStateToProps = ({authedUser, users, questions}) => {
    try {
        const question = Object.values(questions).find((question) => question.id === useParams().id);
        const author = Object.values(users).find((user) => user.id === question.author);
        return {authedUser, author, question};
    } catch (e) {
        return <Navigate to="/404"/>;
    }
};

export default connect(mapStateToProps)(PollPage);
