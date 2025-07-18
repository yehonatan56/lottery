import { useEffect, useState } from "react";
import { useLottaryStore } from "../store";
import { useNavigate } from "react-router-dom";
import { repo } from "remult";
import { Lottary } from "../shared/lottaries";
import Wheel from "../base-components/wheel/wheel";
import React from "react";

export default function Lottery() {
  const [participants, setParticipants] = useState<string[]>([]);
  // @ts-ignore
  const lotteryName = useLottaryStore((state) => state.lottaryName);
  const navigate = useNavigate();
  useEffect(() => {
    if (!lotteryName) navigate("/");

    return repo(Lottary)
      .liveQuery({
        where: { name: lotteryName },
      })
      .subscribe((info) => {
        const changes = info.items;
        if (changes.length > 0) {
          const lottary = changes[0];
          console.log(lottary.participants);
          setParticipants(lottary.participants);
        } else {
          setParticipants([]); // אם לא נמצא לוטו, אפס את הרשימה
        }
      });
  }, [lotteryName]);
  return <Wheel items={participants} />;
}
