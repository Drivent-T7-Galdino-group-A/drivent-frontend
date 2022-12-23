import { BsPerson, BsPersonFill } from 'react-icons/bs';

export default function Icon({ icon, selected, capacity }) {
  return (
    <>
      {icon.available === true ? (
        selected && icon.position + 1 === (capacity - icon.bookingCount) ? (
          <BsPersonFill color='#FF4791' />
        ) : (
          <BsPerson />  
        )
      ) : (
        <BsPersonFill />
      )}
    </>
  );
}
