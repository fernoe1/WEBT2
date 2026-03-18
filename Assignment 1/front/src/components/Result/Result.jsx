import s from './Result.module.css';

const Result = ({ result}) => {
    let category = "";
    let categoryClass = "";

    if (result) {
        if (result < 18.5) {
            category = "Underweight";
            categoryClass = s.underweight;
        } else if (result >= 18.5 && result < 24.9) {
            category = "Normal weight";
            categoryClass = s.normal;
        } else if (result >= 25 && result < 29.9) {
            category = "Overweight";
            categoryClass = s.overweight;
        } else {
            category = "Obese";
            categoryClass = s.obese;
        }
    }


    return (
        <div className={`${s.resultContainer} ${categoryClass}`}>
            <p className={s.result}>
                {result ? `BMI: ${result}  Category: ${category}` : ""}
            </p>
        </div>
    );
}

export default Result;