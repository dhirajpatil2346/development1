import React, { useState } from "react";
export default function TextForm(props) {

  const handleUpClick = () => {
    // console.log("upperCase was clicked", text);
    // setText("You have clicked on handleUpClick");
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("converted to upperCase!", "success");
  };

  const handleCopyText = () => {
    var Text = document.getElementById("myBox");
    Text.select();
    navigator.clipboard.writeText(Text.value);
    document.getSelection().removeAllRanges();
    props.showAlert("Copied to Clipboard");
  };

  const handleLowClick = () => {
    // console.log("upperCase was clicked", text);
    // setText("You have clicked on handleUpClick");
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("converted to lowerCase!", "success");
  };

  const handleClearClick = () => {
    // console.log("upperCase was clicked", text);
    // setText("You have clicked on handleUpClick");
    let newText = "";
    setText(newText);
  };

  // const handleFrequencyClick = () => {

  // };
  // function max( a,  b)
  // {
  //   if(a>b)
  //   {
  //     return a;
  //   }
  //   return b;
  // }
  function handleFreqClick(Text) {
    const array = Text.split(" ");
    let word = array[0];
    let maxi = 0;
    for (var i = 0; i < array.length; i++) {
      let key = array[i];
      let currMaxi = 0;
      for (var j = 0; j < array.length; j++) {
        if (array[j] === key) {
          currMaxi++;
        }
      }
      if (currMaxi > maxi) {
        word = key;
        maxi = currMaxi;
      }
    }
    return word;
  }
  const handleOnChange = (event) => {
    // console.log("handleOnChange was called");
    setText(event.target.value);
  };
  const [text, setText] = useState("");
  // text="nknknbn";  // wrong way to change the state
  // setText("mkfd kfnnivnvn");  // correct way to change the state
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            style={{
              backgroundColor: props.mode === "light" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>
          Convert to upperCase
        </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleLowClick}>
          Convert to lowerCase
        </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>
          Clear
        </button>
        <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCopyText}>
          copyText
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>Your text summary </h1>
        <p>
          {text.split(" ").filter((element) => {
            return element.length !== 0;
          }).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").filter((element) => {
          return element.length !== 0;
        }).length} Minutes</p>
        <p>word with most frequncy is : {handleFreqClick(text)}</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview"}</p>
      </div>
    </>
  );
}