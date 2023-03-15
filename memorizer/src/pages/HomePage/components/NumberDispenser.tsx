import { Box, Button, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

interface props {
  setNums: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function NumberDispenser({ setNums }: props) {
  const [numbers, setNumbers] = useState(getRandomNumbers());

  function Block({ number }: { number: number }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      setNums(numbers);
    });

    return (
      <Grid item>
        <Paper
          sx={{
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 2s ease",
          }}
        >
          {number}
        </Paper>
      </Grid>
    );
  }

  function getRandomNumbers() {
    return [...Array(10)].map(() => Math.floor(Math.random() * 10));
  }

  const handleClick = () => {
    setNumbers(getRandomNumbers());
    setNums(numbers);
  };

  return (
    <Box
      sx={{
        bgcolor: "gray",
        width: "1100px",
        height: "200px",
        borderRadius: 5,
      }}
    >
      <Box>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {numbers.map((number, index) => (
            <Block key={index} number={number} />
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{
            mt: 4,
            borderRadius: 50,
            textTransform: "none",
            fontSize: "1.5rem",
            fontWeight: "bold",
            boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
            },
          }}
        >
          Dispense Numbers
        </Button>
      </Box>
    </Box>
  );
}
