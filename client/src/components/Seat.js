import { Checkbox } from "@chakra-ui/react";

const Seat = ({ ...props }) => {
  return (
    <Checkbox
      {...props}
      
    >
      {props.value}
    </Checkbox>
  );
}



// const Seat = ({ seatId, status, ss, setSS }) => {
//   const handleSeatClick = (e, seatId) => {
//     e.stopPropagation();
//     const cl = document.querySelector(`.${seatId}`).classList;
//     console.log(cl);
//     if (cl[2]==="av") {
//       cl.remove("av");
//       cl.add("select");
//       const temp = [...ss];
//       temp.push(seatId);
//       setSS(temp);
//       console.log(ss);
//     } else if (cl[2]==="select") {
//       cl.remove("select");
//       cl.add("av");
//       setSS(ss.filter((s) => s!==seatId));
//       console.log(ss);
//     } else return;
//   }
//   return (
//     seatId==="random" ? (
//       <div className={`seat ${seatId} ${status}`} ></div>
//     ) : (
//       <div 
//         className={`seat ${seatId} ${status===true ? "av" : "booked"}`}
//         onClick={(e) => handleSeatClick(e, seatId)}
//       >
//         {seatId}
//       </div>
//     )
//   )
// }

export default Seat;
