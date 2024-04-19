/* eslint-disable react/prop-types */
import { useState } from "react";
import IconArrow from "./assets/icon-arrow.svg";
import * as Yup from "yup";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatDate } from "./utils";

const InputComponent = (props) => {
  return (
    <div className="p-1 block gap-2">
      <label
        className={` block ps-0 tracking-widest p-2 text-xs font-semibold ${
          props.errors[props.name] ? "text-error-input" : "text-smokey-grey"
        }`}
        htmlFor={props.name}
      >
        {props.name.toUpperCase()}
      </label>
      <input
        {...props.register(props.name)}
        type="number"
        id={props.name}
        min={1}
        aria-invalid={props.errors}
        placeholder={props.label}
        className={`bg-white-color placeholder:font-bold font-bold placeholder:text-lg text-lg text-off-black rounded-md w-full p-2.5 border
         focus:border-primary-color focus:ring-primary-color focus:outline-none ${
           props.errors[props.name] ? "border-error-input" : "border-off-white"
         }`}
      />
      {props.errors[props.name] ? (
        <p className="text-error-input text-xs italic">
          {props.errors[props.name].message}
        </p>
      ) : null}
    </div>
  );
};

function App() {
  const schema = Yup.object().shape({
    day: Yup.string()
      .required("The Field is required")
      .min(1, "Ohh, cmon!")
      .max(31, "Must be a valid date"),
    month: Yup.string()
      .required("The Field is required")
      .min(1, "Seriously???????")
      .max(12, "Must be a valid month"),
    year: Yup.string()
      .required("The Field is required")
      .max(moment().year(), "Must be in past")
      // .min(1930, "Are you immortal?"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    // defaultValues: { day: 0, month: 0, year: 0 },
    resolver: yupResolver(schema),
  });

  const [currAge, setCurrAge] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  const daysInMonth = (year, month) => moment([year, month]).daysInMonth();

  const onSubmit = async (data) => {
    if (daysInMonth(data.year, data.month - 1) < data.day) {
      setError("day", {
        type: "manual",
        message: "Must be a valid date",
      });
    } else if(+data.year.length < 4){
      setError("year", {
        type: "manual",
        message: "Must be a valid year",
      });
    }else {
      var today = moment();
      var birthDate = moment(formatDate(data));
      var diff = today.diff(birthDate, "years");
      birthDate.add(diff, "years");
      var months = today.diff(birthDate, "months");
      birthDate.add(months, "months");
      var days = today.diff(birthDate, "days");

      setCurrAge({ day: days, month: months, year: diff });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-off-white md:p-4 max-sm:p-4">
        <div className="max-w-sm w-full pb-10 p-6 bg-white-color rounded-3xl ultra-cornered-card text-primary-color shadow-lg shadow-off-white">
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between pb-4 w-4/5 max-sm:w-full">
                <InputComponent
                  register={register}
                  errors={errors}
                  name="day"
                  label="DD"
                />
                <InputComponent
                  register={register}
                  errors={errors}
                  name="month"
                  label="MM"
                />
                <InputComponent
                  register={register}
                  errors={errors}
                  name="year"
                  label="YYYY"
                />
              </div>
              <div className="relative">
                <hr className="text-off-white my-4" />
                <button type="submit">
                  <img
                    className="absolute bg-primary-color hover:bg-off-black p-2 rounded-full right-0  -top-5 centered-button"
                    src={IconArrow}
                    alt="arrow-icon"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </form>
          </div>

          <div className="text-5xl max-sm:text-4xl font-black italic">
            <h1>
              {currAge.year || "--"}{" "}
              <span className="text-off-black">years</span>
            </h1>
            <h1>
              {currAge.month || "--"}{" "}
              <span className="text-off-black">months</span>
            </h1>
            <h1>
              {currAge.day || "--"} <span className="text-off-black">days</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
