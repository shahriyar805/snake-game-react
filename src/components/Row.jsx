import Cell from "./Cell";

function Row({ rowNum }) {
  const indices = [
    rowNum * 10,
    rowNum * 10 + 1,
    rowNum * 10 + 2,
    rowNum * 10 + 3,
    rowNum * 10 + 4,
    rowNum * 10 + 5,
    rowNum * 10 + 6,
    rowNum * 10 + 7,
    rowNum * 10 + 8,
    rowNum * 10 + 9,
  ];

  return (
    <div className="flex">
      <Cell cellIndex={indices[0]} />
      <Cell cellIndex={indices[1]} />
      <Cell cellIndex={indices[2]} />
      <Cell cellIndex={indices[3]} />
      <Cell cellIndex={indices[4]} />
      <Cell cellIndex={indices[5]} />
      <Cell cellIndex={indices[6]} />
      <Cell cellIndex={indices[7]} />
      <Cell cellIndex={indices[8]} />
      <Cell cellIndex={indices[9]} />
    </div>
  );
}

export default Row;
