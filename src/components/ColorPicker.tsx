import { motion } from 'framer-motion';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import tinycolor from 'tinycolor2';

function ColorPicker({ type, colors, onChange, onDismiss }) {
  const [currentColor, setCurrentColor] = useState(colors[type]);
  const handleInputChange = (e) => {
    const { value } = e.target;
    const color = tinycolor(value);
    if (color.isValid()) {
      setCurrentColor(color.getOriginalInput());
      onChange((prev) => ({ ...prev, [type]: color.toHexString() }));
    } else {
      setCurrentColor(value);
    }
  };
  return (
    <motion.div
      key={`color-picker-${type}`}
      initial={{
        backgroundColor: 'rgba(150,150,150,0)',
        backdropFilter: 'blur(0px)',
      }}
      animate={{
        backgroundColor: colors[type],
        backdropFilter: 'blur(2px)',
      }}
      exit={{
        backgroundColor: 'rgba(150,150,150,0)',
        backdropFilter: 'blur(0px)',
      }}
      className='fixed inset-0 z-10 flex h-screen w-full items-center justify-center'
    >
      <motion.div
        layoutId={`picker-${type}`}
        className='relative flex flex-col gap-4 rounded-xl bg-white text-left shadow-2xl shadow-stone-900/20 dark:bg-stone-900'
      >
        <h4 className='z-[2] px-4 pt-4 capitalize text-stone-800 dark:text-stone-100'>
          {type} Color
        </h4>
        <motion.div className='px-4' layoutId={`picker-area-${type}`}>
          <HexColorPicker
            color={colors[type]}
            onChange={(c) => onChange((prev) => ({ ...prev, [type]: c }))}
            className='!w-full'
          />
        </motion.div>
        <motion.div className='px-4'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInputChange({ target: { value: e.target[0].value } });
            }}
          >
            <input
              type='text'
              name='color'
              id='color'
              className='block w-full rounded-full border-gray-300 bg-transparent px-4 text-stone-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-stone-100 sm:text-sm'
              placeholder='Enter a color'
              autoFocus
              value={currentColor}
              onChange={handleInputChange}
            />
          </form>
        </motion.div>
        <button
          className='block w-full rounded-b-xl border-t border-t-stone-400/20 px-4 py-2 text-stone-800 transition hover:bg-stone-400/20 dark:text-stone-100'
          onClick={onDismiss}
        >
          Done
        </button>
      </motion.div>
    </motion.div>
  );
}
export default ColorPicker;
