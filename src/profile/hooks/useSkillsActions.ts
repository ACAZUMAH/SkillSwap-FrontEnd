import { useState } from "react";
import { useUpdateSkillForm } from "./useUpdateSkillForm";

export const useSkillsActions = (form: ReturnType<typeof useUpdateSkillForm> ) => {
      const [proficientSkills, setProficientSkills] = useState("");
      const [proficientSkillLevel, setProficientSkillLevel] = useState(1);
      const [skillsToLearn, setSkillsToLearn] = useState("");
      const [skillsToLearnLevel, setSkillsToLearnLevel] = useState(1);
    
      const addProficientSkills = () => {
        if (proficientSkills.trim() === "") return;
    
        form.setFieldValue("skillsProficientAt", [
          ...form.values.skillsProficientAt,
          { name: proficientSkills, level: proficientSkillLevel },
        ]);
        setProficientSkills("");
      };
    
      const addSkillsToLearn = () => {
        if (skillsToLearn.trim() === "") return;
    
        form.setFieldValue("skillsToLearn", [
          ...form.values.skillsToLearn,
          { name: skillsToLearn, level: skillsToLearnLevel },
        ]);
        setSkillsToLearn("");
      };
    
      const removeProficientSkills = (index: number) => {
        const update = form.values.skillsProficientAt.filter((_, i) => i !== index);
        form.setFieldValue("skillsProficientAt", update)
      };
    
      const removeSkillsToLearn = (index: number) => {
        const update = form.values.skillsToLearn.filter((_, i) => i !== index);
        form.setFieldValue("skillsToLearn", update)
      };

      return {
        proficientSkills,
        setProficientSkills,
        proficientSkillLevel,
        setProficientSkillLevel,
        skillsToLearn,
        setSkillsToLearn,
        skillsToLearnLevel,
        setSkillsToLearnLevel,
        addProficientSkills,
        addSkillsToLearn,
        removeProficientSkills,
        removeSkillsToLearn
      }
}