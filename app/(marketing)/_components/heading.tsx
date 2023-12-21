import SignInBtns from "./SignInBtns";

function Heading() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 max-w-3xl">
      <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-950 dark:text-slate-50">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <p className="font-medium text-slate-800 text-base sm:text-lg md:text-2xl dark:text-slate-200">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </p>

      <SignInBtns />
    </div>
  );
}
export default Heading;
