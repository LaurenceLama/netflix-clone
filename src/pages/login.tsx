import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import background from "../assets/background.png";
import logo from "../assets/logo.png";
import Loader from "netflix/components/Loader";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState(false);
  const { signUp, signIn, signInWithGoogle, signInAsGuest } = useAuth();
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      setIsSignInLoading(!isSignInLoading)
      await signIn(email, password);
      setIsSignInLoading(false)
    } else {
      setIsSignInLoading(!isSignInLoading)
      await signUp(email, password);
      setIsSignInLoading(false)
    }
  };

  const handleGuestSignIn = async () => {
    setIsGuestLoading(!isGuestLoading)
    await signInAsGuest("guest12321@gmail.com", "guest12321");
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg=black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={background}
        alt="rawr"
        className="-z-10 !hidden opacity-60 sm:!inline object-cover"
        fill
      />

      <Image
        src={logo}
        alt=""
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {login && errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {login && errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        {isSignInLoading ? (
          <Loader color="dark:fill-[#e50914]" />
        ) : (
          <button
            className="w-full rounded bg-[#e50914] py-3 font-semibold transition 
          duration-[350ms] hover:bg-[#e50914d3]"
            onClick={() => setLogin(true)}
          >
            Sign in
          </button>
        )}

        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>

        {isGuestLoading ? (
          <Loader color="dark:fill-[#e50914]" />
        ) : (
          <button
            className="w-full rounded bg-[#e50914] py-3 font-semibold transition 
          duration-[350ms] hover:bg-[#fff] hover:text-[#e50914]"
            onClick={handleGuestSignIn}
          >
            Sign in as guest
          </button>
        )}

        <button
          className="relative w-full flex bg-white text-black font-semibold
                justify-center items-center min-w-[180px] h-10 p-2 mt-4 rounded-md transition 
               duration-[350ms] hover:bg-[#4285f4] hover:text-white"
          onClick={() => signInWithGoogle()}
        >
          <figure
            className="flex justify-center items-center w-9 
                      h-9 absolute left-[5px] rounded-md bg-white"
          >
            <img
              className="h-6 w-6"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBhGqD-THvCbERB_5R1ZrqJ8wl8QGvJwsm2A&usqp=CAU"
              alt="google.png"
            />
          </figure>
          <div>Sign in with Google</div>
        </button>
      </form>
    </div>
  );
}

export default Login;
