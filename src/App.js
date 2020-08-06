import { COUNTRIES } from "./dictionary";
import React from "react";
import Terminal from "terminal-in-react";
import microsoft from "./microsoft-min.png";
import styled from "styled-components";

const DEFAULT_NUMBER_OF_SEARCHES = 10;
const DEFAULT_WAIT_TIME = 5000;

const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Logo = styled.img`
  pointer-events: none;
  max-width: 90%;
  margin-top: 2em;
`;

const App = () => {
  const getRandomValue = () => {
    return COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  };

  const search = async (count, bufferTime, print) => {
    let offset = bufferTime;
    let useFallback = false;
    let randomWords = [];

    const doSearch = async (x, print) => {
      let searchWord = useFallback ? getRandomValue() : randomWords[x];
      searchWord = searchWord.replace(" ", "+");
      const search = `https://www.bing.com/search?q=${searchWord}`;
      window.open(search, "BingRewards");
      print(`${x + 1}. ${search}`);
      if (x === count - 1) {
        print("Done.");
      }
    };

    fetch(`https://random-word-api.herokuapp.com/word?number=${count}`)
      .then((res) => res.json())
      .then((json) => (randomWords = json))
      .catch(() => (useFallback = true))
      .finally(() => {
        for (let i = 0; i < count; i++) {
          offset = offset + Math.random() * bufferTime + bufferTime;
          if (i === 0) {
            window.setTimeout(doSearch, 0, i, print);
          } else {
            window.setTimeout(doSearch, offset, i, print);
          }
        }
      });
  };

  return (
    <Container>
      <Header>
        <Logo src={microsoft} alt="logo" />
        <p>
          Make searches to <code>bing.com</code>.
        </p>
        <Terminal
          color="green"
          backgroundColor="black"
          barColor="black"
          style={{ fontWeight: "bold", fontSize: "0.6em" }}
          commands={{
            search: (args, print) => {
              let countArgument = DEFAULT_NUMBER_OF_SEARCHES;
              if (args[1]) {
                const parsedCount = parseInt(args[1]);
                if (parsedCount !== 0) {
                  countArgument = parsedCount;
                }
              }

              let bufferTimeArgument = DEFAULT_WAIT_TIME;
              if (args[2]) {
                const parsedBufferTime = parseInt(args[2]);
                if (parsedBufferTime !== 0) {
                  bufferTimeArgument = parsedBufferTime * 1000;
                }
              }

              print(
                `Running ${countArgument} bing search(es) with buffer time of ${
                  bufferTimeArgument / 1000
                } second(s).`
              );
              search(countArgument, bufferTimeArgument, print);
            },
          }}
          descriptions={{
            show: "Show the message.",
            clear: "Clear the screen.",
            help: "List all commands.",
            search: `Do a bing search.\nUsage: search <count> <waitTime>\n<count>:\n  - the number of searches\n  - default value is ${DEFAULT_NUMBER_OF_SEARCHES}.\n<waitTime>:\n  - the buffer interval time in seconds.\n  - default value is ${
              DEFAULT_WAIT_TIME / 1000
            } seconds.\n\nExample: search 20 2\nThis will do 20 searches with buffer interval time of 2 seconds.`,
          }}
          msg={`This tool allows you to make multiple bing requests using random words.\n\nUsage: search <count> <waitTime>\n<count>:\n  - the number of searches\n  - default value is ${DEFAULT_NUMBER_OF_SEARCHES}.\n<waitTime>:\n  - the buffer interval time in seconds.\n  - default value is ${
            DEFAULT_WAIT_TIME / 1000
          } seconds.\n\nExample: search 20 2\nThis will do 20 searches with buffer interval time of 2 seconds.`}
        />
      </Header>
    </Container>
  );
};

export default App;
