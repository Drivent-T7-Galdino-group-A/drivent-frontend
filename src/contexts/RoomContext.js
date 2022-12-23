import { createContext } from 'react';
import { useState } from 'react';

const RoomContext = createContext();
export default RoomContext;

export function RoomProvider({ children }) {
  const [isRoomSelected, setIsRoomSelected] = useState(false);

  return <RoomContext.Provider value={{ isRoomSelected, setIsRoomSelected }}>{children}</RoomContext.Provider>;
}
