import { createContext } from 'react';
import { useState } from 'react';

const ReRenderContext = createContext();
export default ReRenderContext;

export function ReRenderProvider({ children }) {
  const [reRender, setReRender] = useState(false);

  return <ReRenderContext.Provider value={{ reRender, setReRender }}>{children}</ReRenderContext.Provider>;
}
