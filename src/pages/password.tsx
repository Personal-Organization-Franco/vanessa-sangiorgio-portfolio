import { HeadFC, navigate } from "gatsby";

import MainLayout from "components/MainLayout";
import Padlock from "assets/padlock.svg";
import ArrowCircleRight from "assets/arrow-circle-right.svg";
import { FormEvent, useEffect, useState } from "react";
import { setCookie } from "utils/setCookie";
import { isPasswordSet } from "utils/isPasswordSet";

const PasswordPage = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const passwordIsSet = isPasswordSet();

  useEffect(() => {
    if (!passwordIsSet) {
      return;
    }

    navigate("/");
  }, [passwordIsSet]);

  useEffect(() => {
    if (!value) {
      setError("");
    }
  }, [value]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!value) return;

    if (value === process.env.PASSWORD) {
      setCookie();
      setError("");
      navigate("/");
    } else {
      setError("Error! Passwords don't match!");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center py-14">
        <div className="flex flex-col items-center my-40">
          <Padlock className="mb-5" />
          <h2 className="text-2xl font-medium tracking-[0.24px] mb-11 text-grey-1">
            Please enter password to view my portfolio
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <label
              htmlFor="password"
              className="relative flex flex-col border-solid border-2 rounded-xl py-1.5 px-4 border-[#6b6b6b] text-grey-1 focus-within:border-[#306FDB]"
            >
              <span className="text-grey-2 text-xs">Password</span>
              <input
                type="password"
                id="password"
                className="border-0 focus:outline-none focus-visible:outline-none text-grey-1 text-normal"
                value={value}
                onChange={event => setValue(event.target.value)}
              />
              <button
                type="submit"
                disabled={!value}
                className="absolute cursor-pointer bottom-1.5 right-4 disabled:opacity-60"
              >
                <ArrowCircleRight />
              </button>
            </label>
            {error && (
              <div className="w-fit mt-3 italic text-lg font-normal">
                {error}
              </div>
            )}
          </form>
          <div className="flex mt-4 text-xl font-normal">
            <p>Would you like the password?</p>
            <a
              className="text-[#0166CC] ml-1.5"
              href="mailto:vanessa.sangiorgio@yahoo.co.uk"
            >
              Request it here
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PasswordPage;
export const Head: HeadFC = () => <title>Password Page</title>;
