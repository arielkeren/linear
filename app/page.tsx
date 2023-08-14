"use client";

import { useState } from "react";
import Panel from "./components/Panel";
import Plane from "./components/Plane";
import IGraph from "@/types";
import Menu from "./components/Menu";

const Home: React.FC = () => {
  const [slots, setSlots] = useState<IGraph[]>([]);
  const [openSlotIndex, setOpenSlotIndex] = useState<number | null>(null);

  const COLORS = [
    "#3b82f6",
    "#6366f1",
    "#14b8a6",
    "#ec4899",
    "#f59e0b",
    "#06b6d4",
    "#f43f5e",
    "#eab308",
    "#22c55e",
    "#d946ef",
  ];

  const addSlot = () => {
    let colorIndex = 0;
    for (let i = 0; i < 10; i++)
      slots.forEach((slot) => {
        if (slot.color === COLORS[colorIndex]) colorIndex++;
      });

    setSlots((previousSlots) => [
      ...previousSlots,
      {
        equation: "",
        isShown: true,
        color: COLORS[colorIndex],
        thickness: 10,
      },
    ]);
  };

  const changeSlot = (slotIndex: number, newSlot: string) => {
    const newSlots = [...slots];
    newSlots[slotIndex].equation = newSlot;
    setSlots(newSlots);
  };

  const deleteSlot = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots.splice(slotIndex, 1);
    setSlots(newSlots);
  };

  const toggleVisibility = (slotIndex: number) => {
    const newSlots = [...slots];
    newSlots[slotIndex].isShown = !newSlots[slotIndex].isShown;
    setSlots(newSlots);
  };

  const changeColor = (newColor: string) => {
    if (openSlotIndex === null) return;

    const newSlots = [...slots];
    newSlots[openSlotIndex].color = newColor;
    setSlots(newSlots);
  };

  const changeThickness = (newThickness: number) => {
    if (openSlotIndex === null) return;

    const newSlots = [...slots];
    newSlots[openSlotIndex].thickness = newThickness;
    setSlots(newSlots);
  };

  const openMenu = (slotIndex: number) => setOpenSlotIndex(slotIndex);

  const closeMenu = () => setOpenSlotIndex(null);

  return (
    <div className="flex">
      <Panel
        slots={slots}
        addSlot={addSlot}
        changeSlot={changeSlot}
        deleteSlot={deleteSlot}
        toggleVisibility={toggleVisibility}
        openMenu={openMenu}
      />
      <Plane slots={slots} />
      {openSlotIndex !== null && (
        <Menu
          closeMenu={closeMenu}
          availableColors={COLORS}
          color={slots[openSlotIndex].color}
          thickness={slots[openSlotIndex].thickness}
          changeColor={changeColor}
          changeThickness={changeThickness}
        />
      )}
    </div>
  );
};

export default Home;
