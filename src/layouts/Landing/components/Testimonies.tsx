import { ActionIcon, Box, Container, Group, SimpleGrid, Title } from "@mantine/core";
import React, { useState } from "react";
import classes from "../../styles/index.module.css";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Testimony } from "./Testimony";
import { testimonies } from "../constants";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useAppSettings } from "src/hooks";

export const Testimonies: React.FC = () => {
  const { isDarkMode } = useAppSettings();
  const [currentIndex, setcurrentIndex] = useState(0);
  const [isPrev, setIsPrev] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const currentTestimony = [
    testimonies[currentIndex % testimonies.length],
    testimonies[(currentIndex + 1) % testimonies.length],
  ];

  const handleNext = () => {
    setcurrentIndex((prevIndex) => (prevIndex + 2) % testimonies.length);
    setIsPrev(false);
  };

  const handlePrev = () => {
    setcurrentIndex((prevIndex) =>
      (prevIndex - 2 + testimonies.length) % testimonies.length
    );
    setIsPrev(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isPrev ? -200 : 200 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <>
    <Box bg={isDarkMode ? "dark.8" : "gray.0"}>
      <Container size="80%" py={40}>
        <Group justify="space-between">
          <Title order={1} fw={700} className={classes.title} px="xs">
            <span style={{ color: "#1f5de5" }}>Real Swaps</span>, Real Results
          </Title>
          <Group>
            <ActionIcon radius="xl" size="lg" onClick={handlePrev}>
              <IconArrowLeft />
            </ActionIcon>
            <ActionIcon radius="xl" size="lg" onClick={handleNext}>
              <IconArrowRight />
            </ActionIcon>
          </Group>
        </Group>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={containerVariants}
          key={currentIndex}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} mt={50} spacing="xl">
            {currentTestimony.map((testimony, _) => (
              <motion.div key={testimony?.name} variants={itemVariants}>
                <Testimony {...testimony} key={testimony?.name} />
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>
      </Container>
      </Box>
    </>
  );
};
