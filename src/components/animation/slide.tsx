// "use client";
// import { Group } from "@mantine/core";
// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
// import { forwardRef, useState } from "react";

// export const DataSlider = () => {
//   const items = [1, 2, 3, 4, 5, 6];
//   const [selectedItem, setSelectedItem] = useState(items[0]);
//   const [direction, setDirection] = useState<1 | -1>(1);

//   function setSlide(newDirection: 1 | -1) {
//     const nextItem = wrap(1, items.length, selectedItem + newDirection);
//     setSelectedItem(nextItem);
//     setDirection(newDirection);
//   }

//   return (
//     <>
//       <AnimatePresence custom={direction} initial={false} mode="popLayout">
//        {/* <Slide key={selectedItem} /> */}
//       </AnimatePresence>

//       <Group justify="flex-end">
//         <motion.button
//           initial={false}
//           animate={{ backgroundColor: "#1f5de5" }}
//           aria-label="Previous"
//           style={button}
//           onClick={() => setSlide(-1)}
//           whileFocus={{ outline: `2px solid "#1f5de5"` }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <IconArrowLeft style={{ color: "white" }} />
//         </motion.button>
//         <motion.button
//           initial={false}
//           animate={{ backgroundColor: "#1f5de5" }}
//           aria-label="Next"
//           style={button}
//           onClick={() => setSlide(1)}
//           whileFocus={{ outline: `2px solid "#1f5de5"` }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <IconArrowRight style={{ color: "white" }} />
//         </motion.button>
//       </Group>
//     </>
//   );
// };

// const Slide = forwardRef(function Slide(
//   ref: React.Ref<HTMLDivElement>
// ) {
//   const direction = usePresenceData();
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, x: direction * 50 }}
//       animate={{
//         opacity: 1,
//         x: 0,
//         transition: {
//           delay: 0.2,
//           type: "spring",
//           visualDuration: 0.3,
//           bounce: 0.4,
//         },
//       }}
//       exit={{ opacity: 0, x: direction * -50 }}
//       style={{ ...box }}
//     />
//   );
// });

/**
 * ==============   Styles   ================
 */

// const container: React.CSSProperties = {
//   display: "flex",
//   position: "relative",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: 10,
// };

// const box: React.CSSProperties = {
//   width: 150,
//   height: 150,
//   backgroundColor: "#0cdcf7",
//   borderRadius: "10px",
// };

// const button: React.CSSProperties = {
//   backgroundColor: "#1f5de5",
//   width: 70,
//   height: 40,
//   borderRadius: "4rem",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   position: "relative",
//   zIndex: 1,
//   outlineOffset: 2,
// };
