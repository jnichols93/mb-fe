import React from "react";
import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";
import axios from "axios";

import "../../Styles/_calcStyles.scss";
export default class Calculator extends React.Component {
  state = {
    problem: "",
    answer: 0,
  };

  onButtonPress = (e) => {
    let problem = this.state.problem;
    const pressed = e.target.innerHTML;

    if (pressed === "C") return this.clear();
    else if ((pressed >= "0" && pressed <= "9") || pressed === ".")
      problem += pressed;
    else if (["+", "-", "*", "/", "%"].indexOf(pressed) !== -1)
      problem += " " + pressed + " ";
    else if (pressed === "=") {
      try {
        const evalAnswer = eval(problem);
        const answer = Number.isInteger(evalAnswer)
          ? evalAnswer
          : evalAnswer.toFixed(2);
        this.setState({ answer });

        axios
          .post("https://mb-be.herokuapp.com/api/math", {
            problem: problem,
            answer: answer,
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {
        alert("bad math is bad try again");
      }
    } else {
      problem = problem.trim();
      problem = problem.substr(0, problem.length - 1);
    }
    this.setState({ problem: problem });
  };
  clear() {
    this.setState({ problem: "", answer: 0 });
  }

  render() {
    return (
      <div className="calc_Body">
        <Screen problem={this.state.problem} answer={this.state.answer} />
        <Keypad onButtonPress={this.onButtonPress} />
      </div>
    );
  }
}
