import GetStarted from "./components/get-started";

export default function Page() {
  return (
    <main
      className={`bg-background bg-[url('https://unsplash.com/photos/XM1YUUVXj64/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzIxMDczMzQ2fA&force=true')] h-screen w-screenitems-center bg-cover bg-no-repeat`}
    >
      <div className="h-full w-full bg-background/60 p-4 glass lg:p-12 flex justify-center items-center">
      <GetStarted />
      </div>
    </main>
  );
}
