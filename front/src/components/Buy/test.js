import { useEffect } from 'react';

function Test(props) {
  return (
    <>
      {props.buyCoinList.map((el, idx) => {
        return (
          <>
            <div key={idx}>{el.Nation}</div>
            {el.firstCoin === 0 ? null : <div key={idx + 1}>{el.firstCoin}</div>}
            {el.secondCoin === 0 ? null : <div key={idx + 2}>{el.secondCoin}</div>}
          </>
        );
      })}
    </>
  );
}

export default Test;
