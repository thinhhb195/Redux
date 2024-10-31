import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {handleAddQuestion} from "../actions/questions";
import 'bootstrap/dist/css/bootstrap.min.css';

const NewPoll = ({dispatch}) => {
    const navigate = useNavigate();
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");
    const [validation, setValidation] = useState({
        firstOption: '',
        secondOption: ''
      });

    const handleFirstOptionChange = (e) => {
        const value = e.target.value;
        setFirstOption(value);
    };

    const handleSecondOptionChange = (e) => {
        const value = e.target.value;
        setSecondOption(value);
    };
    const checkValidation = () => {
    let errors = validation;
    //first option 1 validation
    if (!firstOption) {
        errors.firstOption = 'Option 1 is required';
      } else {
        errors.firstOption = '';
    }

    if (!secondOption) {
        errors.secondOption = 'Option 2 is required';
      } else if (secondOption === firstOption) {
        errors.secondOption = 'Option 2 must different option 1';
      } else {
        errors.secondOption = '';
      }

    setValidation(errors);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validation.firstOption && !validation.secondOption) {
        dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mt-9">New Poll</h1>
            <form onSubmit={handleSubmit}>

                <div className="mt-3">
                    <label htmlFor="firstOption"
                           data-testid="firstOptionLabel"
                           className="block text-sm font-medium text-slate-700">First Option</label>
                    <div className="mt-1">
                        <input
                            value={firstOption}
                            onChange={handleFirstOptionChange}
                            type="text"
                            maxLength={255}
                            required
                            name="firstOption"
                            id="firstOption"
                            data-testid="firstOption"
                            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"/>
                            {validation.firstOption && <p className="error_message">{validation.firstOption}</p>}
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="secondOption"
                           data-testid="secondOptionLabel"
                           className="block text-sm font-medium text-slate-700">Second Option</label>
                    <div className="mt-1">
                        <input
                            value={secondOption}
                            onChange={handleSecondOptionChange}
                            type="text"
                            name="secondOption"
                            required
                            maxLength={255}
                            id="secondOption"
                            data-testid="secondOption"
                            className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"/>
                            {validation.secondOption && <p className="error_message">{validation.secondOption}</p>}
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button type="submit"
                            data-testid="submit-poll"
                            className="w-100"
                            onClick={checkValidation}>
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default connect()(NewPoll);
