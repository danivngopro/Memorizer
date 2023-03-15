import { Box, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface props {
  setGuessedNums: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function GuessBox({ setGuessedNums }: props) {
  const [render, setRender] = useState(false);
  const [inputValues, setInputValues] = useState(Array(10).fill(0));
  const inputRefs = useRef<
    Array<React.MutableRefObject<HTMLInputElement | null>>
  >(
    Array(10)
      .fill(0)
      .map(() => React.createRef<HTMLInputElement>())
  );

  const handleInputChange = (index: number, value: string) => {
    if (value !== "" && !/^\d+$/.test(value)) return;

    const updatedValues = [...inputValues];
    updatedValues[index] = Number(value);
    setInputValues(updatedValues);

    if (value !== "" && index < 9) {
      const nextInputRef = inputRefs.current[index + 1];
      const nextInputValue = inputValues[index + 1];
      nextInputRef.current?.focus();
      nextInputRef.current?.select();
      if (nextInputValue !== 0) {
        setInputValues((prev) => {
          const updatedValues = [...prev];
          updatedValues[index + 1] = 0;
          return updatedValues;
        });
      }
    }
  };

  useEffect(() => {}, [render]);

  return (
    <Box
      sx={{
        bgcolor: "gray",
        width: "1100px",
        height: "200px",
        borderRadius: 5,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            bgcolor: "gray",
            width: "560px",
            height: "100px",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={1}>
            {[...Array(10)].map((_, index) => (
              <Grid item key={index}>
                <Paper
                  sx={{
                    height: 50,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    borderRadius: 5,
                    mr: 1,
                  }}
                >
                  <TextField
                    variant="standard"
                    inputProps={{
                      style: { textAlign: "center" },
                      maxLength: 1,
                    }}
                    value={inputValues[index] === 0 ? "" : inputValues[index]}
                    onChange={(event) =>
                      handleInputChange(index, event.target.value)
                    }
                    inputRef={inputRefs.current[index]}
                    onFocus={(event) => {
                      inputValues[index] = 0;
                      setRender(!render);
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
