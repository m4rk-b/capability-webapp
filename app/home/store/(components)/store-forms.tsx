"use client";
import { bidding } from "@/test_db";
import React, { useRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FaMoneyBillWave } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format, isAfter, isBefore } from "date-fns";
import { toZonedTime } from "date-fns-tz";

type Item = {
  itemid: number;
  sessionid: number;
  currentbid: number;
  starttime: Date;
  endtime: Date;
  winninguser: string;
};

const StoreForms: React.FC<Item> = ({
  itemid,
  sessionid,
  currentbid,
  starttime,
  endtime,
  winninguser,
}) => {
  const { pending } = useFormStatus();
  const bidvalue = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState("");

  const targetDate = new Date(endtime);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const singaporeTime = toZonedTime(now, "Asia/Singapore"); // Convert to Singapore timezone
      const formattedDate = format(
        singaporeTime,
        "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
      );

      // Current time in milliseconds
      const currentTime = new Date(formattedDate).getTime();

      // Calculate countdown
      const timeDifference = targetDate.getTime() - currentTime;

      // Update countdown for minutes and seconds
      if (timeDifference > 0) {
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);

        setCountdown(`${minutes}m ${seconds}s`);
      } else {
        setIsDisabled(true);
        setCountdown("Time is up!");
      }
    };

    // Check time immediately on component mount
    checkTime();

    // Set an interval to check the time every second
    const intervalId = setInterval(checkTime, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [targetDate]);

  const placebid = async () => {
    const result = await bidding(
      itemid,
      sessionid,
      parseInt(bidvalue.current?.value || "0")
    );

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <>
      <div hidden={isDisabled} className="m-auto">
        <strong>Bidding will end in: </strong>{countdown}
      </div>
      <form>
        <div className="flex">
          <p className="m-auto justify-start">
            <strong>Winning:</strong> {winninguser}
          </p>
          <div className="card-actions justify-end">
            <input
              disabled={isDisabled}
              ref={bidvalue}
              defaultValue={currentbid}
              className="input input-bordered input-xs w-14 max-w-xs text-center"
            />
            <button
              disabled={isDisabled}
              type="button"
              className="btn btn-xs btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                placebid();
              }}
            >
              <FaMoneyBillWave />
              Bid
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StoreForms;
