import Head from "next/head";
import getData from "../data/binance";
import { CSSProperties, useEffect, useState } from "react";
import MoonLoader from "../node_modules/react-spinners/MoonLoader";
import useSound from "../node_modules/use-sound/dist/index";
import clsx from "clsx";

const override: CSSProperties = {
  color: "red",
  position: "fixed",
};

const Home = () => {
  const [linaBtc, setLinaBtc] = useState<number>(0);
  const [linaUsdt, setLinaUsdt] = useState<number>(0);
  const [btcUsdt, setBtcUsdt] = useState<number>(0);
  const [cosUsdt, setCosUsdt] = useState<number>(0);
  const [cosBtc, setCosBtc] = useState<number>(0);
  const [action, setAction] = useState<string | null>("");
  const [condition, setCondition] = useState<{
    LINABTC: { ">": boolean; "<": boolean; ">=": boolean; "<=": boolean };
    COSBTC: { ">": boolean; "<": boolean; ">=": boolean; "<=": boolean };
  }>({
    LINABTC: {
      ">": false,
      "<": false,
      ">=": false,
      "<=": false,
    },
    COSBTC: {
      ">": false,
      "<": false,
      ">=": false,
      "<=": false,
    },
  });
  const [targetPrice, setTargetPrice] = useState<{
    LINABTC: number;
    COSBTC: number;
  }>({
    LINABTC: 0,
    COSBTC: 0,
  });
  const [loading, setLoading] = useState(false);

  // Get current date
  // const [date, setDate] = useState<any>();
  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setDate(new Date());
  //   }, 1000);
  //   return function cleanup() {
  //     clearInterval(timerId);
  //   };
  // });

  const [playOn] = useSound("/alarm.mp3", { volume: 0.95 });

  async function fetchData() {
    if (linaBtc === 0) setLoading(true);
    const data = await getData();
    if (data) setLoading(false);
    setLinaBtc(Number(((data.LINAUSDT / data.BTCUSDT) * 100000000).toFixed(2)));
    setLinaUsdt(data.LINAUSDT);
    setBtcUsdt(data.BTCUSDT);
    setCosBtc(Number(((data.COSUSDT / data.BTCUSDT) * 100000000).toFixed(2)));
    setCosUsdt(data.COSUSDT);
  }

  function stop() {
    setCondition((condition) => ({
      ...condition,
      LINABTC: {
        ">": false,
        "<": false,
        ">=": false,
        "<=": false,
      },
      COSBTC: {
        ">": false,
        "<": false,
        ">=": false,
        "<=": false,
      },
    }));
    setTargetPrice({ LINABTC: 0, COSBTC: 0 });
    setLinaBtc(0);
    setLinaUsdt(0);
    setBtcUsdt(0);
    setCosBtc(0);
    setCosUsdt(0);
  }

  const [alert, setAlert] = useState<{ LINABTC: boolean; COSBTC: boolean }>({
    LINABTC: false,
    COSBTC: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (action == "Start") fetchData();
      if (action == "Stop") {
        setLinaBtc(0);
        setLinaUsdt(0);
        setBtcUsdt(0);
        setCosBtc(0);
        setCosUsdt(0);
      }
      condition.LINABTC[">"] === true
        ? linaBtc > targetPrice.LINABTC
          ? (setAlert((c) => ({ ...c, LINABTC: true })), playOn())
          : setAlert((c) => ({ ...c, LINABTC: false }))
        : null;
      condition.LINABTC["<"] === true
        ? linaBtc < targetPrice.LINABTC
          ? (setAlert((c) => ({ ...c, LINABTC: true })), playOn())
          : setAlert((c) => ({ ...c, LINABTC: false }))
        : null;
      condition.LINABTC[">="] === true
        ? linaBtc >= targetPrice.LINABTC
          ? (setAlert((c) => ({ ...c, LINABTC: true })), playOn())
          : setAlert((c) => ({ ...c, LINABTC: false }))
        : null;
      condition.LINABTC["<="] === true
        ? linaBtc <= targetPrice.LINABTC
          ? (setAlert((c) => ({ ...c, LINABTC: true })), playOn())
          : setAlert((c) => ({ ...c, LINABTC: false }))
        : null;

      // condition.LINABTC[">"] === false &&
      // condition.LINABTC["<"] === false &&
      // condition.LINABTC[">="] === false &&
      // condition.LINABTC["<="] === false
      //   ? setAlert((c) => ({ ...c, LINABTC: false }))
      //   : null;

      condition.COSBTC[">"] === true
        ? cosBtc > targetPrice.COSBTC
          ? (setAlert((c) => ({ ...c, COSBTC: true })), playOn())
          : setAlert((c) => ({ ...c, COSBTC: false }))
        : null;
      condition.COSBTC["<"] === true
        ? cosBtc < targetPrice.COSBTC
          ? (setAlert((c) => ({ ...c, COSBTC: true })), playOn())
          : setAlert((c) => ({ ...c, COSBTC: false }))
        : null;
      condition.COSBTC[">="] === true
        ? cosBtc >= targetPrice.COSBTC
          ? (setAlert((c) => ({ ...c, COSBTC: true })), playOn())
          : setAlert((c) => ({ ...c, COSBTC: false }))
        : null;
      condition.COSBTC["<="] === true
        ? cosBtc <= targetPrice.COSBTC
          ? (setAlert((c) => ({ ...c, COSBTC: true })), playOn())
          : setAlert((c) => ({ ...c, COSBTC: false }))
        : null;

      // condition.COSBTC[">"] === false &&
      // condition.COSBTC["<"] === false &&
      // condition.COSBTC[">="] === false &&
      // condition.COSBTC["<="] === false
      //   ? setAlert((c) => ({ ...c, COSBTC: false }))
      //   : null;
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [action, linaBtc, condition, targetPrice, cosBtc, alert]);

  useEffect(() => {
    condition.LINABTC[">"] === false &&
    condition.LINABTC["<"] === false &&
    condition.LINABTC[">="] === false &&
    condition.LINABTC["<="] === false
      ? setAlert((c) => ({ ...c, LINABTC: false }))
      : null;
    condition.COSBTC[">"] === false &&
    condition.COSBTC["<"] === false &&
    condition.COSBTC[">="] === false &&
    condition.COSBTC["<="] === false
      ? setAlert((c) => ({ ...c, COSBTC: false }))
      : null;
  }, [condition]);

  function sendWa() {
    window.open(
      `https://api.whatsapp.com/send?phone=+6289510011398&text=LINA-${linaBtc}%20%7C%7C%20COS-${cosBtc}`
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Head>
        <title>Bot trading</title>
        <meta name="description" content="Generated by create next app" />

        <link rel="icon" href="/bitcoin.png" type="image/x-icon" />
      </Head>

      {/* <div>{date ? date.toLocaleTimeString("en-GB") : "00.00.00"}</div> */}

      <MoonLoader color={"#991b1b"} loading={loading} cssOverride={override} />
      <div className="flex w-11/12">
        <table className="shadow-2-xl font-[Poppins] mx-auto border-2 border-sky-200 overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="py-3 px-6 bg-sky-800">Main Coin</th>
              <th className="py-3 px-6  bg-sky-800">Price</th>
              <th className="py-3 px-6  bg-sky-800">BaseCoin1</th>
              <th className="py-3 px-6  bg-sky-800">BaseCoin2</th>
            </tr>
          </thead>
          <tbody className="text-sky-900 text-center">
            <tr className="bg-sky-200 hover:scale-105 hover:bg-sky-100 cursor-pointer duration-300">
              <td className="py-3">LINABTC</td>
              <td className="py-3">{linaBtc || "00.00"}</td>
              <td className="py-3 text-xs ">
                LinaUsdt = {linaUsdt || "0.00000000"}
              </td>
              <td className="py-3 text-xs ">
                BtcUsdt = {btcUsdt || "00000.00000000"}
              </td>
            </tr>
            <tr className="bg-sky-200 hover:scale-105 hover:bg-sky-100 cursor-pointer duration-300">
              <td className="py-3">COSBTC</td>
              <td className="py-3">{cosBtc || "00.00"}</td>
              <td className="py-3 text-xs ">
                CosUsdt = {cosUsdt || "0.000000000"}
              </td>
              <td className="py-3 text-xs ">
                BtcUsdt = {btcUsdt || "00000.00000000"}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="shadow-2-xl font-[Poppins] mx-auto border-2 border-orange-100 overflow-hidden">
          <thead className="text-white">
            <tr>
              <th className="py-3 px-6 bg-orange-400">Coin</th>
              <th className="py-3 px-6  bg-orange-400">Price</th>
              <th className="py-3 px-6  bg-orange-400">Condition</th>
              <th className="py-3 px-6  bg-orange-400">Target Price</th>
            </tr>
          </thead>
          <tbody className="text-sky-900 text-center">
            <tr
              className={clsx(
                alert.LINABTC === true ? "bg-red-400" : "bg-slate-200"
              )}
            >
              <td className="py-3">LINABTC</td>
              <td className="py-3">{linaBtc}</td>
              <td className="py-3 text-xs ">
                <div className="flex justify-between text-white font-bold">
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.LINABTC[">"] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        LINABTC: {
                          // ...condition.LINABTC,
                          // '>': !condition.LINABTC['>']
                          ">": !condition.LINABTC[">"],
                          "<": false,
                          ">=": false,
                          "<=": false,
                        },
                      }))
                    }
                  >
                    {">"}
                  </div>
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.LINABTC["<"] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        LINABTC: {
                          // ...condition.LINABTC,
                          // '<': !condition.LINABTC['<']
                          ">": false,
                          "<": !condition.LINABTC["<"],
                          ">=": false,
                          "<=": false,
                        },
                      }))
                    }
                  >
                    {"<"}
                  </div>
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.LINABTC[">="] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        LINABTC: {
                          ">": false,
                          "<": false,
                          ">=": !condition.LINABTC[">="],
                          "<=": false,
                        },
                      }))
                    }
                  >
                    {">="}
                  </div>
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.LINABTC["<="] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        LINABTC: {
                          ">": false,
                          "<": false,
                          ">=": false,
                          "<=": !condition.LINABTC["<="],
                        },
                      }))
                    }
                  >
                    {"<="}
                  </div>
                </div>
              </td>
              <td className="py-3 text-xs ">
                <div>
                  <input
                    className="testing p-4 w-20 focus:border-orange-400 rounded-md outline-none border shadow-[0_1px_#64748b]"
                    type="number"
                    name=""
                    id=""
                    value={targetPrice.LINABTC || ""}
                    onChange={(e) =>
                      setTargetPrice((prev) => ({
                        ...prev,
                        LINABTC: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </td>
            </tr>

            <tr
              className={clsx(
                alert.COSBTC === true ? "bg-red-400" : "bg-slate-200"
              )}
            >
              <td className="py-3">COSBTC</td>
              <td className="py-3">{cosBtc}</td>
              <td className="py-3 text-xs ">
                <div className="flex justify-between text-white font-bold">
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.COSBTC[">"] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        COSBTC: {
                          ">": !condition.COSBTC[">"],
                          "<": false,
                          ">=": false,
                          "<=": false,
                        },
                      }))
                    }
                  >
                    {">"}
                  </div>
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.COSBTC["<"] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        COSBTC: {
                          ">": false,
                          "<": !condition.COSBTC["<"],
                          ">=": false,
                          "<=": false,
                        },
                      }))
                    }
                  >
                    {"<"}
                  </div>
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.COSBTC[">="] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        COSBTC: {
                          ">": false,
                          "<": false,
                          ">=": !condition.COSBTC[">="],
                          "<=": false,
                        },
                      }))
                    }
                  >
                    {">="}
                  </div>
                  <div
                    className={clsx(
                      "cursor-pointer bg-slate-400 p-2 shadow-[0_5px_#334155] active:shadow-none active:relative active:top-[7px] rounded-md",
                      condition.COSBTC["<="] === true
                        ? "bg-green-600 shadow-[0_5px_#3f6212]"
                        : null
                    )}
                    onClick={() =>
                      setCondition((condition) => ({
                        ...condition,
                        COSBTC: {
                          ">": false,
                          "<": false,
                          ">=": false,
                          "<=": !condition.COSBTC["<="],
                        },
                      }))
                    }
                  >
                    {"<="}
                  </div>
                </div>
              </td>
              <td className="py-3 text-xs ">
                <div>
                  <input
                    className="testing p-4 w-20 focus:border-orange-400 rounded-md outline-none border shadow-[0_1px_#64748b]"
                    type="number"
                    name=""
                    id=""
                    value={targetPrice.COSBTC || ""}
                    onChange={(e) =>
                      setTargetPrice((prev) => ({
                        ...prev,
                        COSBTC: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 font-bold">
        <div
          onClick={() => {
            fetchData();
            setAction("Start");
          }}
          className="cursor-pointer shadow-[0_7px_#ea580c] active:shadow-none active:relative active:top-[7px] text-white bg-[#fb923c] px-7 py-2 rounded-md"
        >
          <button>Count</button>
        </div>
        <div
          onClick={sendWa}
          className="cursor-pointer shadow-[0_7px_#1a7940] active:shadow-none active:relative active:top-[7px] text-white bg-[#5dca88] px-7 py-2 rounded-md"
        >
          <button>Send</button>
        </div>
        <div
          onClick={() => {
            stop();
            setAction("Stop");
          }}
          className="cursor-pointer shadow-[0_7px_#b91c1c] active:shadow-none active:relative active:top-[7px] text-white bg-[#f87171] px-7 py-2 rounded-md"
        >
          <button>Stop</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
