import { Box } from "@mui/material";
import React, { useState } from "react";
import GuessBox from "./components/GuessBox";
import NumberDispenser from "./components/NumberDispenser";
import Statistics from "./components/Statistics";

export default function Home() {
  const [nums, setNums] = useState<number[]>([]);
  const [guessedNums, setGuessedNums] = useState<number[]>([]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#282c34",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          mt: 6,
        }}
      >
        <Box>
          <Statistics />
        </Box>
        <Box>
          <NumberDispenser setNums={setNums}/>
        </Box>
        <Box>
          <GuessBox setGuessedNums={setGuessedNums}/>
        </Box>
      </Box>
    </Box>
  );
}
