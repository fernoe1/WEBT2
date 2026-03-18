import { useState, useEffect } from 'react';
import { useBMI } from '../../hooks/useBMI';
import s from './BMI.module.css';
import Result from '../Result/Result';

const validateHeight = (height) => {
    if (!height || height === "") return "Height is required";

    const h = Number(height);
    if (h <= 0) return "Height must be greater than 0";
    if (h > 300) return "Height seems too high";

    return null;
}

const validateWeight = (weight) => {
    if (!weight || weight === "") return "Weight is required";

    const w = Number(weight);
    if (w <= 0) return "Weight must be greater than 0";

    return null;
}


const BMI = () => {
    const [formData, setFormData] = useState({
        height: "",
        weight: ""
    });


    const [errors, setErrors] = useState({
        height: null,
        weight: null
    });

    const [touched, isTouched] = useState({
        height: false,
        weight: false
    });

    const [BMI, setBMI] = useState(null);
    const { isCalculating, calculationError, calculateBMI } = useBMI();

    useEffect(() => {
        const newErrors = {
            height: (touched.height || formData.height) ? validateHeight(formData.height) : null,
            weight: (touched.weight || formData.weight) ? validateWeight(formData.weight) : null,
        };

        setErrors(newErrors);
    }, [formData, touched]);


    const handleOnBlur = (e) => {
        const { id } = e.target;
        isTouched((prev) => ({
            ...prev,
            [id]: true
        }));
    }

    const handeOnChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    }



    const handleOnSubmit = async (e) => {
        e.preventDefault();

        isTouched({
            height: true,
            weight: true
        });

        if (!errors.height && !errors.weight) {
            const result = await calculateBMI(Number(formData.height), Number(formData.weight));
            setBMI(result.bmi);
        }
    }

    
    return (
        <>
            <form className={s.form} noValidate onSubmit={(e) => handleOnSubmit(e)}>
                <div className={s.formInputContainer}>
                    <label
                        htmlFor="height"
                        className={`${s.formLabel} ${errors.height ? s.formLabelError : ''}`}
                    >
                        {errors.height ? errors.height : "Height (cm)"}
                    </label>
                    <input
                        className={`${s.formInput} ${errors.height ? s.formInputError : ''}`}
                        type="number"
                        id="height"
                        value={formData.height}
                        onChange={(e) => handeOnChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />

                    <label
                        htmlFor="weight"
                        className={`${s.formLabel} ${errors.weight ? s.formLabelError : ''}`}
                    >
                        {errors.weight ? errors.weight : "Weight (kg)"}
                    </label>
                    <input 
                        className={`${s.formInput} ${errors.weight ? s.formInputError : ''}`}
                        type="number"
                        id="weight"
                        value={formData.weight}
                        onChange={(e) => handeOnChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />

                    <button
                        className={s.formSubmit}
                        type="submit"
                        disabled={isCalculating}
                    >
                        {isCalculating ? "Calculating BMI..." : "Calculate BMI"}
                    </button>
                </div>
            </form>

            {BMI !== null && (
                <Result result={BMI}/>
            )}
        </>
    );
}

export default BMI;