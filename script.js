const display = document.getElementById("display");
      let rawinput = ""; // stores clean, math-ready expression

      const buttons = document.querySelectorAll(".btn:not(#delete):not(#equals)");
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const value = button.getAttribute("data-value");

          rawinput += value;

           // Format and update display
           display.value = formatDisplay(rawinput);
        });
      });

      document.getElementById("clear").addEventListener("click", () => {
        rawinput = "";
        display.value = "";
      });

      document.getElementById("delete").addEventListener("click", () => {
        rawinput = rawinput.slice(0, -1)
        display.value = display.value.slice(0, -1);
      });

      document.getElementById("equals").addEventListener("click", () =>{
        if (rawinput.trim() === ""){
          display.value = "";
          return;
        }
        try{
          const result = math.evaluate(rawinput); 
          rawinput = result.toString(); // reset input to result for further calculation

          display.value = Number(result).toLocaleString("en-US");
        } catch {
          display.value = "Error";
          rawinput = "";
        }
      })

       // Format function: adds commas to numbers only
  function formatDisplay(input) {
    return input.replace(/\d+(\.\d+)?/g, (match) => {
      if (match.includes(".")) {
        let [intPart, decPart] = match.split(".");
        return Number(intPart).toLocaleString("en-US") + "." + decPart;
      } else {
        return Number(match).toLocaleString("en-US");
      }
    });
  }